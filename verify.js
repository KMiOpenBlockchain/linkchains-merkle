const N3 = require('n3');
const parser = new N3.Parser();
const writer = new N3.Writer({ format: 'N-Quads' });
const MerkleTools = require('merkle-tools');
const stringify = require('json-stable-stringify');
const Web3 = require('web3');
const axios = require('axios');

const hashingFunctions = require("./hashing.js");
const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const defaults = require('./defaults.js').defaults;

async function verify(quads, metadata, options) {
    var results = {
        verified: "",
        unverified: ""
    };
    if (metadata.anchor !== undefined && metadata.anchor.type === defaults.DEFAULT_ANCHOR_TYPE) {
        // do the whole set at once
        var anchorDetails = await retrieveAnchor(metadata.anchor, options);
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
    } else {
        // per quad verification 
        var quadObjects = parser.parse(quads);
        verified = [];
        unverified = [];
        for (var currentQuad = 0; currentQuad < quadObjects.length; currentQuad++) {
            var quadResults = await verifyQuad(quadObjects[currentQuad], metadata, options);
            verified = verified.concat(quadResults.verified);
            unverified = unverified.concat(quadResults.unverified);
        }
        results.verified = writer.quadsToString(verified);
        results.unverified = writer.quadsToString(unverified);

    }
    return results;
}

async function verifyQuad(quad, metadata, options) {
    var results = {
        verified: [],
        unverified: []
    };

    var current = preprocess.makeQuadString(quad);
    var base = metadata;

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

                // fetch and check basic matching from anchor on blockchain - if no matches, fail verification
                var anchorDetails = await retrieveAnchor(verify.anchor, options);
                if (verify.anchor.type !== defaults.DEFAULT_ANCHOR_TYPE ||
                    !matchAnchorDetails(verify.indexhash, verify.settings, anchorDetails) ||
                    parseInt(anchorDetails.transactionAccount, 16) !== parseInt(verify.anchor.account, 16) ||
                    parseInt(anchorDetails.transactionContractAddress, 16) !== parseInt(verify.anchor.address, 16)) {
                    results.unverified.push(quad);
                    return results;
                } else {
                    // recreate the index key and check it points to merkleroot in index - else fail verification
                    var indexMatches = await matchesIndexToTree(current, verify.merkleroot, verify.index, verify.indexhash, verify.settings);
                    if (
                        !indexMatches) {
                        results.unverified.push(quad);
                        return results;
                    }

                    // recreate the quad hash. If Merkle proof validation fails, fail verification
                    var quadHash = await hashingFunctions.getHash(current.quadString, {
                        type: verify.settings.quadHash
                    });
                    var merkleTools = new MerkleTools({ hashType: verify.settings.treeHash });
                    var validated = merkleTools.validateProof(verify.proof, quadHash, verify.merkleroot, false);
                    if (!validated) {
                        results.unverified.push(quad);
                        return results;
                    } else {
                        // we have reached this point without failing - verification succeeded!
                        results.verified.push(quad);
                        return results;
                    }
                }
            }
        }
    } else {
        results.unverified.push(quad);
        return results;
    }
}

async function merqlify(quads, metadata) {
    var hashLists = await preprocess.divideQuadsIntoHashLists(quads, metadata.settings);
    var merkleTrees = await merkle.hashListsToMerkleTrees(hashLists, metadata.settings);
    return merkleTrees;
}

async function retrieveAnchorReal(anchor, options) {
    const url = 'ws://' + options.blockchain.web3.domain + ':' + options.blockchain.web3.port;
    const web3 = new Web3(new Web3.providers.WebsocketProvider(url));
    const contract = new web3.eth.Contract(options.blockchain.abi, anchor.address);
    var anchorDetails = await contract.methods.getData().call();
    var transaction = await web3.eth.getTransactionReceipt(anchor.transactionHash);
    anchorDetails.transactionAccount = transaction.from;
    anchorDetails.transactionContractAddress = transaction.contractAddress;
    return anchorDetails;
}

async function retrieveAnchor(anchor, options) {
    var response = {};
    try {
        response = await axios.post('https://' + options.blockchain.web3.domain + '/anchoring/retrieveAnchor', anchor);
    } catch (error) {
        console.log(error);
    }
    return response.data;
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