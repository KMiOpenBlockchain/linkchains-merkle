const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const quadmetadata = require('./quadmetadata.js');
const verify = require('./verify.js');

module.exports = {
    getVerificationMetadata: async function (quads, options) {
        var jsonHashes = await preprocess.divideQuadsIntoHashLists(quads, options);
        var merkleTrees = await merkle.hashListsToMerkleTrees(jsonHashes, options);
        return merkleTrees;
    },
    getGranularVerificationMetadata : async function(quads, metadata) {
        var quadProofs = await quadmetadata.perQuadProofs(quads, metadata);
        return quadProofs;
    },
    verify : async function(quads, metadata, options) {
        var verification = await verify.verify(quads, metadata, options);
        return verification;
    }
};