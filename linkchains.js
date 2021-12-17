const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const quadmetadata = require('./quadmetadata.js');
const anchor = require('./MerQLAnchor.js');
const verify = require('./verify.js');
const utils = require('./utils.js');


module.exports = {
    getVerificationMetadata: async function (quads, options) {
        try {
            var canonical = await utils.canonicalise(quads);
            var jsonHashes = await preprocess.divideQuadsIntoHashLists(canonical, options);
            var merkleTrees = await merkle.hashListsToMerkleTrees(jsonHashes, options);
            return merkleTrees;
        } catch (error) {
            throw new Error("Error getting verification metadata: " + error.toString());
        }
    },
    getGranularVerificationMetadata: async function (quads, metadata) {
        try {
            var canonical = await utils.canonicalise(quads);
            var quadProofs = await quadmetadata.perQuadProofs(canonical, metadata);
            return quadProofs;
        } catch (error) {
            throw new Error("Error getting granular verification metadata: " + error.toString());
        }
    },
    anchorMetadata: async function (metadata, options, anchorFunction) {
        try {
            if (anchorFunction) {
                var anchoredMetadata = await anchor.anchor(metadata, options, anchorFunction);
                return anchoredMetadata;
            } else {
                var anchoredMetadata = await anchor.defaultAnchor(metadata, options);
                return anchoredMetadata;
            }
        } catch (error) {
            throw new Error("Error anchoring metadata to ledger: " + error.toString());
        }
    },
    verify: async function (quads, metadata, options, retrieveAnchor) {
        try {
            var canonical = await utils.canonicalise(quads);
            var verification = await verify.verify(canonical, metadata, options, retrieveAnchor);
            return verification;
        } catch (error) {
            throw new Error("Error getting performing verification: " + error.toString());
        }

    }
};