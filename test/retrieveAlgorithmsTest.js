/* test/sum.js */

require("./config.js");
var rewire = require('rewire');
var retrieve = require('../retrieve.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('retrieveAlgorithms', function() {
    this.timeout(10000);

    context('Has quad using algorithms', function() {

        it('should equals', async function() {
            var options = {
                "divisor": "0x1",
                "indexType": "object",
                "lsd": 64,
                "indexHash" : "IPFSHash",
                "jsonldcontext" : {
                    "@vocab": "https://blockchain.open.ac.uk/vocab_0/",
                    "index": "merkletreeid_0",
                    "indexToTrees": "merkletrees_0",
                    "leaf": "merkleleaf_0",
                    "leaves": "merkleleaves_0",
                    "root": "merklecontainerroot_0"
                }
            };

            var canonicalisedQuads = await retrieve.renderQuadsCanonical("<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n");

            var canonicalisedQuad = canonicalisedQuads[0];

            var json = await retrieve.generateHashesFunction([canonicalisedQuad["quadString"]],
                'https://callustian.solid.open.ac.uk/public/linkchain-merkle/OneQuad.ttl',options);
            var expected = ["bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a"];
            assert.strictEqual(stringify(json, { space : 4 }), stringify(expected, { space: 4 }), "Not equal");

        })
    })

})
