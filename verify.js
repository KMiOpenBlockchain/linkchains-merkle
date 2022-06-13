const N3 = require('n3');
const parser = new N3.Parser({ blankNodePrefix: '' });
const writer = new N3.Writer({ format: 'N-Quads' });
const isomorphic = require('rdf-isomorphic');
const MerkleTools = require('merkle-tools');
const stringify = require('json-stable-stringify');
const Web3 = require('web3');
const axios = require('axios');

const hashingFunctions = require("./hashing.js");
const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const defaults = require('./defaults.js').defaults;
const utils = require('./utils.js');

async function verify(quads, metadata, options, retrieveAnchor=retrieveAnchorInternal ) {
    var results = {
        verified: "",
        unverified: ""
    };
    if (metadata.anchor || (metadata.merkletrees && metadata.merkletrees.anchor)) {
        if (!metadata.anchor) {
            metadata.anchor = metadata.merkletrees.anchor;
        }
        if (!metadata.settings && metadata.anchor.settings) {
            metadata.settings = metadata.anchor.settings;
        }
        if (!metadata.indexhash && metadata.anchor.indexhash) {
            metadata.indexhash = metadata.anchor.indexhash;
        }
        if (metadata.anchor.type === defaults.DEFAULT_ANCHOR_TYPE) {
            // do the whole set at once
            var anchorDetails = await retrieveAnchor(metadata.anchor, options);
            if (anchorDetails.theDivisor === '') {
                anchorDetails.theDivisor = 1;
            }
            if (metadata.anchor.type !== defaults.DEFAULT_ANCHOR_TYPE ||
                !matchAnchorDetails(metadata.indexhash, metadata.settings, anchorDetails) ||
                parseInt(anchorDetails.transactionAccount, 16) !== parseInt(metadata.anchor.account, 16) ||
                parseInt(anchorDetails.transactionContractAddress, 16) !== parseInt(metadata.anchor.address, 16)) {
                results.unverified = quads;
                return results;
            }

            var processed = await merqlify(quads, metadata);
            if (processed.merkletrees.indexhash !== metadata.indexhash) {
                results.unverified = quads;
                return results;
            } else {
                results.verified = quads;
                return results;
            }
        }
    } else {
        // per quad verification 
        var quadObjects = await utils.parseCanonical(quads);
        var verified = [];
        var unverified = [];

        //await utils.isomorphicToSubgraph(metadata, quads);
        var metadataQuads = await utils.metadataToRDF(metadata);
        for (var currentQuad of metadataQuads) {
            var quadResults = await verifyQuad(currentQuad, metadata, options, retrieveAnchor);
            //verified.push(utils.makeQuadString(quadResults.verified).quadString);
            //unverified.push(utils.makeQuadString(quadResults.unverified).quadString);
            for (var verifiedQuad of quadResults.verified) {
                verified.push(verifiedQuad);
            }
            for (var unverifiedQuad of quadResults.unverified) {
                unverified.push(unverifiedQuad);
            }

        }

        const matches = utils.matchQuadsIgnoreBlanks(verified, quadObjects);

        var bijection = isomorphic.getBijection(matches.matchesA, matches.matchesB);
        if (bijection) {
            for (var verifiedQuad of matches.matchesB) {
                results.verified += utils.makeQuadString(verifiedQuad).quadString + '\n';
            }
            for (var unverifiedQuad of quadObjects) {
                if (!matches.matchesB.has(unverifiedQuad)) {
                    results.unverified += utils.makeQuadString(unverifiedQuad).quadString + '\n';
                }
            }
        } else {
            for (var unverifiedQuad of quadObjects) {
                results.unverified += utils.makeQuadString(unverifiedQuad).quadString + '\n';
            }
        }
    }
    return results;
}

async function verifyQuad(quad, metadata, options, retrieveAnchor) {
    var results = {
        verified: [],
        unverified: []
    };

    var currentFull = utils.makeQuadString(quad);
    current = utils.makeBareTermStrings(currentFull);
    var base = metadata['@defaultgraph'];

    // graph might not exist, but if it does and it isn't in the metadata, fail verification.
    if (current.graphString !== "") {
        if (metadata[current.graphString]) {
            base = metadata[current.graphString];
        } else {
            results.unverified.push(quad);
            return results;
        }
    }

    // if quad is represented in the metadata, proceed to verify, else fail verification.
    if (base[current.subjectString]) {
        if (base[current.subjectString][current.predicateString]) {
            if (base[current.subjectString][current.predicateString][current.objectString]) {
                var verify = base[current.subjectString][current.predicateString][current.objectString];

                var verifyMetadata = getLinkedVerificationMetadata(verify, metadata);
                if (!verifyMetadata) {
                    results.unverified.push(quad);
                    return results;
                }

                // fetch and check basic matching from anchor on blockchain - if no matches, fail verification
                              var anchorDetails = await retrieveAnchor(verifyMetadata.anchor, options);
                              if (anchorDetails.theDivisor === '') {
                                anchorDetails.theDivisor = 1;
                            }
                if (verifyMetadata.anchor.type !== defaults.DEFAULT_ANCHOR_TYPE ||
                    !matchAnchorDetails(verifyMetadata.indexhash, verifyMetadata.anchor.settings, anchorDetails) ||
                    parseInt(anchorDetails.transactionAccount, 16) !== parseInt(verifyMetadata.anchor.account, 16) ||
                    parseInt(anchorDetails.transactionContractAddress, 16) !== parseInt(verifyMetadata.anchor.address, 16)) {
                    results.unverified.push(quad);
                    return results;
                } else {
                    // recreate the index key and check it points to merkleroot in index - else fail verification
                    var indexMatches = await matchesIndexToTree(currentFull, verify.merkleroot, verifyMetadata.index, verifyMetadata.indexhash, verifyMetadata.anchor.settings);
                    if (!indexMatches) {
                        results.unverified.push(quad);
                        return results;
                    }

                    // recreate the quad hash. If Merkle proof validation fails, fail verification
                    var quadHash = await hashingFunctions.getHash(currentFull.quadString, {
                        type: verifyMetadata.anchor.settings.quadHash
                    });
                    var merkleTools = new MerkleTools({ hashType: verifyMetadata.anchor.settings.treeHash });
                    var validated = merkleTools.validateProof(verify.proof['@list'], quadHash, verify.merkleroot, false);
                    if (!validated) {
                        results.unverified.push(quad);
                        return results;
                    } else {
                        // we have reached this point without failing - verification succeeded!
                        results.verified.push(quad);
                        return results;
                    }
                }
            } else {
                results.unverified.push(quad);
                return results;
            }
        } else {
            results.unverified.push(quad);
            return results;
        }
    } else {
        results.unverified.push(quad);
        return results;
    }
}

