/* test/sum.js */


const rewire = require('rewire');
const quadmetadata = rewire('../quadmetadata.js');
const fs = require('fs');
const assert = require('chai').assert;
const utils = require('../utils.js');

const stringify = require('json-stable-stringify');

describe('quadMetadata', async function () {
    this.timeout(10000);

    const inputQuad = await utils.canonicalise(fs.readFileSync('./test/data/oneQuad-inputQuad.ttl').toString());
    const metadata = JSON.parse(fs.readFileSync('./test/data/oneQuad-anchored.json'));
    const proofsToGenerate = JSON.parse(fs.readFileSync('./test/data/oneQuad-metadataPerQuad.json'));
    
    context('Data of one Quad', function () {

        it('should equals', async function () {

            const perQuadProofs = await quadmetadata.perQuadProofs(inputQuad, metadata);
            assert.strictEqual(stringify(perQuadProofs, { space: 4 }), stringify(proofsToGenerate, { space: 4 }), "Not equal"); 
        })
    })
})