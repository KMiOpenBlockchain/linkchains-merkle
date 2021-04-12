/* test/sum.js */


const rewire = require('rewire');
const preprocess = rewire('../preprocess.js');
const assert = require('chai').assert;
const fs = require('fs');
const stringify = require('json-stable-stringify');
const utils = require('../utils.js');

describe('generatesIndexes', async function () {

    const options64 = JSON.parse(fs.readFileSync('./test/data/object-KECCAK-256-0x1-64.json'));
    const options2 = JSON.parse(fs.readFileSync('./test/data/object-KECCAK-256-0xA-2.json'));
    const inputQuad = await utils.canonicalise(fs.readFileSync('./test/data/oneQuad-inputQuad.ttl').toString());
    const inputQuads = await utils.canonicalise(fs.readFileSync('./test/data/tenQuads-inputQuads.ttl').toString());
    const inputQuads19 = await utils.canonicalise(fs.readFileSync('./test/data/nineteenQuads-inputQuads.ttl').toString());

    context('one quad', function () {

        it('should equals', async function () {

            const options = options64;

            const json = await preprocess.divideQuadsIntoHashLists(inputQuad,
                options);
            const output = JSON.parse(fs.readFileSync('./test/data/preprocessTest-1-output.json'));

            assert.strictEqual(stringify(json, { space: 4 }), stringify(output, { space: 4 }), "Not equal");
        })
    })

    context('ten quads', function () {

        it('should equals', async function () {

            const options = options64;

            const json = await preprocess.divideQuadsIntoHashLists(inputQuads,
                options);

            const output = JSON.parse(fs.readFileSync('./test/data/preprocessTest-2-output.json'));
            
            assert.strictEqual(stringify(json, { space: 4 }), stringify(output, { space: 4 }), "Not equal");
        })
    })

    context('less digits', function () {

        it('should equals', async function () {

            const options = options2;

            const json = await preprocess.divideQuadsIntoHashLists(inputQuads19,
                options);
            
            const output = JSON.parse(fs.readFileSync('./test/data/preprocessTest-3-output.json'));
            
            assert.strictEqual(stringify(json, { space: 4 }), stringify(output, { space: 4 }), "Not equal");
        })
    })
})