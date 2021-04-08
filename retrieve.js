const jsonld = require('jsonld');
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const myEngine = newEngine();
const MerkleTools = require('merkle-tools');
const stringify = require('json-stable-stringify');

const hashingFunctions = require("./hashing.js");
const preprocess = require('./preprocess.js');
const defaults = require('./defaults').defaults;
const utils = require('./utils.js');

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
/*
class ResultGeneratorStar {
    resultArray = []

    quadProofs = {
        "@context": defaults.DEFAULT_JSONLD_CONTEXT
    };

    metadatas = [];
    triples = "";
    addResult(quad, metadata, proof) {
        var result = {
            "quad": quad,
            "indexhash": metadata.indexhash,
            "index": metadata.index,
            "merkleroot": metadata.tree.merkleroot,
            "proof": proof,
            "anchor": metadata.anchor,
            "settings": metadata.settings,
            "blanks": metadata.blanks
        };
        this.resultArray.push(result);
        var metadata = this.addMetadata(result);
        this.addToQuadProofObject(result, metadata);
    }

    addMetadata(result) {
        var metadata = {};
        metadata["@id"] = ":" + result.indexhash;
        metadata.indexhash = result.indexhash;
        metadata.index = result.index;
        metadata.merkleroot = result.merkleroot;
        metadata.anchor = {
            type: defaults.DEFAULT_ANCHOR_TYPE,
            address: result.anchor.address,
            account: result.anchor.account,
            indexhash: result.anchor.indexhash,
            settings: result.anchor.settings,
            transactionhash: result.anchor.transactionhash
        };
        metadata.blanks = result.blanks;
        this.metadatas.push(metadata);
        return metadata;
    }

    addTripleStar(result, metadata) {
        var quad = this.fixBlankURLs(result.quad, metadata);
        var prefix = defaults.DEFAULT_JSONLD_CONTEXT["@vocab"];
        var subjectStar = "<< " + quad.subjectString + " " + quad.predicateString + " " + quad.objectString + " >>";
        var metadataTripleStar = subjectStar
            + " <" + prefix + "metadata" + "> " + metadata["@id"] + " " + quad.graphString + ".";
        var proofTripleStar = subjectStar
            + " <" + prefix + "proof" + "> " + result.proof.join() + " " + quad.graphString + ".";
        this.triples += metadataTripleStar + "\n";
        this.triples += proofTripleStar + "\n";
    }

    proofToTriples(prefix, proof) {
        var proofObject = {
            "@context": defaults.DEFAULT_JSONLD_CONTEXT,
            proof: {
                "@list": proof
            }
        }
        var flat = jsonld.flatten(proofObject);
        var graph = flat["@graph"];
        var proofURL = '';
        for (var i = 0; i < graph.length; graph++) {
            var current = graph[i];
            if (typeof current === 'object' && Object.keys(current).includes(prefix + 'proof')) {
                proofURL = current["id"];
            }
        }
    }

    fixBlankURLs(quad, metadata) {
        var fixedQuad = {
            subjectString: this.fixBlankURL(quad.subjectString, metadata),
            predicateString: this.fixBlankURL(quad.predicateString, metadata),
            objectString: this.fixBlankURL(quad.ojectString, metadata),
            graphString: this.fixBlankURL(quad.graphString, metadata),
        };
        fixedQuad.quadString = quad.quadString.replace(quad.subjectString, fixedQuad.subjectString)
            .replace(quad.predicateString, fixedQuad.predicateString)
            .replace(quad.objectString, fixedQuad.objectString)
            .replace(quad.graphString, fixedQuad.graphString);
        return fixedQuad;
    }
    fixBlankURL(url, metadata) {
        url = url.replace("<", "").replace(">", "");
        if (url.includes('_:') || !metadata.blanks.includes(url)) {
            return url;
        } else {
            return "_:" + url;
        }
    }

    getQuadProofs() {
        return this.quadProofs;
    }

    toJSON() {
        var quadsStar = parser.parse(triples);
        return this.resultArray;
    }
}
*/
class ResultGenerator {
    resultArray = []

    quadProofs = {
        "@context": defaults.DEFAULT_JSONLD_CONTEXT
    };

    metadatas = [];
    quads = [];

    addResult(quad, metadata, proof) {
        var result = {
            "quad": quad,
            "indexhash": metadata.indexhash,
            "index": metadata.index,
            "merkleroot": metadata.tree.merkleroot,
            "proof": proof,
            "anchor": metadata.anchor,
            "settings": metadata.settings,
            "blanks": metadata.blanks
        };
        this.resultArray.push(result);
        var metadata = this.addMetadata(result);
        this.addToQuadProofObject(result, metadata);
    }

    addMetadata(result) {
        var metadata = {};
        metadata["@id"] = ":" + result.indexhash;
        metadata.indexhash = result.indexhash;
        metadata.index = result.index;
        metadata.merkleroot = result.merkleroot;
        metadata.anchor = {
            type: defaults.DEFAULT_ANCHOR_TYPE,
            address: result.anchor.address,
            account: result.anchor.account,
            indexhash: result.anchor.indexhash,
            settings: result.anchor.settings,
            transactionhash: result.anchor.transactionhash
        };
        metadata.blanks = result.blanks;
        this.metadatas.push(metadata);
        return metadata;
    }

