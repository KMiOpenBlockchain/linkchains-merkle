const N3 = require('n3');
const parser = new N3.Parser({ blankNodePrefix: '' });
const jsonld = require('jsonld');
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const myEngine = newEngine();
const MerkleTools = require('merkle-tools');
const stringify = require('json-stable-stringify');

const hashingFunctions = require("./hashing.js");
const preprocess = require('./preprocess.js');
const defaults = require('./defaults').defaults;


class HashGenerator {

    metadataSource = ""

    constructor(builtMetadataSource) {
        this.metadataSource = builtMetadataSource;
    }

    async getAlgorithms() {
        const result = await myEngine.query(
            `PREFIX : <https://blockchain.open.ac.uk/vocab/>

        SELECT DISTINCT ?algorithm WHERE { 
            ?s :treesettings ?o .
            ?o :quadHash ?algorithm . 
        }`,
            this.metadataSource
        );
        const bindings = await result.bindings();

        var algorithms = [];
        for (var i = 0; i < bindings.length; i++) {
            algorithms.push(bindings[i].get('?algorithm').value);
        }

        return algorithms;
    }

    async generateHashes(quadString) {
        var result = []
        var algorithms = await this.getAlgorithms();
        for (let algorithm of algorithms) {
            var passedAlgorithm = { "type": algorithm }
            var hashPerAlgorithm = await hashingFunctions.getHash(quadString, passedAlgorithm);
            result.push(hashPerAlgorithm);
        }
        return result;
    }
}

class DatabaseProxy {

    getMetadata(hash) {
        return undefined;
    }
}

class ProofRetriever {
    getProof(leaf, leafArray, algorithm) {
        var merkleTools = new MerkleTools({ hashType: algorithm });
        merkleTools.addLeaves(leafArray, false);
        merkleTools.makeTree();

        var index = leafArray.findIndex((result) => result === leaf);
        var proofForLeafSet = merkleTools.getProof(index, false);
        return { "merkleProof": proofForLeafSet, "merkleroot": merkleTools.getMerkleRoot().toString('hex') };
    }
}

class ResultGenerator {
    resultArray = []

    quadProofs = {
        "@context": defaults.DEFAULT_JSONLD_CONTEXT
    };

    addResult(quad, metadata, proof) {
        var result = {
            "quad": quad,
            "indexhash": metadata.indexhash,
            "index": metadata.index,
            "merkleroot": metadata.tree.merkleroot,
            "proof": proof,
            "anchor": metadata.anchor,
            "settings": metadata.settings
        };
        this.resultArray.push(result);
        this.addToQuadProofObject(result);
    }

    addToQuadProofObject(result) {
        var base = this.quadProofs;
        var quad = result.quad;
        if (quad.graphString !== "") {
            if (!this.quadProofs[quad.graphString]) {
                this.quadProofs[quad.graphString] = {};
            }
            base = this.quadProofs[quad.graphString];
        }

        if (!base[quad.subjectString]) {
            base[quad.subjectString] = {};
        }

        if (!base[quad.subjectString][quad.predicateString]) {
            base[quad.subjectString][quad.predicateString] = {};
        }

        if (!base[quad.subjectString][quad.predicateString][quad.objectString]) {
            base[quad.subjectString][quad.predicateString][quad.objectString] = {};
        }
        base[quad.subjectString][quad.predicateString][quad.objectString].anchor = {
            type: defaults.DEFAULT_ANCHOR_TYPE,
            address: result.anchor.address,
            account: result.anchor.account,
            indexhash : result.anchor.indexhash,
            settings : result.anchor.settings,
            transactionhash: result.anchor.transactionhash
        };

        base[quad.subjectString][quad.predicateString][quad.objectString].indexhash = result.indexhash;
        base[quad.subjectString][quad.predicateString][quad.objectString].index = result.index;
        base[quad.subjectString][quad.predicateString][quad.objectString].merkleroot = result.merkleroot;
        base[quad.subjectString][quad.predicateString][quad.objectString].proof = result.proof;
        base[quad.subjectString][quad.predicateString][quad.objectString].settings = result.settings;

    }

    getQuadProofs() {
        return this.quadProofs;
    }

    toJSON() {
        return this.resultArray;
    }
}

