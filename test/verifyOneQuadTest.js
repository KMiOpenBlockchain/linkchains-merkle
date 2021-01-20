/* test/sum.js */


var rewire = require('rewire');
var verify = rewire('../verify.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

require('./config.js');

describe('verifyHashes', function () {
    this.timeout(10000);

    context('Data of one Quad - whole', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuad = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"   .\n";

            var metadataWholeThing = {
                anchor: {
                    "type": "ETHMerQL",
                    "address": "0x3e1F79a4F43A06511b2a5A20288c07C363b80AB5",
                    "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                    "transactionhash": "0xb21fe120c7c89040f97e0d8dec27432068c8af2d2d573fb5304e4c90e3cb1f2f"
                },
                indexhash: "8953e3d2b916ea7cba8ece415760d9d99758ebc016daddeb1d9e554871f0d6c1",
                settings: {
                    "divisor": "0x1",
                    "indexType": "object",
                    "lsd": 64,
                    "indexHash": "KECCAK-256",
                    "quadHash": "KECCAK-256",
                    "treeHash": "KECCAK-256"
                }
            }

            var output = {
                "unverified": "",
                "verified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"   .\n"
            };

            const verifiedWhole = await verify.verify(inputQuad, metadataWholeThing, options);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedWhole, { space: 4 }));

        });
    });

    context('Data of one Quad - partial', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuad = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"   .\n";

            var metaDataPerQuad = {
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://www.w3.org/2000/01/rdf-schema#label>": {
                        "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "address": "0x9bCE82a40c0778c99ef7dd475bdc5F5FDD8B626c",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0x50e289e70b99f0fcf75e5af4711c264f4d5395419683142c87c26611c167458d",
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

            var output = {
                "unverified": "",
                "verified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\" .\n"
            };

            const verifiedQuads = await verify.verify(inputQuad, metaDataPerQuad, options);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedQuads, { space: 4 }));
        });
    });

    context('Data of one Quad - whole, wrong', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuad = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\"  .\n";

            var metadataWholeThing = {
                anchor: {
                    "type": "ETHMerQL",
                    "address": "0x3e1F79a4F43A06511b2a5A20288c07C363b80AB5",
                    "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                    "transactionhash": "0xb21fe120c7c89040f97e0d8dec27432068c8af2d2d573fb5304e4c90e3cb1f2f"
                },
                indexhash: "8953e3d2b916ea7cba8ece415760d9d99758ebc016daddeb1d9e554871f0d6c1",
                settings: {
                    "divisor": "0x1",
                    "indexType": "object",
                    "lsd": 64,
                    "indexHash": "KECCAK-256",
                    "quadHash": "KECCAK-256",
                    "treeHash": "KECCAK-256"
                }
            }
            
            var output = {
                "unverified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\"  .\n",
                "verified": ""
            };

            const verifiedWhole = await verify.verify(inputQuad, metadataWholeThing, options);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedWhole, { space: 4 }));

        });
    });

    context('Data of one Quad - partial, wrong', function () {

        it('should equals', async function () {

            var options = {
                blockchain: {
                    web3: cfg.web3Socket,
                    abi: cfg.abi
                }
            };

            var inputQuad = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\"  .\n";

            var metaDataPerQuad = {
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://www.w3.org/2000/01/rdf-schema#label>": {
                        "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>": {
                            "anchor": {
                                "address": "0x9bCE82a40c0778c99ef7dd475bdc5F5FDD8B626c",
                                "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
                                "transactionhash": "0x50e289e70b99f0fcf75e5af4711c264f4d5395419683142c87c26611c167458d",
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

            var output = {
                "unverified": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"My dog has no nose.\" .\n",
                "verified": ""
            };
            
            const verifiedQuads = await verify.verify(inputQuad, metaDataPerQuad, options);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedQuads, { space: 4 }));
        });
    });
});