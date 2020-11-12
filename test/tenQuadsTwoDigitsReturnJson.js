/* test/sum.js */

var rewire = require('rewire');
var merkle = rewire('../merkle.js');
var assert = require('chai').assert;

describe('generatesIndexes', function() {
    this.timeout(10000);

    context('ten quads', function() {

        it('should equals', function() {
            cfg.data = [
                {
                    "datafile": "bio2rdf-affymetrix-20121004.nt",
                    "datafolder": "/quads/",
                    "divisor": "0xa",
                    "indexType": "object",
                    "lsd": 2,
                    "treesandindexes": 78
                }
            ];
            cfg.jsonldcontext = {
                "@vocab": "https://blockchain.open.ac.uk/vocab_0/",
                "index": "merkletreeid_0",
                "indexToTrees": "merkletrees_0",
                "leaf": "merkleleaf_0",
                "leaves": "merkleleaves_0",
                "root": "merklecontainerroot_0"
            };


            var jsonHashes = "[\n" +
                "   [\n" +
                "      \"0\",\n" +
                "      [\n" +
                "         \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"11\",\n" +
                "      [\n" +
                "         \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\",\n" +
                "         \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\",\n" +
                "         \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"14\",\n" +
                "      [\n" +
                "         \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"16\",\n" +
                "      [\n" +
                "         \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"17\",\n" +
                "      [\n" +
                "         \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\",\n" +
                "         \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"19\",\n" +
                "      [\n" +
                "         \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"20\",\n" +
                "      [\n" +
                "         \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"21\",\n" +
                "      [\n" +
                "         \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\",\n" +
                "         \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"22\",\n" +
                "      [\n" +
                "         \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\",\n" +
                "         \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"24\",\n" +
                "      [\n" +
                "         \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"3\",\n" +
                "      [\n" +
                "         \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"6\",\n" +
                "      [\n" +
                "         \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"7\",\n" +
                "      [\n" +
                "         \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"8\",\n" +
                "      [\n" +
                "         \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"9\",\n" +
                "      [\n" +
                "         \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                "      ]\n" +
                "   ]\n" +
                "]";

            var jsonToGenerate = "{\n" +
                "    \"indexToIndex\": {\n" +
                "        \"0\": \"QmcZVvNos4njpewbAVCa3jaoYjVJzBTbmC1vfYDnRc8Lm4\",\n" +
                "        \"11\": \"QmPhjBPJ4M1anQm3EVt3RQ2kDq3txeZij8fHTnYEuAtpF7\",\n" +
                "        \"14\": \"QmVbo6ny9Fu7tiyVkF9T5ZFNBF9ZUyGNXN8N1kwyFY3jV2\",\n" +
                "        \"16\": \"QmXfjuoJc7UJDHHRo63UjyQEanMip1iHy8LbNpw2Y7QHUL\",\n" +
                "        \"17\": \"QmT17iCD76QSpR2aq7L7qJ5s8aHnXxiqdwT91k6tGwP4xG\",\n" +
                "        \"19\": \"QmNN4H3c4axiWjHWBGFA4hXsjDdrpkcBniJu7rwUCy97T2\",\n" +
                "        \"20\": \"QmRSpzt534E5GeFmr1P8Fx7ZxP3JzBZuCMC7SBnaBKuoo1\",\n" +
                "        \"21\": \"QmQzE13qTwX2ReUzQJNgD56gMXberi7PWWXuFPgv3VWpbY\",\n" +
                "        \"22\": \"QmQmBVR2reafhGqcEFhfonPiBD8sr6ZxcNm5BLsGuxck5Q\",\n" +
                "        \"24\": \"QmX94KuDqf8hYaniokNZopDf8V9A8e4ViUrRxGLwTJ9vst\",\n" +
                "        \"3\": \"QmY6sgnxCv6qk6pAtcv49u5VRA3usdYi1gaR7qqrSyUm1d\",\n" +
                "        \"6\": \"Qmczz4MSQP4gCGTXUjHJ7B4auJ8HJ1GmJeHaaj4cQqdzBM\",\n" +
                "        \"7\": \"Qmaf9zbd2ZudWYUPnswL7BQgqzxS39a6fHTMQ3Xi8XXn6h\",\n" +
                "        \"8\": \"QmPzTMYH3WgvTK7cafszSS7R1oCjRgYZPUPXHrdo3MrLza\",\n" +
                "        \"9\": \"QmdbQCfQuDJPZvhuCWYvXR2KSgMCacTYQ4QDN1H2ZnSckW\"\n" +
                "    },\n" +
                "    \"loadedHashes\": [\n" +
                "        [\n" +
                "            \"0\",\n" +
                "            [\n" +
                "                \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"11\",\n" +
                "            [\n" +
                "                \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\",\n" +
                "                \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\",\n" +
                "                \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"14\",\n" +
                "            [\n" +
                "                \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"16\",\n" +
                "            [\n" +
                "                \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"17\",\n" +
                "            [\n" +
                "                \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\",\n" +
                "                \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"19\",\n" +
                "            [\n" +
                "                \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"20\",\n" +
                "            [\n" +
                "                \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"21\",\n" +
                "            [\n" +
                "                \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\",\n" +
                "                \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"22\",\n" +
                "            [\n" +
                "                \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\",\n" +
                "                \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"24\",\n" +
                "            [\n" +
                "                \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"3\",\n" +
                "            [\n" +
                "                \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"6\",\n" +
                "            [\n" +
                "                \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"7\",\n" +
                "            [\n" +
                "                \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"8\",\n" +
                "            [\n" +
                "                \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
                "            ]\n" +
                "        ],\n" +
                "        [\n" +
                "            \"9\",\n" +
                "            [\n" +
                "                \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
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
                "                        \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\": 1,\n" +
                "                        \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\": 0,\n" +
                "                        \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\": 2\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"Qmc2yxYb4JHCcvXqGu6RtsJw2y7trbL4fvcHFbcQdwbrvP\",\n" +
                "                    \"merkleroot\": \"8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\",\n" +
                "                    \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\",\n" +
                "                    \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131\"\n" +
                "                    ],\n" +
                "                    [\n" +
                "                        \"3a119749e58206046367752c6eb139673730dfb1314866906bd6b1d88905dbed\",\n" +
                "                        \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\"\n" +
                "                    ],\n" +
                "                    [\n" +
                "                        \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\",\n" +
                "                        \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\",\n" +
                "                        \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\"\n" +
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
                "                        \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\": 0\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"Qmd1P4bPx9x6bAF5LQVvLZgm3AmYqucV2vCgNvvrVWcMHi\",\n" +
                "                    \"merkleroot\": \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "                    ]\n" +
                "                ]\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"generatedInfo\": [\n" +
                "                {\n" +
                "                    \"data\": {\n" +
                "                        \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\": 0,\n" +
                "                        \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\": 1\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"QmRoyecNZoPwxjr2eV6QDLSkruqmyQ1PSbrXSttdaqi8PM\",\n" +
                "                    \"merkleroot\": \"6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\",\n" +
                "                    \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384\"\n" +
                "                    ],\n" +
                "                    [\n" +
                "                        \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\",\n" +
                "                        \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\"\n" +
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
                "                        \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\": 0,\n" +
                "                        \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\": 1\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"QmNSofLsywXWh6pr9Z78T2SczEHFsAeLPv2FyRrZoCUgvi\",\n" +
                "                    \"merkleroot\": \"e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\",\n" +
                "                    \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3\"\n" +
                "                    ],\n" +
                "                    [\n" +
                "                        \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\",\n" +
                "                        \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\"\n" +
                "                    ]\n" +
                "                ]\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"generatedInfo\": [\n" +
                "                {\n" +
                "                    \"data\": {\n" +
                "                        \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\": 0,\n" +
                "                        \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\": 1\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"QmWLcCnkjYLfrnLGkjE6C3TH96whJwvf4XpWHYoFVxw2dx\",\n" +
                "                    \"merkleroot\": \"22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\",\n" +
                "                    \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076\"\n" +
                "                    ],\n" +
                "                    [\n" +
                "                        \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\",\n" +
                "                        \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\"\n" +
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
                "        },\n" +
                "        {\n" +
                "            \"generatedInfo\": [\n" +
                "                {\n" +
                "                    \"data\": {\n" +
                "                        \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\": 0\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"QmXNxQSYiQtXLbnsiZ5qpxoeWFYf5NwPD8Ys8JoehkT1Kf\",\n" +
                "                    \"merkleroot\": \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "                    ]\n" +
                "                ]\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"generatedInfo\": [\n" +
                "                {\n" +
                "                    \"data\": {\n" +
                "                        \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\": 0\n" +
                "                    },\n" +
                "                    \"merkleipfs\": \"QmX4e4WNGbKFSmA39gyhVHubzj5kWyGyKJZL6AfgB2XYVp\",\n" +
                "                    \"merkleroot\": \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
                "                }\n" +
                "            ],\n" +
                "            \"tree\": {\n" +
                "                \"isReady\": true,\n" +
                "                \"leaves\": [\n" +
                "                    \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
                "                ],\n" +
                "                \"levels\": [\n" +
                "                    [\n" +
                "                        \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
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
                "        }\n" +
                "    ]\n" +
                "}";

            var json = merkle.processAllDataReturnJson(jsonHashes);

            assert.strictEqual(json, jsonToGenerate, "Not equal");
        })
    })
})