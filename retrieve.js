


class HashGenerator {

    generateHashes(quads) {
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

class ProofMatcher {

    matchesRoot(merkleRoot) {
        return false;
    }

    macthesIndexToTree(indexToTree) {
        return false;
    }
}

class ResultGenerator {
    addResult (indexToTree, merkleRoot, merkleProof) {

    }

    toJsonLd() {
        return undefined;
    }
}


function retrieveJson(quads, url, options){
    var resultGenerator = new resultGenerator();
    var hashGenerator = new HashGenerator(url, options);
    var hashes = hashGenerator.generateHashes(quads);
    for (let hash of hashes){
        var databaseMediator = new DatabaseProxy(url);
        var leaves = databaseMediator.getLeaves(hash);
        var merkleRoot = databaseMediator.getMerkleRoot(hash);
        var indexToTree = databaseMediator.getIndexToTree(hash);
        for (let leaf of leaves){
            var proofRetriever = new ProofRetriever(url);
            var merkleProof = proofRetriever.getProof(leaf);
            var proofMatcher = new ProofMatcher(merkleProof);
            if (proofMatcher.matchesRoot(merkleRoot) && proofMatcher.macthesIndexToTree(indexToTree)){
                resultGenerator.addResult(indexToTree, merkleRoot, merkleProof);
            }
        }
    }
    return resultGenerator.toJsonLd();
}

exports.retrieveJson = retrieveJson