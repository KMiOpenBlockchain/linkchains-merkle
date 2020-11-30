/* test/sum.js */

var rewire = require('rewire');
var merkle = rewire('../merkle.js');
var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('generatesIndexes', function () {
    this.timeout(40000);

    context('less digits', function () {

        it('should equals', async function () {

            var options = {
                "divisor": "0xA",
                "indexType": "object",
                "lsd": 2,
                "indexHash" : "KECCAK-256"
            };

            var inputHashes = [
                [
                   "0",
                   [
                      "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                   ]
                ],
                [
                   "11",
                   [
                      "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18",
                      "318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc",
                      "d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2"
                   ]
                ],
                [
                   "14",
                   [
                      "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                   ]
                ],
                [
                   "16",
                   [
                      "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                   ]
                ],
                [
                   "17",
                   [
                      "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517",
                      "e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7"
                   ]
                ],
                [
                   "19",
                   [
                      "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                   ]
                ],
                [
                   "20",
                   [
                      "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                   ]
                ],
                [
                   "21",
                   [
                      "b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065",
                      "ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3"
                   ]
                ],
                [
                   "22",
                   [
                      "dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee",
                      "f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2"
                   ]
                ],
                [
                   "24",
                   [
                      "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                   ]
                ],
                [
                   "3",
                   [
                      "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                   ]
                ],
                [
                   "6",
                   [
                      "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                   ]
                ],
                [
                   "7",
                   [
                      "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                   ]
                ],
                [
                   "8",
                   [
                      "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                   ]
                ],
                [
                   "9",
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
                    "indexhash": "31d128e513b67c53c3f193822a97045bedc1142e724620a13223f56e2f9a25ff",
                    "indexhashalg": "KECCAK-256",
                    "trees": {
                        "@list": [
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4",
                                "merkletreeid": "0",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18",
                                        "318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc",
                                        "d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131",
                                "merkletreeid": "11",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e",
                                "merkletreeid": "14",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e",
                                "merkletreeid": "16",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517",
                                        "e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384",
                                "merkletreeid": "17",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c",
                                "merkletreeid": "19",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece",
                                "merkletreeid": "20",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065",
                                        "ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3",
                                "merkletreeid": "21",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee",
                                        "f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076",
                                "merkletreeid": "22",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433",
                                "merkletreeid": "24",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781",
                                "merkletreeid": "3",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94",
                                "merkletreeid": "6",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b",
                                "merkletreeid": "7",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44",
                                "merkletreeid": "8",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "@list": [
                                        "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                    ],
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                                "merkletreeid": "9",
                                "treehashalg": "KECCAK-256"
                            }
                        ]
                    },
                    "treesettings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": 2,
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                }
            };
            
            const merkleTrees = await merkle.hashListsToMerkleTrees(inputHashes, options);
            assert.strictEqual(stringify(merkleTrees,{ space : 4 }), stringify(treesToGenerate, { space : 4 }), "Not equal");
        })
    })
})