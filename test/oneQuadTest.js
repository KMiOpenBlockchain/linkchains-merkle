/* test/sum.js */

var rewire = require('rewire');
var merkle = rewire('../merkle.js');

var assert = require('chai').assert;

describe('generatesIndexes', function() {
    this.timeout(10000);

    context('one quad', function() {

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

            var hashesJson = "[\n" +
                "   [\n" +
                "      \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
                "      [\n" +
                "         \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                "      ]\n" +
                "   ]\n" +
                "]";

            function getResult(resultJson){
                var json = resultJson;

                var jsonToGenerate = "{\n" +
                    "    \"indexToIndex\": {\n" +
                    "        \"39423203430592103997374671506331876705003930407886206958728470964150059233118\": \"QmdbQCfQuDJPZvhuCWYvXR2KSgMCacTYQ4QDN1H2ZnSckW\"\n" +
                    "    },\n" +
                    "    \"loadedHashes\": [\n" +
                    "        [\n" +
                    "            \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
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

                try {
                    assert.strictEqual(json, jsonToGenerate, "Not equal");
                    result();
                } catch (error){
                    result(error);
                }
            }

            merkle.processAllDataFromJson(hashesJson, getResult);
        })
    })
})