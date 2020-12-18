/* test/sum.js */


var rewire = require('rewire');
var verify = rewire('../verify.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

require('./config.js');

describe('verifyHashes', function () {
    this.timeout(10000);

    context('Data of one Quad', function () {

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

            var inputQuad = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n";

            var metadataWholeThing = {
                anchor: {
                    "type": "ETHMerQL",
                    "address": "0x3e1F79a4F43A06511b2a5A20288c07C363b80AB5",
                    "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                    "transactionhash": "0xb21fe120c7c89040f97e0d8dec27432068c8af2d2d573fb5304e4c90e3cb1f2f"
                },
                indexhash : "8953e3d2b916ea7cba8ece415760d9d99758ebc016daddeb1d9e554871f0d6c1",
                settings : {
                    "divisor": "0x1",
                    "indexType": "object",
                    "lsd": 64,
                    "indexHash": "KECCAK-256",
                    "quadHash": "KECCAK-256",
                    "treeHash": "KECCAK-256"
                }
            }

            var metaDataPerQuad = {
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://www.w3.org/2000/01/rdf-schema#label>": {
                        "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "address": "0x9bCE82a40c0778c99ef7dd475bdc5F5FDD8B626c",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash" : "0x50e289e70b99f0fcf75e5af4711c264f4d5395419683142c87c26611c167458d",
                                "type": "ETHMerQL"
                            },
                            "index": [
                                {
                                    "39423203430592103997374671506331876705003930407886206958728470964150059233118": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                }
                            ],
                            "indexhash": "8953e3d2b916ea7cba8ece415760d9d99758ebc016daddeb1d9e554871f0d6c1",
                            "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                            "proof": [
                            ],
                            "settings": {
                                "divisor": "0x1",
                                "indexHash": "KECCAK-256",
                                "indexType": "object",
                                "lsd": "64",
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

            const verifiedWhole = await verify.verify(inputQuad, metadataWholeThing, options);
            console.log(stringify(verifiedWhole, { space : 4 }));

            const verifiedQuads = await verify.verify(inputQuad, metaDataPerQuad, options);
            console.log(stringify(verifiedQuads, { space : 4 }));
/*            assert.strictEqual(stringify(merkleTrees, { space: 4 }), stringify(treesToGenerate, { space: 4 }), "Not equal");

            const quadProofs = await retrieve.getQuadProofs(inputQuad, url, options);
            assert.strictEqual(stringify(quadProofs, { space : 4 }), stringify(proofsToGenerate, { space : 4 }), "Not equal");*/
        })
    })
})