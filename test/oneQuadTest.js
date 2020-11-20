/* test/sum.js */

require("./config.js");
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
                "      \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
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
                    "        \"indexhash\": \"QmSUpikCncebHi2iqfPzufrGibKoyS7Pqwx6bZ8zdFU8E7\",\n" +
                    "        \"indexhashalg\": \"IPFSHash\",\n" +
                    "        \"trees\": [\n" +
                    "            {\n" +
                    "                \"containerhash\": \"QmYCjiWouUKEY5YcPoXget3s49JyBgJRLwbzeStVejV5qb\",\n" +
                    "                \"containerhashalg\": \"IPFSHash\",\n" +
                    "                \"index\": \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
                    "                \"leaves\": {\n" +
                    "                    \"@list\": [\n" +
                    "                        \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                    "                    ]\n" +
                    "                },\n" +
                    "                \"merkleroot\": \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\"\n" +
                    "            }\n" +
                    "        ],\n" +
                    "        \"treesettings\": {\n" +
                    "            \"divisor\": \"0x1\",\n" +
                    "            \"indexHash\": \"IPFSHash\",\n" +
                    "            \"indexType\": \"object\",\n" +
                    "            \"lsd\": 64,\n" +
                    "            \"quadHash\": \"KECCAK-256\",\n" +
                    "            \"treeHash\": \"KECCAK-256\"\n" +
                    "        }\n" +
                    "    }\n" +
                    "}";

            const json = await merkle.processAllDataFromJson(JSON.parse(hashesJson), options);
            assert.strictEqual(stringify(json, { space : 4 }), jsonToGenerate, "Not equal");
        })
    })
})