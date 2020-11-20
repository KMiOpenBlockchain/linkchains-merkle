/* test/sum.js */

require("./config.js");
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

            var hashesJson = "[\n" +
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
                "    \"@context\": {\n" +
                "        \"@vocab\": \"https://blockchain.open.ac.uk/vocab_0/\",\n" +
                "        \"index\": \"merkletreeid_0\",\n" +
                "        \"indexToTrees\": \"merkletrees_0\",\n" +
                "        \"leaf\": \"merkleleaf_0\",\n" +
                "        \"leaves\": \"merkleleaves_0\",\n" +
                "        \"root\": \"merklecontainerroot_0\"\n" +
                "    },\n" +
                "    \"indexToTrees\": {\n" +
                "        \"indexhash\": \"QmNtzdnorafCzwdsDWnG2kTPENMagmnzWNCLYH8uTDdMER\",\n" +
                "        \"indexhashalg\": \"IPFSHash\",\n" +
                "        \"trees\": [\n" +
                "            {\n" +
                "                \"containerhash\": \"QmbRGwtEu174fouw7KBvu6V6ZoxawACueVZGrrDEJxJkLh\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"0\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"Qmc2yxYb4JHCcvXqGu6RtsJw2y7trbL4fvcHFbcQdwbrvP\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"11\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\",\n" +
                "                        \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\",\n" +
                "                        \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmNzi1ig7oxukcm3f53nRi6LLDXokPFiuXhbzU4My4i6T4\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"14\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"Qmd1P4bPx9x6bAF5LQVvLZgm3AmYqucV2vCgNvvrVWcMHi\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"16\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmRoyecNZoPwxjr2eV6QDLSkruqmyQ1PSbrXSttdaqi8PM\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"17\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\",\n" +
                "                        \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmeJsNucfKW1Pw2EPKf96cbiE7qTdruUisEqAdUNB4Zzt7\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"19\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmQEVMLUpKvhMCqMfgDG4ZAPmwVk23C3sL6vMuTAnSFWkX\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"20\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmNSofLsywXWh6pr9Z78T2SczEHFsAeLPv2FyRrZoCUgvi\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"21\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\",\n" +
                "                        \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmWLcCnkjYLfrnLGkjE6C3TH96whJwvf4XpWHYoFVxw2dx\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"22\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\",\n" +
                "                        \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmUet49gVz7XtnRHXhudo7MBkTXhb6oQajNPsCe4PTr27H\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"24\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmdVjBnazUdLHVTWtgJDDqixez6QxxD1SdTye1eaKV8PP6\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"3\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmZd5pe7VZ1TJcNbxot8vA6BaYANQekRDmt1SdqmN1h1d8\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"6\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmXNxQSYiQtXLbnsiZ5qpxoeWFYf5NwPD8Ys8JoehkT1Kf\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"7\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmX4e4WNGbKFSmA39gyhVHubzj5kWyGyKJZL6AfgB2XYVp\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"8\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"containerhash\": \"QmYCjiWouUKEY5YcPoXget3s49JyBgJRLwbzeStVejV5qb\",\n" +
                "                \"containerhashalg\": \"IPFSHash\",\n" +
                "                \"index\": \"9\",\n" +
                "                \"leaves\": {\n" +
                "                    \"@list\": [\n" +
                "                        \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                "                    ]\n" +
                "                },\n" +
                "                \"merkleroot\": \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                "            }\n" +
                "        ],\n" +
                "        \"treesettings\": {\n" +
                "            \"divisor\": \"0xA\",\n" +
                "            \"indexHash\": \"IPFSHash\",\n" +
                "            \"indexType\": \"object\",\n" +
                "            \"lsd\": 2,\n" +
                "            \"quadHash\": \"KECCAK-256\",\n" +
                "            \"treeHash\": \"KECCAK-256\"\n" +
                "        }\n" +
                "    }\n" +
                "}";




            const json = await merkle.processAllDataFromJson(JSON.parse(hashesJson), options);
            assert.strictEqual(stringify(json,{ space : 4 }), jsonToGenerate, "Not equal");
        })
    })
})