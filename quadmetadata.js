const MerkleTools = require('merkle-tools');
const stringify = require('json-stable-stringify');

const hashingFunctions = require("./hashing.js");
const defaults = require('./defaults').defaults;
const utils = require('./utils.js');

function getProof(leaf, leafArray, algorithm) {
    var merkleTools = new MerkleTools({ hashType: algorithm });
    merkleTools.addLeaves(leafArray, false);
    merkleTools.makeTree();

    var index = leafArray.findIndex((result) => result === leaf);
    var proofForLeafSet = merkleTools.getProof(index, false);
    return {
        proof: proofForLeafSet,
        merkleroot: merkleTools.getMerkleRoot().toString('hex')
    };
}

function transformMetadata(youtadata) {
    var metadata = {};
    metadata["@id"] = ":" + youtadata.merkletrees.indexhash;
    metadata.indexhash = youtadata.merkletrees.indexhash;
    metadata.index = youtadata.merkletrees.index;
    metadata.anchor = {
        type: defaults.DEFAULT_ANCHOR_TYPE,
        address: youtadata.merkletrees.anchor.address,
        account: youtadata.merkletrees.anchor.account,
        indexhash: youtadata.merkletrees.anchor.indexhash,
        settings: youtadata.merkletrees.anchor.settings,
        transactionhash: youtadata.merkletrees.anchor.transactionhash
    };
    metadata.blanks = youtadata.merkletrees.blanks;
    return metadata;
}

function makePlainQuad(quad) {
    var plainQuad = {
        subjectString: removeAngleBrackets(quad.subjectString),
        predicateString: removeAngleBrackets(quad.predicateString),
        objectString: removeAngleBrackets(quad.objectString),
        graphString: removeAngleBrackets(quad.graphString),
    };
    return plainQuad;
}

function removeAngleBrackets(url) {
    if (url.startsWith('<') && url.endsWith('>')) {
        url = url.substring(1, url.length - 1);
    }
    return url;
}

async function createGraphObject(graphname) {
    return {
        "graphname": graphname,
        proofs: {
            "@type": "@json",
            "@value": {}
        }
    };
}
async function findGraph(json, graphname) {
    if (!json.graphs) {
        return undefined
    }
    const graphs = json.graphs;
    for (const graph of graphs) {
        if (graph.graphname === graphname) {
            return graph;
        }
    }
    return undefined
}

async function quadProofsToJSONLD(quadProofs, youtadata) {

    var metadata = transformMetadata(youtadata);

    var quadProofsLD = {
        "@context": defaults.DEFAULT_JSONLD_CONTEXT,
        "graphs" : []
    };

    quadProofsLD.graphs.push(await createGraphObject("defaultgraph"));
    quadProofsLD.metadata = metadata;

    for (var i = 0; i < quadProofs.length; i++) {
        var quad = makePlainQuad(quadProofs[i].quad);
        var proof = quadProofs[i].proof;
        var merkleroot = quadProofs[i].merkleroot;

        var graph = await findGraph(quadProofsLD, "defaultgraph");
        if (quad.graphString && quad.graphString !== "") {
            if (!findGraph(quadProofsLD, quad.graphString)) {
                graph = await createGraphObject(quad.graphString);
            } else {
                graph = findGraph(quadProofsLD, quad.graphString);
            }
        }

        graph = graph.proofs['@value'];
        if (!graph[quad.subjectString]) {
            graph[quad.subjectString] = {};
        }

        var subject = graph[quad.subjectString];

        if (!subject[quad.predicateString]) {
            subject[quad.predicateString] = {};
        }

        var predicate = subject[quad.predicateString];

        if (!predicate[quad.objectString]) {
            predicate[quad.objectString] = {};
        }

        var object = predicate[quad.objectString];

        object.metadata = metadata["@id"];
        object.proof = {
            "@list": proof
        };
        object.merkleroot = merkleroot;
    }
    return quadProofsLD;
}

function getObjectWithId(object, id) {
    if (!object || !id || typeof object !== 'object') {
        return undefined;
    }
    if (object["@id"] && object["@id"] === id) {
        return object;
    } else {
        Object.keys(object).some((key) => {
            return getObjectWithId(object[key], id);
        });
    }
}

function getObjectWithKey(object, key) {
    if (!object || !key || typeof object !== 'object') {
        return undefined;
    }
    if (object[key]) {
        return object;
    } else {
        Object.keys(object).some((searchKey) => {
            return getObjectWithKey(object[searchKey], key);
        });
    }
}


function findLeafArray(leaf, trees) {
    var leafArray = [];
    for (var i = 0; i < trees.length; i++) {
        var leaves = trees[i].merkleleaves.leaves["@list"];
        if (leaves.includes(leaf)) {
            leafArray = leaves;
            return leafArray;
        }
    }
    return leafArray;
}

async function perQuadProofs(quads, metadata) {
    var quadProofs = await getQuadProofs(quads, metadata);
    return await quadProofsToJSONLD(quadProofs, metadata);
}

async function getQuadProofs(quads, metadata) {
    var quadProofs = [];
    
    var parsedQuads = await utils.parseCanonical(quads);
    
    for (var i = 0; i < parsedQuads.length; i++) {
        var proof = await getQuadProof(parsedQuads[i], metadata);
        quadProofs.push(proof);
    }
    return quadProofs;
}

async function getQuadProof(quad, metadata) {
    var quadTerms = utils.makeQuadString(quad);
    var leaf = await hashingFunctions.getHash(quadTerms.quadString, { type: metadata.merkletrees.treesettings.quadHash });
    var leafArray = findLeafArray(leaf, metadata.merkletrees.trees["@list"]);
    var proof = getProof(leaf, leafArray, metadata.merkletrees.treesettings.treeHash);
    proof.n3quad = quad;
    proof.quad = quadTerms;
    return proof;
}

exports.perQuadProofs = perQuadProofs;
