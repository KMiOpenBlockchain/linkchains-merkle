/* test/sum.js */

const rewire = require('rewire');
const merkle = rewire('../merkle.js');
const assert = require('chai').assert;
const fs = require('fs');
const stringify = require('json-stable-stringify');

describe('generatesIndexes', function () {
    this.timeout(10000);

    const options = JSON.parse(fs.readFileSync('./test/data/object-KECCAK-256-0x1-64.json'));

    const inputHashes = JSON.parse(fs.readFileSync('./test/data/tenQuadsTest-inputHashes.json'));

    const treesToGenerate = JSON.parse(fs.readFileSync('./test/data/tenQuadsTest-treesToGenerate.json'));

    context('ten quads', function () {

        it('should equals', async function () {

            const merkleTrees = await merkle.hashListsToMerkleTrees(inputHashes, options);
            assert.strictEqual(stringify(merkleTrees, { space: 4 }), stringify(treesToGenerate, { space: 4 }), "Not equal");
        })
    })
})