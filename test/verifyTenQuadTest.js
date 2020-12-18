/* test/sum.js */


var rewire = require('rewire');
var verify = rewire('../verify.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

require('./config.js');
describe('verifyHashes', function () {
    this.timeout(600000);

    context('Data of ten Quads', function () {

        it('should equals', async function () {

            var options = {
                blockchain : {
                    web3 : cfg.web3Socket,
                    abi : [
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "hashIn",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "newIndexType",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lsds",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "div",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "quadHashFunctionIn",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "treeHashFunctionIn",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "indexHashFunctionIn",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "constructor"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "creationTime",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "divisor",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getData",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "theCreationTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "theOwner",
                                    "type": "address"
                                },
                                {
                                    "internalType": "string",
                                    "name": "thetargetHash",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "theIndexType",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "leastSignificants",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "theDivisor",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "theQuadHashFunction",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "theTreeHashFunction",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "theIndexHashFunction",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "indexHashFunction",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "indexType",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "leastSignificantDigits",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "owner",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "quadHashFunction",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "targetHash",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "treeHashFunction",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ]
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
                    "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                    "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                    "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                },
                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                settings : {
                    "divisor": "0xa",
                    "indexHash": "KECCAK-256",
                    "indexType": "object",
                    "lsd": 2,
                    "quadHash": "KECCAK-256",
                    "treeHash": "KECCAK-256"
                }
            };

            var metaDataPerQuad = {
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://purl.org/dc/terms/created>": {
                        "\"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131",
                            "proof": [
                                {
                                    "right": "318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc"
                                },
                                {
                                    "right": "d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2"
                                }
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/creator>": {
                        "<https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/publisher>": {
                        "<http://bio2rdf.org>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    },
                    "<http://purl.org/dc/terms/rights>": {
                        "\"attribution\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        },
                        "\"restricted-by-source-license\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        },
                        "\"use-share-modify\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    },
                    "<http://rdfs.org/ns/void#dataDump>": {
                        "<http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384",
                            "proof": [
                                {
                                    "right": "e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7"
                                }
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        },
                        "<http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    },
                    "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>": {
                        "<http://rdfs.org/ns/void#Dataset>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    },
                    "<http://www.w3.org/2000/01/rdf-schema#label>": {
                        "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "type": "ETHMerQL",
                                "address": "0x216C506c6Cd812D9aD4D526bF2cB0f7d2B7eBF2e",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0xc5ae83a3ace480c40b40ec702c7f9e1eab4f3ee9082ad3569c5924c91b9ec444"
                            },
                            "index": [
                                {
                                    "0": "7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4"
                                },
                                {
                                    "11": "8eb2e641fe2bee999ac2eebce6d53cccb48126d4aaf29f9f3620f3e2dba88131"
                                },
                                {
                                    "14": "c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e"
                                },
                                {
                                    "16": "cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e"
                                },
                                {
                                    "17": "6d1d840e95eac24d854548e3df0b715dd16d5c6171a619d32a6cb2cfd158c384"
                                },
                                {
                                    "19": "c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c"
                                },
                                {
                                    "20": "b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece"
                                },
                                {
                                    "21": "e6fb2b9ad8144b19cf1e770e7ab34edac9a9dc6efee07f07b94fe0892f5d39f3"
                                },
                                {
                                    "22": "22c475f379446b2b6b7f02ca6e7f610594ccabe9b4a8c78c910378db00fcc076"
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
                                    "7": "2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b"
                                },
                                {
                                    "8": "a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44"
                                },
                                {
                                    "9": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                            "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0xA",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "2",
                                "quadHash": "KECCAK-256",
                                "treeHash": "KECCAK-256"
                            }
                        }
                    }
                },
                "@context": {
                    "@vocab": "https://blockchain.open.ac.uk/vocab/"
                }
            };

            
            const verifiedWhole = await verify.verify(inputQuads, metadataWholeThing, options);
            console.log(stringify(verifiedWhole, { space : 4 }));

            const verifiedQuads = await verify.verify(inputQuads, metaDataPerQuad, options);
            console.log(stringify(verifiedQuads, { space : 4 }));
        })
    })
})