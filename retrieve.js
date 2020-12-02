const N3 = require('n3');
const parser = new N3.Parser();
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const myEngine = newEngine();
const Hashing = require("./hashing.js");
const preprocess = require('./preprocess.js');
const MerkleTools = require('merkle-tools');
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

    async generateHashes(quadString) {
        var result = []
        var algorithms = await this.getAlgorithms();
        for (let algorithm of algorithms ){
            var passedAlgorithm = { "type": algorithm}
            var hashPerAlgorithm = await Hashing.getHash(quadString, passedAlgorithm);
            result.push(hashPerAlgorithm);
        }
        return result;
    }
}

class DatabaseProxy {

    getMetadata(hash){
        return undefined;
    }
}

class ProofRetriever {
    getProof(leaf, leafArray, algorithm){
        var merkleTools = new MerkleTools( { hashType : algorithm } ); // obviously not going to be a hardcoded literal string as the hashType in practice
        merkleTools.addLeaves(leafArray, false); // hashList taken from whatever output object step 4 gives.
        merkleTools.makeTree();

        // this is the single function call I meant. Admittedly yes, setting up the merkleTools instance to enable it is another three lines beforehand. :-)
        var index = leafArray.findIndex( (result) => result === leaf);
        var proofForLeaf = merkleTools.getProof( index, false);
        return proofForLeaf;
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

    retrieve(item,arrayOfIndices,returnObjectIfNotFound){
        if (arrayOfIndices.length === 0){
            return item;
        } else {
            var data = arrayOfIndices.shift();
            if (item[data] === undefined) {
                return returnObjectIfNotFound;
            } else {
                return this.retrieve(item[data],arrayOfIndices, returnObjectIfNotFound);
            }
        }
    }

    getLeaves(metadataItem){
        return this.retrieve(metadataItem, ['tree', 'merkleleaves', 'leaves', '@list'], []);
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

async function generateHashesFunction(quadString, url, options) {
    var hashGenerator = new HashGenerator(url, options);
    var hashes = await hashGenerator.generateHashes(quadString);
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

function getLeaves(matchingMetadataItem) {
    var queryData = new QueryData();
    return queryData.getLeaves(matchingMetadataItem);
}

function getProof(leaf, leafArray, algorithm) {
    var proofRetriever = new ProofRetriever();
    return proofRetriever.getProof(leaf, leafArray, algorithm);
}

async function doHash(quadString, algorithm) {
    var hashPerAlgorithm = await Hashing.getHash(quadString, passedAlgorithm);
}

async function retrieveJson(quads, url, options){
    var databaseMediator = new DatabaseProxy(url);
    var resultGenerator = new ResultGenerator();
    var canonicalQuads = renderQuadsCanonical(quads);

    for (let quad of canonicalQuads){
        var hashes = await generateHashesFunction(quad["quadstring"], url, options);

        var matchingMetadata = await matchHashes(hashes, url);
        if (matchingMetadata.length > 0) {
            for (let matchingMetadataItem of matchingMetadata) {
                var queryData = new QueryData();
                var leafArray =  getLeaves(matchingMetadataItem);
                var leaf = doHash(quad["quadstring"],matchingMetadataItem["settings"]["quadhash"]);
                var merkleProof = getProof(leaf, leafArray, matchingMetadataItem["settings"]["treehash"]);
                if (matchesRoot(merkleProof, queryData.getMerkleRoot()) &&
                    macthesIndexToTree(merkleProof, queryData.getIndexToTree())) {
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
exports.matchHashes = matchHashes;
exports.getLeaves = getLeaves;
exports.getProof = getProof;