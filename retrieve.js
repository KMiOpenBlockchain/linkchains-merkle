const N3 = require('n3');
const parser = new N3.Parser();
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const myEngine = newEngine();
const Hashing = require("./hashing.js")
const preprocess = require('./preprocess.js')
var stringify = require('json-stable-stringify');



class HashGenerator {

    metadataSource = ""

    constructor (metadataSource){
        this.metadataSource = metadataSource;
    }

    async getAlgorithms() {
        const result = await myEngine.query(
            `PREFIX : <https://blockchain.open.ac.uk/vocab/>

        SELECT DISTINCT ?algorithm WHERE { 
            ?s :treesettings ?o .
            ?o :quadHash ?algorithm . 
        }`,
            {
                sources: [this.metadataSource],
            }
        );
        const bindings = await result.bindings();

        var algorithms = [];
        for (var i = 0; i < bindings.length; i++) {
            algorithms.push(bindings[i].get('?algorithm').value);
        }

        return algorithms;
    }

    async generateHashes(quad) {
        var result = []
        var algorithms = await this.getAlgorithms();
        for (let algorithm of algorithms ){
            var passedAlgorithm = { "type": algorithm}
            var hashPerAlgorithm = await Hashing.getHash(stringify(quad), passedAlgorithm);
            result.push(hashPerAlgorithm);
        }
        return result;
    }
}

class DatabaseProxy {

    getLeaves(hash) {
        return undefined;
    }

    getIndexToTree(hash){
        return undefined;
    }
}

class ProofRetriever {
    getProof(leaf){
        return undefined;
    }
}

class ResultGenerator {
    addResult (indexToTree, merkleRoot, merkleProof) {

    }

    toJsonLd() {
        return undefined;
    }
}

class QueryData {

    getLeaves(){
        return undefined;
    }

    getMerkleRoot(){
        return undefined;
    }

    getIndexToTree(){
        return undefined;
    }
}

function matchesRoot(merkleProof, merkleRoot) {
    return false;
}

function macthesIndexToTree(merkleProof, indexToTree) {
    return false;
}

async function generateHashesFunction(quad, url, options) {
    var hashGenerator = new HashGenerator(url, options);
    var hashes = await hashGenerator.generateHashes(quad);
    return hashes;
}

function renderQuadsCanonical(quads) {
    var parsedQuads = parser.parse(quads);
    var canonicalQuads = parsedQuads.map( quad => preprocess.makeQuadString(quad));
    return canonicalQuads;
}

function retrieveJson(quads, url, options){
    var databaseMediator = new DatabaseProxy(url);
    var resultGenerator = new ResultGenerator();
    var proofRetriever = new ProofRetriever(url);
    var canonicalQuads = renderQuadsCanonical(quads);

    for (let quad of canonicalQuads){
        var hashes = generateHashesFunction(quad, url, options);
        for (let hash of hashes){
            var queryData  = databaseMediator.getQueryResult(hash);
            for (let leaf of queryData.getLeaves()){
                var merkleProof = proofRetriever.getProof(leaf);
                if (matchesRoot(merkleProof, queryData.getMerkleRoot()) &&
                    macthesIndexToTree(merkleProof, queryData.getIndexToTree())){
                    resultGenerator.addResult(quad, queryData.getIndexToTree(), queryData.getMerkleRoot(), merkleProof);
                }
            }
        }
    }

    return resultGenerator.toJsonLd();
}

exports.generateHashesFunction = generateHashesFunction;
exports.retrieveJson = retrieveJson;
exports.renderQuadsCanonical= renderQuadsCanonical;