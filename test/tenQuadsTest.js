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
                        "    \"@context\": {\n" +
                        "        \"@vocab\": \"https://blockchain.open.ac.uk/vocab_0/\",\n" +
                        "        \"index\": \"merkletreeid_0\",\n" +
                        "        \"indexToTrees\": \"merkletrees_0\",\n" +
                        "        \"leaf\": \"merkleleaf_0\",\n" +
                        "        \"leaves\": \"merkleleaves_0\",\n" +
                        "        \"root\": \"merklecontainerroot_0\"\n" +
                        "    },\n" +
                        "    \"indexToTrees\": {\n" +
                        "        \"indexhash\": \"Qmb2o7AwbAMzDFtkhpPHbpWq57UK57z1uAnxtNZYEjcc6E\",\n" +
                        "        \"indexhashalg\": \"IPFSHash\",\n" +
                        "        \"trees\": [\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmbRGwtEu174fouw7KBvu6V6ZoxawACueVZGrrDEJxJkLh\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"108057060919655353969319073675659250028494167884234799905735708689541595748352\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmQEVMLUpKvhMCqMfgDG4ZAPmwVk23C3sL6vMuTAnSFWkX\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"109712345170922327754172802984847226461498626584248267136657291440313367885514\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmeJsNucfKW1Pw2EPKf96cbiE7qTdruUisEqAdUNB4Zzt7\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"18645362278763824107654219945203274010736256873054573575897348405962450693316\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmNzi1ig7oxukcm3f53nRi6LLDXokPFiuXhbzU4My4i6T4\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"22844391522201213697110390822995328067160804261209017684891435534419587201171\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmdVjBnazUdLHVTWtgJDDqixez6QxxD1SdTye1eaKV8PP6\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"24086058646153361048031232919656368561633895468398362031513307474096020468002\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"Qmb5j6U5NuG5bWjc7QLyk3dhfpHBssJ7abo9vy8GaosWmG\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"2976001247518796568546856218331785314596629773927085487023240100142798029486\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmUet49gVz7XtnRHXhudo7MBkTXhb6oQajNPsCe4PTr27H\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"31108858850169876412248516986068047764137734614638451813532257278723912034546\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\"\n" +
                        "            },\n" +
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
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmT8Cbc5HULoV27omM688BdStjT8czA4hNbRHbdT5c7wst\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"91437996877706251324771292122184075353815270300090615297889472638455983935350\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\"\n" +
                        "            },\n" +
                        "            {\n" +
                        "                \"containerhash\": \"QmZd5pe7VZ1TJcNbxot8vA6BaYANQekRDmt1SdqmN1h1d8\",\n" +
                        "                \"containerhashalg\": \"IPFSHash\",\n" +
                        "                \"index\": \"99910448453385242779993927540246453719801988051318748741481413161083892885053\",\n" +
                        "                \"leaves\": {\n" +
                        "                    \"@list\": [\n" +
                        "                        \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                        "                    ]\n" +
                        "                },\n" +
                        "                \"merkleroot\": \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\"\n" +
                        "            }\n" +
                        "        ],\n" +
                        "        \"treesettings\": {\n" +
                        "            \"divisor\": \"0x1\",\n" +
                        "            \"indexType\": \"object\",\n" +
                        "            \"lsds\": 64\n" +
                        "        }\n" +
                        "    }\n" +
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