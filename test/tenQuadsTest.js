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

            var jsonHashes = "[\n" +
                "   [\n" +
                "      \"108057060919655353969319073675659250028494167884234799905735708689541595748352\",\n" +
                "      [\n" +
                "         \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"109712345170922327754172802984847226461498626584248267136657291440313367885514\",\n" +
                "      [\n" +
                "         \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"18645362278763824107654219945203274010736256873054573575897348405962450693316\",\n" +
                "      [\n" +
                "         \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"22844391522201213697110390822995328067160804261209017684891435534419587201171\",\n" +
                "      [\n" +
                "         \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"24086058646153361048031232919656368561633895468398362031513307474096020468002\",\n" +
                "      [\n" +
                "         \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"2976001247518796568546856218331785314596629773927085487023240100142798029486\",\n" +
                "      [\n" +
                "         \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"31108858850169876412248516986068047764137734614638451813532257278723912034546\",\n" +
                "      [\n" +
                "         \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
                "      [\n" +
                "         \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"91437996877706251324771292122184075353815270300090615297889472638455983935350\",\n" +
                "      [\n" +
                "         \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"99910448453385242779993927540246453719801988051318748741481413161083892885053\",\n" +
                "      [\n" +
                "         \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                "      ]\n" +
                "   ]\n" +
                "]";

            function getResult(resultJson){
                var json = resultJson;
                try{
                    var jsonToGenerate = "{\n" +
                        "    \"indexToIndex\": {\n" +
                        "        \"108057060919655353969319073675659250028494167884234799905735708689541595748352\": \"QmcZVvNos4njpewbAVCa3jaoYjVJzBTbmC1vfYDnRc8Lm4\",\n" +
                        "        \"109712345170922327754172802984847226461498626584248267136657291440313367885514\": \"QmRSpzt534E5GeFmr1P8Fx7ZxP3JzBZuCMC7SBnaBKuoo1\",\n" +
                        "        \"18645362278763824107654219945203274010736256873054573575897348405962450693316\": \"QmNN4H3c4axiWjHWBGFA4hXsjDdrpkcBniJu7rwUCy97T2\",\n" +
                        "        \"22844391522201213697110390822995328067160804261209017684891435534419587201171\": \"QmVbo6ny9Fu7tiyVkF9T5ZFNBF9ZUyGNXN8N1kwyFY3jV2\",\n" +
                        "        \"24086058646153361048031232919656368561633895468398362031513307474096020468002\": \"QmY6sgnxCv6qk6pAtcv49u5VRA3usdYi1gaR7qqrSyUm1d\",\n" +
                        "        \"2976001247518796568546856218331785314596629773927085487023240100142798029486\": \"QmVeMWntsiBhjuQ9DRupWvZWNXWv1wiqfMBh5oJn3aapL2\",\n" +
                        "        \"31108858850169876412248516986068047764137734614638451813532257278723912034546\": \"QmX94KuDqf8hYaniokNZopDf8V9A8e4ViUrRxGLwTJ9vst\",\n" +
                        "        \"39423203430592103997374671506331876705003930407886206958728470964150059233118\": \"QmdbQCfQuDJPZvhuCWYvXR2KSgMCacTYQ4QDN1H2ZnSckW\",\n" +
                        "        \"91437996877706251324771292122184075353815270300090615297889472638455983935350\": \"Qmf5MQnz8zQrtX5rMUmva76xhZPtDQx52X8NSHgv1bmpPx\",\n" +
                        "        \"99910448453385242779993927540246453719801988051318748741481413161083892885053\": \"Qmczz4MSQP4gCGTXUjHJ7B4auJ8HJ1GmJeHaaj4cQqdzBM\"\n" +
                        "    },\n" +
                        "    \"loadedHashes\": [\n" +
                        "        [\n" +
                        "            \"108057060919655353969319073675659250028494167884234799905735708689541595748352\",\n" +
                        "            [\n" +
                        "                \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"109712345170922327754172802984847226461498626584248267136657291440313367885514\",\n" +
                        "            [\n" +
                        "                \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"18645362278763824107654219945203274010736256873054573575897348405962450693316\",\n" +
                        "            [\n" +
                        "                \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"22844391522201213697110390822995328067160804261209017684891435534419587201171\",\n" +
                        "            [\n" +
                        "                \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"24086058646153361048031232919656368561633895468398362031513307474096020468002\",\n" +
                        "            [\n" +
                        "                \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"2976001247518796568546856218331785314596629773927085487023240100142798029486\",\n" +
                        "            [\n" +
                        "                \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"31108858850169876412248516986068047764137734614638451813532257278723912034546\",\n" +
                        "            [\n" +
                        "                \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
                        "            [\n" +
                        "                \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"91437996877706251324771292122184075353815270300090615297889472638455983935350\",\n" +
                        "            [\n" +
                        "                \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                        "            ]\n" +
                        "        ],\n" +
                        "        [\n" +
                        "            \"99910448453385242779993927540246453719801988051318748741481413161083892885053\",\n" +
                        "            [\n" +
                        "                \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                        "            ]\n" +
                        "        ]\n" +
                        "    ],\n" +
                        "    \"treeInfoArray\": [\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmbRGwtEu174fouw7KBvu6V6ZoxawACueVZGrrDEJxJkLh\",\n" +
                        "                    \"merkleroot\": \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmQEVMLUpKvhMCqMfgDG4ZAPmwVk23C3sL6vMuTAnSFWkX\",\n" +
                        "                    \"merkleroot\": \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmeJsNucfKW1Pw2EPKf96cbiE7qTdruUisEqAdUNB4Zzt7\",\n" +
                        "                    \"merkleroot\": \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmNzi1ig7oxukcm3f53nRi6LLDXokPFiuXhbzU4My4i6T4\",\n" +
                        "                    \"merkleroot\": \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmdVjBnazUdLHVTWtgJDDqixez6QxxD1SdTye1eaKV8PP6\",\n" +
                        "                    \"merkleroot\": \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"Qmb5j6U5NuG5bWjc7QLyk3dhfpHBssJ7abo9vy8GaosWmG\",\n" +
                        "                    \"merkleroot\": \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmUet49gVz7XtnRHXhudo7MBkTXhb6oQajNPsCe4PTr27H\",\n" +
                        "                    \"merkleroot\": \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmYCjiWouUKEY5YcPoXget3s49JyBgJRLwbzeStVejV5qb\",\n" +
                        "                    \"merkleroot\": \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmT8Cbc5HULoV27omM688BdStjT8czA4hNbRHbdT5c7wst\",\n" +
                        "                    \"merkleroot\": \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"generatedInfo\": [\n" +
                        "                {\n" +
                        "                    \"data\": {\n" +
                        "                        \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\": 0\n" +
                        "                    },\n" +
                        "                    \"merkleipfs\": \"QmZd5pe7VZ1TJcNbxot8vA6BaYANQekRDmt1SdqmN1h1d8\",\n" +
                        "                    \"merkleroot\": \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                        "                }\n" +
                        "            ],\n" +
                        "            \"tree\": {\n" +
                        "                \"isReady\": true,\n" +
                        "                \"leaves\": [\n" +
                        "                    \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                        "                ],\n" +
                        "                \"levels\": [\n" +
                        "                    [\n" +
                        "                        \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                        "                    ]\n" +
                        "                ]\n" +
                        "            }\n" +
                        "        }\n" +
                        "    ]\n" +
                        "}";
                    assert.strictEqual(json, jsonToGenerate, "Not equal");
                    result();
                } catch (error){
                    result(error);
                }
            }

            merkle.processAllDataFromJson(jsonHashes, getResult);
        })
    })
})