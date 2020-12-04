/* test/sum.js */


var rewire = require('rewire');
var retrieve = rewire('../retrieve.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('retrieveHashes', function() {
    this.timeout(10000);

    context('Data of one Quad', function() {

        it('should equals', async function() {

            var options = {
                "divisor": "0x1",
                "indexType": "object",
                "lsd": 64,
                "indexHash" : "KECCAK-256"
            };

            var url ='https://thirda.solid.open.ac.uk/public/MerQL/test.ttl';

            var inputQuad = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n";

            var treesToGenerate = [];

            const merkleTrees = await retrieve.retrieveJson(inputQuad, url, options);
            assert.strictEqual(stringify(merkleTrees, { space : 4 }), stringify(treesToGenerate, { space : 4 }), "Not equal");
        })
    })
})