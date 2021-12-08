const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');
const quadmetadata = require('./quadmetadata.js');
const anchor = require('./MerQLAnchor.js');
const verify = require('./verify.js');
const utils = require('./utils.js');

const jsonld = require('jsonld');

// how to override the default document loader with a custom one -- for
// example, one that uses pre-loaded contexts:

// define a mapping of context URL => context doc
const CONTEXTS = {
    "https://w3id.org/openbadges/v2": {
        "@context": {
            "id": "@id",
            "type": "@type",

            "extensions": "https://w3id.org/openbadges/extensions#",
            "obi": "https://w3id.org/openbadges#",
            "validation": "obi:validation",

            "cred": "https://w3id.org/credentials#",
            "dc": "http://purl.org/dc/terms/",
            "schema": "http://schema.org/",
            "sec": "https://w3id.org/security#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",

            "AlignmentObject": "schema:AlignmentObject",
            "CryptographicKey": "sec:Key",
            "Endorsement": "cred:Credential",

            "Assertion": "obi:Assertion",
            "BadgeClass": "obi:BadgeClass",
            "Criteria": "obi:Criteria",
            "Evidence": "obi:Evidence",
            "Extension": "obi:Extension",
            "FrameValidation": "obi:FrameValidation",
            "IdentityObject": "obi:IdentityObject",
            "Image": "obi:Image",
            "HostedBadge": "obi:HostedBadge",
            "hosted": "obi:HostedBadge",
            "Issuer": "obi:Issuer",
            "Profile": "obi:Profile",
            "RevocationList": "obi:RevocationList",
            "SignedBadge": "obi:SignedBadge",
            "signed": "obi:SignedBadge",
            "TypeValidation": "obi:TypeValidation",
            "VerificationObject": "obi:VerificationObject",

            "author": { "@id": "schema:author", "@type": "@id" },
            "caption": { "@id": "schema:caption" },
            "claim": { "@id": "cred:claim", "@type": "@id" },
            "created": { "@id": "dc:created", "@type": "xsd:dateTime" },
            "creator": { "@id": "dc:creator", "@type": "@id" },
            "description": { "@id": "schema:description" },
            "email": { "@id": "schema:email" },
            "endorsement": { "@id": "cred:credential", "@type": "@id" },
            "expires": { "@id": "sec:expiration", "@type": "xsd:dateTime" },
            "genre": { "@id": "schema:genre" },
            "image": { "@id": "schema:image", "@type": "@id" },
            "name": { "@id": "schema:name" },
            "owner": { "@id": "sec:owner", "@type": "@id" },
            "publicKey": { "@id": "sec:publicKey", "@type": "@id" },
            "publicKeyPem": { "@id": "sec:publicKeyPem" },
            "related": { "@id": "dc:relation", "@type": "@id" },
            "startsWith": { "@id": "http://purl.org/dqm-vocabulary/v1/dqm#startsWith" },
            "tags": { "@id": "schema:keywords" },
            "targetDescription": { "@id": "schema:targetDescription" },
            "targetFramework": { "@id": "schema:targetFramework" },
            "targetName": { "@id": "schema:targetName" },
            "targetUrl": { "@id": "schema:targetUrl" },
            "telephone": { "@id": "schema:telephone" },
            "url": { "@id": "schema:url", "@type": "@id" },
            "version": { "@id": "schema:version" },

            "alignment": { "@id": "obi:alignment", "@type": "@id" },
            "allowedOrigins": { "@id": "obi:allowedOrigins" },
            "audience": { "@id": "obi:audience" },
            "badge": { "@id": "obi:badge", "@type": "@id" },
            "criteria": { "@id": "obi:criteria", "@type": "@id" },
            "endorsementComment": { "@id": "obi:endorsementComment" },
            "evidence": { "@id": "obi:evidence", "@type": "@id" },
            "hashed": { "@id": "obi:hashed", "@type": "xsd:boolean" },
            "identity": { "@id": "obi:identityHash" },
            "issuedOn": { "@id": "obi:issueDate", "@type": "xsd:dateTime" },
            "issuer": { "@id": "obi:issuer", "@type": "@id" },
            "narrative": { "@id": "obi:narrative" },
            "recipient": { "@id": "obi:recipient", "@type": "@id" },
            "revocationList": { "@id": "obi:revocationList", "@type": "@id" },
            "revocationReason": { "@id": "obi:revocationReason" },
            "revoked": { "@id": "obi:revoked", "@type": "xsd:boolean" },
            "revokedAssertions": { "@id": "obi:revoked" },
            "salt": { "@id": "obi:salt" },
            "targetCode": { "@id": "obi:targetCode" },
            "uid": { "@id": "obi:uid" },
            "validatesType": "obi:validatesType",
            "validationFrame": "obi:validationFrame",
            "validationSchema": "obi:validationSchema",
            "verification": { "@id": "obi:verify", "@type": "@id" },
            "verificationProperty": { "@id": "obi:verificationProperty" },
            "verify": "verification"
        }
    }
};

var documentLoader;
if (typeof XMLHttpRequest !== 'undefined') {
    documentLoader = jsonld.documentLoaders.xhr()
} else {
    documentLoader = jsonld.documentLoaders.node();
}

// change the default document loader
const customLoader = async (url, options) => {
    if (url in CONTEXTS) {
        return {
            contextUrl: null, // this is for a context via a link header
            document: CONTEXTS[url], // this is the actual document that was loaded
            documentUrl: url // this is the actual context URL after redirects
        };
    }
    // call the default documentLoader
    return documentLoader(url);
};
jsonld.documentLoader = customLoader;


module.exports = {
    getVerificationMetadata: async function (quads, options) {
        try {
            var canonical = await utils.canonicalise(quads, customLoader);
            var jsonHashes = await preprocess.divideQuadsIntoHashLists(canonical, options);
            var merkleTrees = await merkle.hashListsToMerkleTrees(jsonHashes, options);
            return merkleTrees;
        } catch (error) {
            throw new Error("Error getting verification metadata: " + error.toString());
        }
    },
    getGranularVerificationMetadata: async function (quads, metadata) {
        try {
            var canonical = await utils.canonicalise(quads, customLoader);
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
    verify: async function (quads, metadata, options) {
        try {
            var canonical = await utils.canonicalise(quads, customLoader);
            var verification = await verify.verify(canonical, metadata, options);
            return verification;
        } catch (error) {
            throw new Error("Error getting performing verification: " + error.toString());
        }

    }
};