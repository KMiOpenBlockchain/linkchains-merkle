/* test/sum.js */

var rewire = require('rewire');
var merkle = rewire('../merkle.js');
var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('generatesIndexes', function() {
    this.timeout(10000);

    context('ten quads', function() {

        it('should equals', async function() {

            var options = {
                "divisor": "0x1",
                "indexType": "object",
                "lsd": 64,
                "indexHash" : "KECCAK-256"
            };

            var inputHashes = [
                [
                   "108057060919655353969319073675659250028494167884234799905735708689541595748352",
                   [
                      "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                   ]
                ],
                [
                   "109712345170922327754172802984847226461498626584248267136657291440313367885514",
                   [
                      "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                   ]
                ],
                [
                   "18645362278763824107654219945203274010736256873054573575897348405962450693316",
                   [
                      "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                   ]
                ],
                [
                   "22844391522201213697110390822995328067160804261209017684891435534419587201171",
                   [
                      "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                   ]
                ],
                [
                   "24086058646153361048031232919656368561633895468398362031513307474096020468002",
                   [
                      "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                   ]
                ],
                [
                   "2976001247518796568546856218331785314596629773927085487023240100142798029486",
                   [
                      "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                   ]
                ],
                [
                   "31108858850169876412248516986068047764137734614638451813532257278723912034546",
                   [
                      "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                   ]
                ],
                [
                   "39423203430592103997374671506331876705003930407886206958728470964150059233118",
                   [
                      "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                   ]
                ],
                [
                   "91437996877706251324771292122184075353815270300090615297889472638455983935350",
                   [
                      "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                   ]
                ],
                [
                   "99910448453385242779993927540246453719801988051318748741481413161083892885053",
                   [
                      "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                   ]
                ]
             ];

            var treesToGenerate = {
                "@context": {
                    "@vocab": "https://blockchain.open.ac.uk/vocab/"
                },
                "merkletrees": {
                    "indexhash": "0e5d73eb06fc400086cec38cd7df13227b872f98e10d65ad6c4ce728d28b9732",
                    "indexhashalg": "KECCAK-256",
                    "trees": {
                        "@list": [
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4",
                                "merkletreeid": "108057060919655353969319073675659250028494167884234799905735708689541595748352",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece",
                                "merkletreeid": "109712345170922327754172802984847226461498626584248267136657291440313367885514",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c",
                                "merkletreeid": "18645362278763824107654219945203274010736256873054573575897348405962450693316",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e",
                                "merkletreeid": "22844391522201213697110390822995328067160804261209017684891435534419587201171",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781",
                                "merkletreeid": "24086058646153361048031232919656368561633895468398362031513307474096020468002",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517",
                                "merkletreeid": "2976001247518796568546856218331785314596629773927085487023240100142798029486",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433",
                                "merkletreeid": "31108858850169876412248516986068047764137734614638451813532257278723912034546",
                                "treehashalg": "KECCAK-256"
                            },
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
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18",
                                "merkletreeid": "91437996877706251324771292122184075353815270300090615297889472638455983935350",
                                "treehashalg": "KECCAK-256"
                            },
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94",
                                "merkletreeid": "99910448453385242779993927540246453719801988051318748741481413161083892885053",
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
                        assert.strictEqual(stringify(merkleTrees,{ space : 4 }), stringify(treesToGenerate, { space : 4 }), "Not equal");
        })
    })
})