function getLinkedVerificationMetadata(toBeVerified, allMetadata) {
    if (typeof toBeVerified.metadata === 'object') {
        return toBeVerified.metadata;
    }
    if (typeof allMetadata.metadata === 'object' &&
        allMetadata.metadata['@id'] === toBeVerified.metadata) {
        return allMetadata.metadata;
    }
    return undefined;
}

async function merqlify(quads, metadata) {
    var hashLists = await preprocess.divideQuadsIntoHashLists(quads, metadata.settings);
    var merkleTrees = await merkle.hashListsToMerkleTrees(hashLists, metadata.settings);
    return merkleTrees;
}

async function retrieveAnchorInternal(anchor, options) {
    const url = options.blockchain.web3.protocol + '://' + options.blockchain.web3.domain
        + (options.blockchain.web3.port === '' ? '' : ':' + options.blockchain.web3.port)
        + (options.blockchain.web3.path === '' ? '' : options.blockchain.web3.path);
    const web3 = new Web3(new Web3.providers.WebsocketProvider(url));
    const contract = new web3.eth.Contract(options.blockchain.abi, anchor.address);
    var anchorDetails = await contract.methods.getData().call();
    var transaction = await web3.eth.getTransactionReceipt(anchor.transactionhash);
    anchorDetails.transactionAccount = transaction.from;
    anchorDetails.transactionContractAddress = transaction.contractAddress;
    web3.currentProvider.disconnect();
    return anchorDetails;
}

async function matchesIndexToTree(quad, merkleRoot, indices, indexhash, settings) {
    var index = await generateIndexFrom(settings, quad);

    if (!containsMerkleRoot(indices, index, merkleRoot)) {
        return false;
    }

    var hashAlgorithm = settings.indexHash ? settings.indexHash : defaults.DEFAULT_HASH_ALG;

    var calculatedIndexHash = await hashingFunctions.getHash(JSON.stringify(indices), { type: hashAlgorithm });

    return calculatedIndexHash === indexhash;
}


async function generateIndexFrom(settings, quad) {
    var quadHashFunction = async function (input) {
        return hashingFunctions.getHash(input, {
            "type": settings.quadHash ? settings.quadHash : defaults.DEFAULT_HASH_ALG
        });
    };

    var result = await makeHashIndex(settings, quad, quadHashFunction);
    return result;
}

async function generateIndexValue(hash, lsd, divisor) {
    var lastdigits = hash.substr(hash.length - lsd);
    var decimalInt = BigInt("0x" + lastdigits);
    var index = decimalInt / BigInt(divisor);
    return index;
}

async function makeHashIndex(state, quadStringsObj, quadHashFunction) {
    if (state.indexType == "uniform") {
        hash = quadStringsObj.quadHash;
    } else if (state.indexType == "subject") {
        hash = await quadHashFunction(quadStringsObj.subjectString);
    } else if (state.indexType == "predicate") {
        hash = await quadHashFunction(quadStringsObj.predicateString);
    } else if (state.indexType == "object") {
        hash = await quadHashFunction(quadStringsObj.objectString);
    } else if (state.indexType == "graph") {
        hash = await quadHashFunction(quadStringsObj.graphString);
    } else if (state.indexType == "subjectobject") {
        hash = await quadHashFunction(quadStringsObj.subjectString +
            " " + quadStringsObj.objectString);
    }
    var index = await generateIndexValue(hash, state.lsd, state.divisor);
    return index;
}

function containsMerkleRoot(indices, index, merkleRoot) {
    for (let indexItem of indices) {
        if (indexItem[index] === merkleRoot) {
            return true;
        }
    }
    return false;
}

function matchAnchorDetails(targetHash, settings, anchorDetails) {
    return (anchorDetails.thetargetHash === targetHash &&
        anchorDetails.theIndexType === settings.indexType &&
        parseInt(anchorDetails.leastSignificants) === parseInt(settings.lsd) &&
        parseInt(anchorDetails.theDivisor, 16) === parseInt(settings.divisor, 16) &&
        anchorDetails.theQuadHashFunction === settings.quadHash &&
        anchorDetails.theTreeHashFunction === settings.treeHash &&
        anchorDetails.theIndexHashFunction === settings.indexHash);
}

exports.verify = verify;