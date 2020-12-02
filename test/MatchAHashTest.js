/* test/sum.js */

require("./config.js");
var rewire = require('rewire');
var retrieve = require('../retrieve.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('Match Hash', function() {
    this.timeout(10000);

    context('Matches a hash', function() {

        it('should equals', async function() {
            var hash = '3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781';

            var json = await retrieve.matchHashes([hash],
                'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl');

            var expected = [{
                    "index": [{
                        "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                    }, {
                        "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                    }, {
                        "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                    }, {
                        "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                    }, {
                        "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                    }, {
                        "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                    }, {
                        "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                    }, {
                        "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                    }, {
                        "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
                    }, {
                        "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                    }, {
                        "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                    }, {
                        "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                    }, {
                        "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                    }, {
                        "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                    }, {
                        "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                    }],
                    "indexHash": "63089e25c1e053619856c641b29925542121487c839688523f25ec6bc0b50d34",
                    "settings": {
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    },
                    "tree": {
                        "merkleleaves": {
                            "leafhashalg": "KECCAK-256",
                            "leaves": {
                                "@list": ["3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"]
                            }
                        },
                        "merkleroot": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781",
                        "merkletreeid": "3",
                        "treehashalg": "KECCAK-256"
                    }
                }] ;

            assert.strictEqual(stringify(json, { space : 4 }), stringify(expected, { space: 4 }), "Not equal");

        })
    })

    context('Does not matches a hash', function() {

        it('should equals', async function() {

            var hash = '0';

            var json = await retrieve.matchHashes([hash],
                'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl');

            var expected= [] ;

            assert.strictEqual(stringify(json, { space : 4 }), stringify(expected, { space: 4 }), "Not equal");

        })
    })

    context('Returns leaf array', function() {

        it('should equals', async function() {

            var hash = '3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781';

            var metadataArray = await retrieve.matchHashes([hash],
                'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl');

            var json = await retrieve.getLeaves(metadataArray[0],
                'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl');

            var expected= ['3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781'];

            assert.strictEqual(stringify(json, { space : 4 }), stringify(expected, { space: 4 }), "Not equal");
        })
    })

    context('Returns proof', function() {

        it('should equals', async function() {
            var hash = '3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781';

            var metadataArray = await retrieve.matchHashes([hash],
                'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl');

            var leafArray = await retrieve.getLeaves(metadataArray[0],
                'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl');

            var json = await retrieve.getProof(leafArray[0], leafArray, "KECCAK-256");

            var expected= ['3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781'];

            assert.strictEqual(stringify(json, { space : 4 }), stringify(expected, { space: 4 }), "Not equal");
        })
    })

})
