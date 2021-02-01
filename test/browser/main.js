"use strict";

//let anchorURL = '';

let options = {
    "quadHash": "KECCAK-256",
    "treeHash": "KECCAK-256",
    "indexHash": "KECCAK-256",
    "lsd": 2,
    "indexType": "object",
    "divisor": "0xa"
};

let config = {
    "blockchain": {
        "web3": {
            "protocol": "ws",
            "domain": "WEB3_NODE_HOSTNAME",
            "port": "",
            "path": "/web3/"
        },
        abi: [
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

document.getElementById('inputOptions').innerHTML = "<pre>" + JSON.stringify(options, null, "  ") + "</pre>";

let quads = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n";
let editedQuads = "<http://bio3rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n";

document.getElementById('inputQuads').innerHTML = "<pre id=\"quads\"></pre>";
document.getElementById('quads').innerText = quads;
document.getElementById('editedQuads').innerHTML = "<pre id=\"wrongQuads\"></pre>";
document.getElementById('wrongQuads').innerText = editedQuads;

document.getElementById('granularMetadataOutput').innerHTML = "<pre id=\"granularMetadata\"></pre>";
document.getElementById('verificationOutput').innerHTML = "<pre id=\"verification\"></pre>";
document.getElementById('granularVerificationOutput').innerHTML = "<pre id=\"granularVerification\"></pre>";
document.getElementById('WrongVerificationOutput').innerHTML = "<pre id=\"WrongVerification\"></pre>";
document.getElementById('WrongGranularVerificationOutput').innerHTML = "<pre id=\"WrongGranularVerification\"></pre>";

let linkchains = window.linkchains();
let metadata = {};
linkchains.getVerificationMetadata(quads, options).then((merkleTrees) => {
    var token = document.getElementById('token').value;

    /* if (token !== '') {
        metadata = fetch(anchorURL,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'bearer ' + token
            },
            body : JSON.stringify(merkleTrees)
        }).then((metadata) => {
            console.log(JSON.stringify(metadata, null, "  ")); */
    var anchor = {
        "type": "ETHMerQL",
        "address": "0x714519C22e2E6278cC1CFba488cC800E9433AdEC",
        "account": "0x1cf67BCCD5377aF1a69BadA19D699BCBa805E3f6",
        "indexhash": "541b9b80c8bd5d222ad97082d47796177e3c938ffb82673865d9d78862543220",
        "settings": {
            "quadHash": "KECCAK-256",
            "treeHash": "KECCAK-256",
            "indexHash": "KECCAK-256",
            "lsd": 2,
            "indexType": "object",
            "divisor": "0xa"
        },
        "transactionhash": "0xa8c35169e77e52744835a42a12d2c605c9f6c7a0a0ed8e146b493686812d2446"
    };
    merkleTrees.merkletrees.anchor = anchor;
    metadata = merkleTrees;
    document.getElementById('metadata').innerHTML = "<pre>" + JSON.stringify(metadata, null, "  ") + "</pre>";
}).then(() => {
    let granular = {};
    linkchains.getGranularVerificationMetadata(quads, metadata, options).then((proofs) => {
        granular = proofs;
        document.getElementById('granularMetadata').innerText =  JSON.stringify(proofs, null, "  ");
    }).then(() => {
        let verificationWhole = {};
        linkchains.verify(quads, metadata, config).then((results) => {
            verificationWhole = results;
            document.getElementById('verification').innerText =  JSON.stringify(verificationWhole, null, "  ");
        });
    })
     .then(() => {
        let verificationPartial = {};
        linkchains.verify(quads, granular, config).then((resultsPartial) => {
            verificationPartial = resultsPartial;
            document.getElementById('granularVerification').innerText =  JSON.stringify(verificationPartial, null, "  ");
        });
    }).then(() => {
        let verificationWholeWrong = {};
        linkchains.verify(editedQuads, metadata, config).then((resultsWrong) => {
            verificationWholeWrong = resultsWrong;
            document.getElementById('WrongVerification').innerText =  JSON.stringify(verificationWholeWrong, null, "  ");
        });
    }).then(() => {
        let verificationPartialWrong = {};
        linkchains.verify(editedQuads, granular, config).then((resultsPartialWrong) => {
            verificationPartialWrong = resultsPartialWrong;
            document.getElementById('WrongGranularVerification').innerText =  JSON.stringify(verificationPartialWrong, null, "  ");
        });
    }) 
    ;
});
//}});



