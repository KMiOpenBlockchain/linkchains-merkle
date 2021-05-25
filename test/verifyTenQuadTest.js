/* test/sum.js */


const rewire = require('rewire');
const verify = rewire('../verify.js');
const fs = require('fs');
const assert = require('chai').assert;
const utils = require('../utils.js');

const stringify = require('json-stable-stringify');

require('../config.js');
describe('verifyHashes', async function () {
    this.timeout(600000);

    const verifyConfig = JSON.parse(fs.readFileSync('./test/data/verify-config.json'));

    const inputQuads = await utils.canonicalise(fs.readFileSync('./test/data/tenQuads-inputQuads.ttl').toString());
    const inputQuadsWrong = fs.readFileSync('./test/data/tenQuads-inputQuadsWrong.ttl').toString();

    const metadataWholeThing = JSON.parse(fs.readFileSync('./test/data/tenQuads-anchored.json'));
    const metadataPerQuad = JSON.parse(fs.readFileSync('./test/data/tenQuads-metadataPerQuad.json'));

    context('Data of ten Quads - whole', function () {

        it('should equals', async function () {

            const outputWhole = JSON.parse(fs.readFileSync('./test/data/verifyTenQuadTest-1-output.json'));;

            const verifiedWhole = await verify.verify(inputQuads, metadataWholeThing, verifyConfig);
            assert.strictEqual(stringify(outputWhole, { space : 4 }), stringify(verifiedWhole, { space: 4 }));

        });
    });

    context('Data of ten Quads - partial', function () {

        it('should equals', async function () {

            this.timeout(600000);
            const outputPerQuad = JSON.parse(fs.readFileSync('./test/data/verifyTenQuadTest-2-output.json'));

            const verifiedQuads = await verify.verify(inputQuads, metadataPerQuad, verifyConfig);
            assert.strictEqual(stringify(outputPerQuad, { space : 4 }), stringify(verifiedQuads, { space: 4 }));
        });
    });

    context('Data of ten Quads - whole, wrong', function () {

        it('should equals', async function () {

            const outputWholeWrong = JSON.parse(fs.readFileSync('./test/data/verifyTenQuadTest-3-output.json'));
           
            const verifiedWholeWrong = await verify.verify(inputQuadsWrong, metadataWholeThing, verifyConfig);
            assert.strictEqual(stringify(outputWholeWrong, { space : 4 }), stringify(verifiedWholeWrong, { space: 4 }));
        });
    });

    context('Data of ten Quads - partial, wrong', function () {

        it('should equals', async function () {

            this.timeout(600000);
            const outputPerQuadWrong = JSON.parse(fs.readFileSync('./test/data/verifyTenQuadTest-4-output.json'));
            
            const verifiedQuadsWrong = await verify.verify(inputQuadsWrong, metadataPerQuad, verifyConfig);
            assert.strictEqual(stringify(outputPerQuadWrong, { space : 4 }), stringify(verifiedQuadsWrong, { space: 4 }));
        });
    });
})
