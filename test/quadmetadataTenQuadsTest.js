/* test/sum.js */


const rewire = require('rewire');
const quadmetadata = rewire('../quadmetadata.js');
const fs = require('fs');
const assert = require('chai').assert;

const stringify = require('json-stable-stringify');

describe('quadMetadata', function () {
    this.timeout(600000);

    const inputQuads = fs.readFileSync('./test/data/tenQuads-inputQuads.ttl').toString();
    const metadata = JSON.parse(fs.readFileSync('./test/data/tenQuads-anchored.json'));
    const proofsToGenerate = JSON.parse(fs.readFileSync('./test/data/tenQuads-metadataPerQuad.json'));
    
    context('Data of ten Quads', function () {

        it('should equals', async function () {
            const perQuadProofs = await quadmetadata.perQuadProofs(inputQuads, metadata);
            assert.strictEqual(stringify(perQuadProofs, { space: 4 }), stringify(proofsToGenerate, { space: 4 }), "Not equal");
        })
    })
})