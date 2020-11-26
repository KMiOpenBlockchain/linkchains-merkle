/* test/sum.js */


var rewire = require('rewire');
var merkle = rewire('../merkle.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('generatesIndexes', function() {
    this.timeout(10000);

    context('one quad', function() {

        it('should equals', async function() {

            var options = {
                "divisor": "0x1",
                "indexType": "object",
                "lsd": 64,
                "indexHash" : "KECCAK-256"
            };
            
            var inputHashes = [
                [
                   "39423203430592103997374671506331876705003930407886206958728470964150059233118",
                   [
                      "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                   ]
                ]
             ];

                var treesToGenerate = {
                    "@context": {
                        "@vocab": "https://blockchain.open.ac.uk/vocab/"
                    },
                    "merkletrees": {
                        "indexhash": "2dba76efdd6cdbd43b079e5d977f7b69e33df85415dceb548b7010272bf19199",
                        "indexhashalg": "KECCAK-256",
                        "trees": {
                            "@list": [
                                {
                                    "merkleleaves": {
                                        "leaves": {
                                            "@list": [
                                                "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                            ]
                                        },
                                        "leafhashalg": "KECCAK-256"
                                    },
                                    "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                                    "merkletreeid": "39423203430592103997374671506331876705003930407886206958728470964150059233118",
                                    "treehashalg": "KECCAK-256"
                                }
                            ]
                        },
                        "treesettings": {
                            "divisor": "0x1",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": 64,
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        }
                    }
                };

            const merkleTrees = await merkle.hashListsToMerkleTrees(inputHashes, options);
            assert.strictEqual(stringify(merkleTrees, { space : 4 }), stringify(treesToGenerate, { space : 4 }), "Not equal");
        })
    })
})