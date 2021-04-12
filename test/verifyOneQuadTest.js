/* test/sum.js */


const rewire = require('rewire');
const verify = rewire('../verify.js');
const fs = require('fs');
const assert = require('chai').assert;
const utils = require('../utils.js');

const stringify = require('json-stable-stringify');

require('./config.js');

describe('verifyHashes', async function () {
    this.timeout(10000);
    const verifyConfig = JSON.parse(fs.readFileSync('./test/data/verify-config.json'));

    const inputQuad = await utils.canonicalise(fs.readFileSync('./test/data/oneQuad-inputQuad.ttl').toString());
    const inputQuadWrong = fs.readFileSync('./test/data/oneQuad-inputQuadWrong.ttl').toString();

    const metadataWholeThing = JSON.parse(fs.readFileSync('./test/data/oneQuad-anchored.json'));
    const metadataPerQuad = JSON.parse(fs.readFileSync('./test/data/oneQuad-metadataPerQuad.json'));

    context('Data of one Quad - whole', function () {

        it('should equals', async function () {

            const output = JSON.parse(fs.readFileSync('./test/data/verifyOneQuadTest-1-output.json'));

            const verifiedWhole = await verify.verify(inputQuad, metadataWholeThing, verifyConfig);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedWhole, { space: 4 }));

        });
    });

    context('Data of one Quad - partial', function () {

        it('should equals', async function () {

            const output = JSON.parse(fs.readFileSync('./test/data/verifyOneQuadTest-2-output.json'));

            const verifiedQuads = await verify.verify(inputQuad, metadataPerQuad, verifyConfig);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedQuads, { space: 4 }));
        });
    });

    context('Data of one Quad - whole, wrong', function () {

        it('should equals', async function () {

            const output = JSON.parse(fs.readFileSync('./test/data/verifyOneQuadTest-3-output.json'));

            const verifiedWhole = await verify.verify(inputQuadWrong, metadataWholeThing, verifyConfig);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedWhole, { space: 4 }));

        });
    });

    context('Data of one Quad - partial, wrong', function () {

        it('should equals', async function () {

            const output = JSON.parse(fs.readFileSync('./test/data/verifyOneQuadTest-4-output.json'));

            const verifiedQuads = await verify.verify(inputQuadWrong, metadataPerQuad, verifyConfig);
            assert.strictEqual(stringify(output, { space: 4 }), stringify(verifiedQuads, { space: 4 }));
        });
    });
});