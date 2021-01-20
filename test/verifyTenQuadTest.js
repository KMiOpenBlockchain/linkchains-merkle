/* test/sum.js */


var rewire = require('rewire');
var verify = rewire('../verify.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

require('./config.js');
describe('verifyHashes', function () {
    this.timeout(600000);

    context('Data of ten Quads - whole', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuads = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n";

            var metadataWholeThing = {
                anchor: {
                    "type": "ETHMerQL",
                    "address": "0xe635810f2165ddD1794F78E732d1d92AA20735E3",
                    "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                    "transactionhash": "0x12394e7c658c12d65f7fa0bd4cb7d56d7ee8ec734276216afb31fcc609dc082b"
                },
                "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                settings: {
                    "divisor": "0xa",
                    "indexHash": "KECCAK-256",
                    "indexType": "object",
                    "lsd": 2,
                    "quadHash": "KECCAK-256",
                    "treeHash": "KECCAK-256"
                }
            };

            var outputWhole = {
                "unverified": "",
                "verified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n"
            };

            const verifiedWhole = await verify.verify(inputQuads, metadataWholeThing, options);
            assert.strictEqual(stringify(outputWhole, { space : 4 }), stringify(verifiedWhole, { space: 4 }));

        });
    });

    context('Data of ten Quads - partial', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuads = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n";

            var metaDataPerQuad = {
                "@context": {
                    "@vocab": "https://blockchain.open.ac.uk/vocab/"
                },
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://www.w3.org/2000/01/rdf-schema#label>": {
                        "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>": {
                        "<http://rdfs.org/ns/void#Dataset>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/created>": {
                        "\"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/creator>": {
                        "<https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/publisher>": {
                        "<http://bio2rdf.org>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/rights>": {
                        "\"use-share-modify\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        },
                        "\"attribution\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        },
                        "\"restricted-by-source-license\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://rdfs.org/ns/void#dataDump>": {
                        "<http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        },
                        "<http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    }
                }
            };

            var outputPerQuad = {
                "unverified": "",
                "verified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz> .\n"
            };

            const verifiedQuads = await verify.verify(inputQuads, metaDataPerQuad, options);
            assert.strictEqual(stringify(outputPerQuad, { space : 4 }), stringify(verifiedQuads, { space: 4 }));
        });
    });

    context('Data of ten Quads - whole, wrong', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuadsWrong = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n";

            var metadataWholeThing = {
                anchor: {
                    "type": "ETHMerQL",
                    "address": "0xe635810f2165ddD1794F78E732d1d92AA20735E3",
                    "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                    "transactionhash": "0x12394e7c658c12d65f7fa0bd4cb7d56d7ee8ec734276216afb31fcc609dc082b"
                },
                "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                settings: {
                    "divisor": "0xa",
                    "indexHash": "KECCAK-256",
                    "indexType": "object",
                    "lsd": 2,
                    "quadHash": "KECCAK-256",
                    "treeHash": "KECCAK-256"
                }
            };

            var outputWholeWrong = {
                "unverified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n",
                "verified": ""
            };

            const verifiedWholeWrong = await verify.verify(inputQuadsWrong, metadataWholeThing, options);
            assert.strictEqual(stringify(outputWholeWrong, { space : 4 }), stringify(verifiedWholeWrong, { space: 4 }));
        });
    });

    context('Data of ten Quads - partial, wrong', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuadsWrong = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n";

            var metaDataPerQuad = {
                "@context": {
                    "@vocab": "https://blockchain.open.ac.uk/vocab/"
                },
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://www.w3.org/2000/01/rdf-schema#label>": {
                        "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>": {
                        "<http://rdfs.org/ns/void#Dataset>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/created>": {
                        "\"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/creator>": {
                        "<https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/publisher>": {
                        "<http://bio2rdf.org>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/rights>": {
                        "\"use-share-modify\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        },
                        "\"attribution\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        },
                        "\"restricted-by-source-license\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    },
                    "<http://rdfs.org/ns/void#dataDump>": {
                        "<http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        },
                        "<http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x1dE707cee875A43529A81dA44768Fd7D2E6D2337",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xaabcb73fcd1e3688ee6d708fe0ab9bfb57175a1f97cbb47f2cf02c310bdbc7a9"
                            },
                            "indexhash": "f65e97cf0a8076354392ba8aa06d98e71ac8e7f856415542b34a7dc8b2c5a529",
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "17": "097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "24": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433"
                                },
                                {
                                    "3": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781"
                                },
                                {
                                    "6": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "merkleroot": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781",
                            "proof": [],
                            "settings": {
                                "indexHash": "KECCAK-256",
                                "treeHash": "KECCAK-256",
                                "quadHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "divisor": "0xa"
                            }
                        }
                    }
                }
            };

            var outputPerQuadWrong = {
                "unverified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\" .\n",
                "verified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\" .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz> .\n<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz> .\n"
            };

            const verifiedQuadsWrong = await verify.verify(inputQuadsWrong, metaDataPerQuad, options);
            assert.strictEqual(stringify(outputPerQuadWrong, { space : 4 }), stringify(verifiedQuadsWrong, { space: 4 }));
        });
    });
})