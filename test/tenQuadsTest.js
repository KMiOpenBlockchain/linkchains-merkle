/* test/sum.js */

var rewire = require('rewire');
var merkle = rewire('../merkle.js');
var assert = require('chai').assert;

describe('generatesIndexes', function() {
    this.timeout(10000);

    context('ten quads', function() {

        it('should equals', function(result) {
            cfg.data = [
                {
                    "datafile": "bio2rdf-affymetrix-20121004.nt",
                    "datafolder": "/quads/",
                    "divisor": "0x1",
                    "indexType": "object",
                    "lsd": 64,
                    "treesandindexes": 78
                }
            ];

            function getResult(resultJson){
                var json = resultJson;
                try{
                assert.strictEqual(json.substring(1,10), "[]", "Not equal");
                    result();
                } catch (error){
                    result(error);
                }
            }

            merkle.processAllDataMain(getResult);
        })
    })
})