    addToQuadProofObject(result, metadata) {
        console.log(stringify(result.quad, { space : 4 }));
        var quad = fixBlankURLs(result.quad, metadata);
        console.log(stringify(quad, { space: 4 }));
        if (!this.quadProofs["@context"].graphs) {
            this.quadProofs["@context"].graphs = {
                "@id": ":" + result.indexhash + "/graphs",
                "@container": ["@graph", "@id"]
            };
        }
        if (!this.quadProofs.graphs) {
            this.quadProofs.graphs = {};
        }
        var graphName = "@none";
        if (quad.graphString && quad.graphString !== "") {
            graphName = quad.graphString;

        }

        var graph = getObjectWithId(this.quadProofs, graphName);
        if (!graph) {
            this.quadProofs.graphs[graphName] = [];
            graph = this.quadProofs.graphs[graphName];
        }

        var subject = getObjectWithId(graph, quad.subjectString);
        if (!subject) {
            subject = {
                "@id": quad.subjectString
            };
            graph.push(subject);
        }

        if (!subject[quad.predicateString]) {
            subject[quad.predicateString] = {};
        }

        if (!subject[quad.predicateString][quad.objectString]) {
            subject[quad.predicateString][quad.objectString] = {};
        }

        subject[quad.predicateString][quad.objectString].metadata = metadata["@id"];
        subject[quad.predicateString][quad.objectString].proof = {
            "@list": result.proof
        };

    }

    getQuadProofs() {
        return this.quadProofs;
    }

    toJSON() {
        return this.resultArray;
    }
}

function fixBlankURLs(quad, metadata) {
    var fixedQuad = {
        subjectString: fixBlankURL(quad.subjectString, metadata),
        predicateString: fixBlankURL(quad.predicateString, metadata),
        objectString: fixBlankURL(quad.objectString, metadata),
        graphString: fixBlankURL(quad.graphString, metadata),
    };
    fixedQuad.quadString = quad.quadString;
    return fixedQuad;
}

function fixBlankURL(url, metadata) {
    if (url) {
        if (url.charAt(0) === "<" && url.charAt(url.length - 1) === ">") {
            url = url.substring(1, url.length - 1);
        }
        if (!url.includes('_:') && metadata.blanks.includes(url)) {
            return "_:" + url;
        } else {
            return url;
        }
    }
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
        var metadataParsed = await utils.parse(metadataQuads);
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

        SELECT ?indexhash ?indexhashalg ?divisor ?indextype ?lsd ?merkletreeid ?root ?treehashalg ?leafhashalg ?anchortype ?anchoraddress ?anchoraccount ?anchortransactionhash ?blanks (GROUP_CONCAT(DISTINCT ?leaf;separator=\", \") AS ?leaves) WHERE { 
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
                    :transactionhash ?anchortransactionhash.
            ?merkletrees :blanks ?blanks .}
        } GROUP BY ?indexhash ?indexhashalg ?divisor ?indextype ?lsd ?merkletreeid ?root ?treehashalg ?leafhashalg ?anchortype ?anchoraddress ?anchoraccount ?anchortransactionhash ?blanks`;

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
        results.blanks = bindings[i].get("?blanks") ? bindings[i].get("?blanks").value.split(",") : [];

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
    var canonicalQuads = await utils.parseToTerms(quads);

    for (let quad of canonicalQuads) {
        var hashes = await generateHashesFunction(quad["quadString"], source, options);

        var matchingMetadata = await matchHashes(hashes, source);
        if (matchingMetadata.length > 0) {
            for (let metadata of matchingMetadata) {
                resultGenerator = retrieveProofFromMetadata(quad, metadata, resultGenerator);
            }
        }
    }

    return resultGenerator;
}

async function retrieveProofFromMetadata(quad, metadata, resultGenerator) {
    var leafArray = metadata.tree.merkleleaves.leaves['@list'];
    var leaf = await doHash(quad['quadString'], metadata.settings.quadHash);
    var proof = getProof(leaf, leafArray, metadata.settings.treeHash);
    var merkleRoot = metadata.tree.merkleroot;

    if (merkleRoot === proof.merkleroot //&&
        //await matchesIndexToTree(quad,
        //  merkleRoot, metadata.index, metadata)) {
    ) {
        resultGenerator.addResult(quad, metadata, proof.merkleProof);
    }
    return resultGenerator;
}

async function getQuadProofsFromMetadata(quads, metadata) {
    var resultGenerator = new ResultGenerator();
    var canonicalQuads = await utils.parseToTerms(quads);
    for (let quad of canonicalQuads) {
        resultGenerator = await retrieveProofFromMetadata(quad, metadata, resultGenerator);
    }
    return resultsGenerator.toJSON();
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
exports.matchHashes = matchHashes;
exports.getLeaves = getLeaves;
exports.getProof = getProof;
exports.getQuadProofs = getQuadProofs;
exports.getQuadProofsFromMetadata = getQuadProofsFromMetadata;

var options = {
    "divisor": "0x1",
    "indexType": "object",
    "lsd": 64,
    "indexHash": "KECCAK-256"
};

var url = 'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl';

var inputQuads = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n";

getQuadProofs(inputQuads, url, options).then((quadProofs) => {
    //assert.strictEqual(stringify(quadProofs, { space: 4 }), stringify(proofsToGenerate, { space: 4 }), "Not equal");
    console.log(stringify(quadProofs, { space: 4 }));
});
