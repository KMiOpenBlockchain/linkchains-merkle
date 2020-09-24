/* test/sum.js */

var rewire = require('rewire');
var preprocess = rewire('../preprocess.js');
var assert = require('chai').assert;

describe('generatesIndexes', function() {

    context('one quad', function() {
        it('should equals', function() {
            var json = preprocess.processAllData("<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n");
            assert.strictEqual(json, "[\n   [\n      \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n      \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\\n\"\n   ]\n]", "Not equal");
        })
    })

})