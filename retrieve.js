


class HashGenerator {

    generateHashes(quad) {
        return undefined;
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

function retrieveJson(quads, url, options){
    var databaseMediator = new DatabaseProxy(url);
    var resultGenerator = new ResultGenerator();
    var hashGenerator = new HashGenerator(url, options);
    var proofRetriever = new ProofRetriever(url);

    for (let quad of quads){
        var hashes = hashGenerator.generateHashes(quad);
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

exports.retrieveJson = retrieveJson