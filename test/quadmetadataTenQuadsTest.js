/* test/sum.js */


const rewire = require('rewire');
const quadmetadata = rewire('../quadmetadata.js');
const fs = require('fs');
const assert = require('chai').assert;
const utils = require('../utils.js');

const stringify = require('json-stable-stringify');

describe('quadMetadata', async function () {
    this.timeout(600000);

    const inputQuads = await utils.canonicalise(fs.readFileSync('./test/data/tenQuads-inputQuads.ttl').toString());
    const metadata = JSON.parse(fs.readFileSync('./test/data/tenQuads-anchored.json'));
    const proofsToGenerate = JSON.parse(fs.readFileSync('./test/data/tenQuads-metadataPerQuad.json'));
    
    context('Data of ten Quads', function () {

        it('should equals', async function () {
            const perQuadProofs = await quadmetadata.perQuadProofs(inputQuads, metadata);
            assert.strictEqual(stringify(perQuadProofs, { space: 4 }), stringify(proofsToGenerate, { space: 4 }), "Not equal");
        })
    })
})