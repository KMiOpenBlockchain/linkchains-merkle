/* test/sum.js */
var rewire = require('rewire');
var MerQLAnchor = require('../MerQLAnchor');

var assert = require('chai').assert;
require('./config.js');

describe('Yield Contract', function() {
    this.timeout(30000);

    context('The contract of one quad', function() {

        it('should equals', async function() {

            var options = {
                "divisor": "0x1",
                "indexType": "object",
                "lsd": 64,
                "indexHash" : "KECCAK-256",
                "web3Socket": {
                    "domain": "localhost",
                    "port": "56000"
                }
            };

            var data = {
                "@context": {
                    "@vocab": "https://blockchain.open.ac.uk/vocab/"
                },
                "merkletrees": {
                    "indexhash": "2dba76efdd6cdbd43b079e5d977f7b69e33df85415dceb548b7010272bf19199",
                    "indexhashalg": "KECCAK-256",
                    "trees": {
                        "@list": [
                            {
                                "merkleleaves": {
                                    "leaves": {
                                        "@list": [
                                            "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88"
                                        ]
                                    },
                                    "leafhashalg": "KECCAK-256"
                                },
                                "merkleroot": "b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88",
                                "merkletreeid": "39423203430592103997374671506331876705003930407886206958728470964150059233118",
                                "treehashalg": "KECCAK-256"
                            }
                        ]
                    },
                    "treesettings": {
                        "divisor": "0x1",
                        "indexHash": "KECCAK-256",
                        "indexType": "object",
                        "lsd": 64,
                        "quadHash": "KECCAK-256",
                        "treeHash": "KECCAK-256"
                    }
                }
            };

            const result = await MerQLAnchor.anchor(data, options);
            assert.strictEqual(result.merkletrees.anchor.type, "ETHMerQL", "Not equal");
            assert.notEqual(result.merkletrees.anchor.address, undefined, "Address is undefined");
            assert.strictEqual(result.merkletrees.anchor.account, cfg.user.address, "User address is not set properly");
            assert.notEqual(result.merkletrees.anchor.indexhash, undefined, "Index hash is undefined");
            assert.strictEqual(result.merkletrees.anchor.settings, data.merkletrees.treesettings, "Settings is not set properly.");
            assert.notEqual(result.merkletrees.anchor.transactionhash, undefined, "Transaction hash is undefined");
        })
    })
})