async function generateIndexFrom(settings, quad) {
    var quadHashFunction = async function (input) {
        return hashingFunctions.getHash(input, {
            "type": settings.quadHash ? settings.quadHash : defaultHash
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

async function matchesIndexToTree(quad, merkleRoot, indices, metadata) {
    var index = await generateIndexFrom(metadata.settings, quad);

    if (!containsMerkleRoot(indices, index, merkleRoot)) {
        return false;
    }

    var hashAlgorithm = metadata.settings.indexHash ? metadata.settings.indexHash : defaultHash;

    var calculatedIndexHash = await doHash(JSON.stringify(indices), hashAlgorithm);

    return calculatedIndexHash === metadata.indexhash;
}

async function generateHashesFunction(quadString, source, options) {
    var builtSource = await buildMetadataSource(source);
    var hashGenerator = new HashGenerator(builtSource, options);
    var hashes = await hashGenerator.generateHashes(quadString);
    return hashes;
}

function renderQuadsCanonical(quads) {
    var parsedQuads = parser.parse(quads);

    var canonicalQuads = [];
    for (let quad of parsedQuads) {
        var quadString = preprocess.makeQuadString(quad);
        canonicalQuads.push(quadString);
    }

    return canonicalQuads;
}

async function buildMetadataSource(metadataSource) {
    var source = '';
    if (typeof (metadataSource) === 'string') {
        try {
            source = JSON.parse(metadataSource);
        } catch {
            return {
                'sources': [metadataSource]
            };
        }
    } else if (typeof (metadataSource) === Array) {
        return {
            'sources': metadataSource
        }
    } else {
        source = metadataSource;
    }
    if ('@context' in source) {
        var metadataQuads = await jsonld.toRDF(source, { format: 'application/n-quads' });
        var metadataParsed = await parser.parse(metadataQuads);
        var store = new N3.Store();
        store.addQuads(metadataParsed);
        return {
            sources: [
                {
                    type: 'rdfjsSource',
                    value: store
                }
            ]
        };
    } else {
        throw new Error({ "InvalidParameters": "Data source cannot be parsed." });
    }
}

async function matchHashes(hashes, metadatasource) {
    var source = await buildMetadataSource(metadatasource);
    const query = `PREFIX : <https://blockchain.open.ac.uk/vocab/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?indexhash ?indexhashalg ?divisor ?indextype ?lsd ?merkletreeid ?root ?treehashalg ?leafhashalg ?anchortype ?anchoraddress ?anchoraccount ?anchortransactionhash (GROUP_CONCAT(DISTINCT ?leaf;separator=\", \") AS ?leaves) WHERE { 
            ?tree :merkleleaves ?merkleleaves .
            ?merkleleaves :leafhashalg ?leafhashalg ;
                          :leaves ?leaveslist .
            
            VALUES ?targetleaf { \"${hashes.join("\", \"")}\" }
            ?leaveslist rdf:rest*/rdf:first ?targetleaf .
            ?leaveslist rdf:rest*/rdf:first ?leaf .
            ?tree :merkleroot ?root ;
                  :merkletreeid ?merkletreeid ;
                  :treehashalg ?treehashalg . 
            ?record :merkletrees ?merkletrees .
            ?merkletrees :trees ?trees .
            ?trees rdf:rest*/rdf:first ?tree . 
            ?merkletrees :indexhash ?indexhash ;
                         :indexhashalg ?indexhashalg ;
                         :treesettings ?treesettings . 
            ?treesettings :divisor ?divisor ;
                          :indexType ?indextype ;
                          :lsd ?lsd .
            OPTIONAL { ?merkletrees :anchor ?anchor .
            ?anchor :type ?anchortype ;
                    :address ?anchoraddress;
                    :account ?anchoraccount;
                    :transactionhash ?anchortransactionhash.}
            
        } GROUP BY ?indexhash ?indexhashalg ?divisor ?indextype ?lsd ?merkletreeid ?root ?treehashalg ?leafhashalg ?anchortype ?anchoraddress ?anchoraccount ?anchortransactionhash`;

    const result = await myEngine.query(
        query,
        source
    );
    const bindings = await result.bindings();

    var records = [];
    for (var i = 0; i < bindings.length; i++) {
        var results = {};
        results.indexhash = bindings[i].get("?indexhash").value;
        results.index = await getIndex(results.indexhash, metadatasource);

        results.tree = {};
        results.tree.merkleroot = bindings[i].get("?root").value;
        results.tree.merkleleaves = {};
        results.tree.merkleleaves.leaves = {
            "@list": [...bindings[i].get("?leaves").value.split(", ")]
        };
        results.tree.merkleleaves.leafhashalg = bindings[i].get("?leafhashalg").value;
        results.tree.merkletreeid = bindings[i].get("?merkletreeid").value;
        results.tree.treehashalg = bindings[i].get("?treehashalg").value;

        results.settings = {};
        results.settings.indexHash = bindings[i].get("?indexhashalg").value;
        results.settings.treeHash = bindings[i].get("?treehashalg").value;
        results.settings.quadHash = bindings[i].get("?leafhashalg").value;
        results.settings.indexType = bindings[i].get("?indextype").value;
        results.settings.lsd = bindings[i].get("?lsd").value;
        results.settings.divisor = bindings[i].get("?divisor").value;

        results.anchor = {};
        results.anchor.type = bindings[i].get("?anchortype") ? bindings[i].get("?anchortype").value : "NoAnchor";
        results.anchor.address = bindings[i].get("?anchoraddress") ? bindings[i].get("?anchoraddress").value : "0x00000000000000000000000000000000";
        results.anchor.account = bindings[i].get("?anchoraccount") ? bindings[i].get("?anchoraccount").value : "0x00000000000000000000000000000000";
        results.anchor.transactionhash = bindings[i].get("?anchortransactionhash") ? bindings[i].get("?anchortransactionhash").value : "0x00000000000000000000000000000000";
        results.anchor.settings = results.settings;
        results.anchor.indexhash = results.indexhash;
        records.push(results);
    }


    return records;

}

async function getIndex(indexHash, metadatasource) {
    var source = await buildMetadataSource(metadatasource);
    const query = `PREFIX : <https://blockchain.open.ac.uk/vocab/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT ?merkletreeid ?root (COUNT(?step) as ?index) WHERE { 
        ?record :merkletrees ?merkletrees .
        ?merkletrees :trees ?trees ;
                     :indexhash \"${indexHash}\".
        ?trees rdf:rest*/rdf:first ?tree . 
        ?trees rdf:rest* ?step .
        ?step rdf:rest* / rdf:first ?tree .
        ?tree :merkleroot ?root ;
              :merkletreeid ?merkletreeid . 
    } GROUP BY ?merkletreeid ?root ORDER BY ?index`;


    const result = await myEngine.query(
        query,
        source
    );
    const bindings = await result.bindings();

    var results = [];
    for (var i = 0; i < bindings.length; i++) {
        var entry = {};
        entry[bindings[i].get("?merkletreeid").value] = bindings[i].get("?root").value;
        results.push(entry);
    }
    return results;
}

function getLeaves(matchingMetadataItem) {
    return matchingMetadataItem.tree.merkleleaves.leaves["@list"];
}

function getProof(leaf, leafArray, algorithm) {
    var proofRetriever = new ProofRetriever();
    return proofRetriever.getProof(leaf, leafArray, algorithm);
}

async function doHash(message, passedAlgorithm) {
    var algorithm = { "type": passedAlgorithm };
    var hashPerAlgorithm = await hashingFunctions.getHash(message, algorithm);
    return hashPerAlgorithm;
}

async function retrieveProofs(quads, source, options) {
    var resultGenerator = new ResultGenerator();
    var canonicalQuads = renderQuadsCanonical(quads);

    for (let quad of canonicalQuads) {
        var hashes = await generateHashesFunction(quad["quadString"], source, options);

        var matchingMetadata = await matchHashes(hashes, source);
        if (matchingMetadata.length > 0) {
            for (let metadata of matchingMetadata) {
                var leafArray = metadata.tree.merkleleaves.leaves['@list'];
                var leaf = await doHash(quad['quadString'], metadata.settings.quadHash);
                var proof = getProof(leaf, leafArray, metadata.settings.treeHash);
                var merkleRoot = metadata.tree.merkleroot;

                if (merkleRoot === proof.merkleroot &&
                    await matchesIndexToTree(quad,
                        merkleRoot, metadata.index, metadata)) {
                    resultGenerator.addResult(quad, metadata, proof.merkleProof);
                }
            }
        }
    }

    return resultGenerator;
}

async function retrieveJson(quads, source, options) {
    var resultGenerator = await retrieveProofs(quads, source, options);
    return resultGenerator.toJSON();
}

async function getQuadProofs(quads, source, options) {
    var resultGenerator = await retrieveProofs(quads, source, options);
    return resultGenerator.getQuadProofs();
}

exports.generateHashesFunction = generateHashesFunction;
exports.retrieveJson = retrieveJson;
exports.renderQuadsCanonical = renderQuadsCanonical;
exports.matchHashes = matchHashes;
exports.getLeaves = getLeaves;
exports.getProof = getProof;
exports.getQuadProofs = getQuadProofs;