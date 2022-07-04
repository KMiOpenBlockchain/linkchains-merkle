const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const quadmetadata = require('./quadmetadata.js');
const anchor = require('./MerQLAnchor.js');
const verify = require('./verify.js');
const utils = require('./utils.js');
const stringify = require('json-stable-stringify');
const { defaults } = require('./defaults.js');

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
            var normalMetadata = await utils.normaliseMetadata(metadata);
            var quadProofs = await quadmetadata.perQuadProofs(canonical, normalMetadata);
            return quadProofs;
        } catch (error) {
            throw new Error("Error getting granular verification metadata: " + error.toString());
        }
    },
    anchorMetadata: async function (metadata, options, anchorFunction) {
        try {
            if (anchorFunction) {
                var normalMetadata = await utils.normaliseMetadata(metadata);
                var anchoredMetadata = await anchor.anchor(normalMetadata, options, anchorFunction);
                return anchoredMetadata;
            } else {
                var normalMetadata = await utils.normaliseMetadata(metadata);
                var anchoredMetadata = await anchor.defaultAnchor(normalMetadata, options);
                return anchoredMetadata;
            }
        } catch (error) {
            throw new Error("Error anchoring metadata to ledger: " + error.toString());
        }
    },
    verify: async function (quads, metadata, options, retrieveAnchor) {
        try {
            var canonical = await utils.canonicalise(quads);
            var normalMetadata = await utils.normaliseMetadata(metadata);
            var verification = await verify.verify(canonical, normalMetadata, options, retrieveAnchor);
            return verification;
        } catch (error) {
            throw new Error("Error getting performing verification: " + error.toString());
        }

    }
};
