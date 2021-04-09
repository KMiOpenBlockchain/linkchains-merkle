/* test/sum.js */


const rewire = require('rewire');
const merkle = rewire('../merkle.js');
const fs = require('fs');
const assert = require('chai').assert;

const stringify = require('json-stable-stringify');

describe('generatesIndexes', function () {
    this.timeout(10000);


    const options = JSON.parse(fs.readFileSync('./test/data/object-KECCAK-256-0x1-64.json'));

    const inputHashes = JSON.parse(fs.readFileSync('./test/data/oneQuadTest-inputHashes.json'));

    const treesToGenerate = JSON.parse(fs.readFileSync('./test/data/oneQuadTest-treesToGenerate.json'));

    context('one quad', function () {

        it('should equals', async function () {
            const merkleTrees = await merkle.hashListsToMerkleTrees(inputHashes, options);
            assert.strictEqual(stringify(merkleTrees, { space: 4 }), stringify(treesToGenerate, { space: 4 }), "Not equal");
        })
    })
})