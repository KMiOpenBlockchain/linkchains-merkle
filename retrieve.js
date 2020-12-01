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

async function matchHashes(hashes, metadatasource) {
    const query = `PREFIX : <https://blockchain.open.ac.uk/vocab/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?indexhash ?indexhashalg ?divisor ?indextype ?lsd ?merkletreeid ?root ?treehashalg ?leafhashalg (GROUP_CONCAT(DISTINCT ?leaf;separator=\", \") AS ?leaves) WHERE { 
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
        } GROUP BY ?indexhash ?indexhashalg ?divisor ?indextype ?lsd ?merkletreeid ?root ?treehashalg ?leafhashalg`;


    const result = await myEngine.query(
        query,
        {
            sources: [metadatasource],
        }
    );
    const bindings = await result.bindings();

    var records = [];
    for (var i = 0; i < bindings.length; i++) {
        var results = {};
        results.indexHash = bindings[i].get("?indexhash").value;
        results.index = await getIndex(results.indexHash, metadatasource);
        
        results.tree = {};
        results.tree.merkleroot = bindings[i].get("?root").value;
        results.tree.merkleleaves = {};
        results.tree.merkleleaves.leaves = {
            "@list" : [...bindings[i].get("?leaves").value.split(", ")]
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

        records.push(results);
    }


    return records;

}

async function getIndex(indexHash, metadatasource) {
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
        {
            sources: [metadatasource],
        }
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

async function retrieveJson(quads, url, options){
    var databaseMediator = new DatabaseProxy(url);
    var resultGenerator = new ResultGenerator();
    var proofRetriever = new ProofRetriever(url);
    var canonicalQuads = renderQuadsCanonical(quads);

    for (let quad of canonicalQuads){
        var hashes = await generateHashesFunction(quad, url, options);
        var matchingMetadata = await matchHashes(hashes, url);

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