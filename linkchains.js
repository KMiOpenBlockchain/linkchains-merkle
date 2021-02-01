const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const retrieve = require('./retrieve.js');
const verify = require('./verify.js');

module.exports = {
    getVerificationMetadata: async function (quads, options) {
        var jsonHashes = await preprocess.divideQuadsIntoHashLists(quads, options);
        console.log(JSON.stringify(jsonHashes));
        console.log(JSON.stringify(merkle));
        var merkleTrees = await merkle.hashListsToMerkleTrees(jsonHashes, options);
        console.log(JSON.stringify(merkleTrees));
        return merkleTrees;
    },
    getGranularVerificationMetadata : async function(quads, metadata, options) {
        var quadProofs = await retrieve.getQuadProofs(quads, metadata, options);
        console.log(JSON.stringify(quadProofs));
        return quadProofs;
    },
    verify : async function(quads, metadata, options) {
        var verification = await verify.verify(quads, metadata, options);
        console.log(JSON.stringify(verification));
        return verification;
    }
};