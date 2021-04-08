/* test/sum.js */


var rewire = require('rewire');
var retrieve = rewire('../retrieve.js');

var assert = require('chai').assert;

var stringify = require('json-stable-stringify');

describe('retrieveHashes', function () {
    this.timeout(600000);

    context('Data of ten Quads', function () {

        it('should equals', async function () {

            var options = {
                "divisor": "0x1",
                "indexType": "object",
                "lsd": 64,
                "indexHash": "KECCAK-256"
            };

            var url = 'https://thirda.solid.open.ac.uk/public/MerQL/test.ttl';

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

            var treesToGenerate = [
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "\"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>",
                        "predicateString": "<http://www.w3.org/2000/01/rdf-schema#label>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"^^<http://www.w3.org/2001/XMLSchema#string>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "<http://rdfs.org/ns/void#Dataset>",
                        "predicateString": "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "\"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>",
                        "predicateString": "<http://purl.org/dc/terms/created>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "<https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>",
                        "predicateString": "<http://purl.org/dc/terms/creator>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "<http://bio2rdf.org>",
                        "predicateString": "<http://purl.org/dc/terms/publisher>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "\"use-share-modify\"^^<http://www.w3.org/2001/XMLSchema#string>",
                        "predicateString": "<http://purl.org/dc/terms/rights>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"^^<http://www.w3.org/2001/XMLSchema#string>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "\"attribution\"^^<http://www.w3.org/2001/XMLSchema#string>",
                        "predicateString": "<http://purl.org/dc/terms/rights>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"^^<http://www.w3.org/2001/XMLSchema#string>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "\"restricted-by-source-license\"^^<http://www.w3.org/2001/XMLSchema#string>",
                        "predicateString": "<http://purl.org/dc/terms/rights>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"^^<http://www.w3.org/2001/XMLSchema#string>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "<http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>",
                        "predicateString": "<http://rdfs.org/ns/void#dataDump>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                },
                {
                    "anchor": {
                        "account": "0x00000000000000000000000000000000",
                        "address": "0x00000000000000000000000000000000",
                        "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                        "settings": {
                            "divisor": "0xA",
                            "indexHash": "KECCAK-256",
                            "indexType": "object",
                            "lsd": "2",
                            "quadHash": "KECCAK-256",
                            "treeHash": "KECCAK-256"
                        },
                        "transactionhash": "0x00000000000000000000000000000000",
                        "type": "NoAnchor"
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
                    "quad": {
                        "graphString": "",
                        "objectString": "<http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>",
                        "predicateString": "<http://rdfs.org/ns/void#dataDump>",
                        "quadString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .",
                        "subjectString": "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>"
                    },
                    "settings": {
                        "divisor": "0xA",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": "2",
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                }
            ];

            var proofsToGenerate = {
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004>": {
                    "<http://purl.org/dc/terms/created>": {
                        "\"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>": {
                            "anchor": {
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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
                                "account": "0x00000000000000000000000000000000",
                                "address": "0x00000000000000000000000000000000",
                                "indexhash": "9cdb857481755589d5a954d45b8ab2ae956271748dd9b642e6aed0706d055f13",
                                "settings": {
                                    "divisor": "0xA",
                                    "indexHash": "KECCAK-256",
                                    "indexType": "object",
                                    "lsd": "2",
                                    "quadHash": "KECCAK-256",
                                    "treeHash": "KECCAK-256"
                                },
                                "transactionhash": "0x00000000000000000000000000000000",
                                "type": "ETHMerQL"
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

            const merkleTrees = await retrieve.retrieveJson(inputQuads, url, options);
            //assert.strictEqual(stringify(merkleTrees, { space: 4 }), stringify(treesToGenerate, { space: 4 }), "Not equal");

            const quadProofs = await retrieve.getQuadProofs(inputQuads, url, options);
            //assert.strictEqual(stringify(quadProofs, { space: 4 }), stringify(proofsToGenerate, { space: 4 }), "Not equal");
            console.log(stringify(quadProofs, { space : 4 }));
        })
    })
})