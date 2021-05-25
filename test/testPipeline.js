const fs = require('fs').promises;
const process = require('process');
const stringify = require('json-stable-stringify');
const preprocess = require('../preprocess.js');
const merkle = require('../merkle.js');
const MerQLAnchor = require('../MerQLAnchor');
const quadmetadata = require('../quadmetadata.js');
const verify = require('../verify.js');
const defaults = require('../defaults.js').defaultOptions;
require('../config.js');


const location = './test/data/';
const inputPrefix = 'test';
const extensions = {
    input: '.ttl',
    modifiedInput: '-modified.ttl',
    preprocess: '-preprocess.json',
    merkle: '-merkle.json',
    anchor: '-anchored.json',
    quadmetadata: '-quadmetadata.json',
    verification: '-verification.json',
    verificationModified: '-verification-modified.json',
    verificationPartial: '-verification-partial.json'
};

async function runPipeline() {
    console.log(process.cwd());
    console.log(location + inputPrefix + extensions.input);
    const quads = await fs.readFile(location + inputPrefix + extensions.input);
    quads = quads.toString();
    console.log('QUADS: ' + (quads.includes('\^\^') ? 'Datatypes' : ''));

    const jsonHashes = await preprocess.divideQuadsIntoHashLists(quads, defaults.DEFAULT_OPTIONS);
    await saveAndPrint(jsonHashes, 'preprocess');

    const merkleTrees = await merkle.hashListsToMerkleTrees(jsonHashes, defaults.DEFAULT_OPTIONS);
    await saveAndPrint(merkleTrees, 'merkle');

    var anchor = {};
    try {
        await fs.access(location + inputPrefix + extensions.anchor, fs.F_OK); 
        anchor = await fs.readFile(location + inputPrefix + extensions.anchor);
        anchor = JSON.parse(anchor.toString());
        console.log('ANCHOR: ' + ( stringify(anchor, { space : 4 }).includes('\^\^') ? 'Datatypes' : ''));
    } catch (error) {
        console.log(error);
        anchor = await MerQLAnchor.anchor(merkleTrees, cfg);
        await saveAndPrint(anchor, 'anchor');
    }

    const perQuadMetadata = await quadmetadata.perQuadProofs(quads, anchor);
    await saveAndPrint(perQuadMetadata, 'quadmetadata');

    const verification = await verify.verify(quads, anchor, config);
    await saveAndPrint(verification, 'verification');

    var modifiedQuads = await fs.readFile(location + inputPrefix + extensions.modifiedInput);
    modifiedQuads = modifiedQuads.toString();
    console.log('MODQUADS: ' + (modifiedQuads.includes('\^\^') ? 'Datatypes' : ''));

    const verificationModified = await verify.verify(modifiedQuads, anchor, config);
    await saveAndPrint(verificationModified, 'verificationModified');

    const partialVerification = await verify.verify(modifiedQuads, perQuadMetadata, config);
    await saveAndPrint(partialVerification, 'verificationPartial');
}

async function saveAndPrint(jsonData, label) {
    const jsonString = stringify(jsonData, { space: 4 });
    //console.log(label.toUpperCase() + ': ' + jsonString);
    await fs.writeFile(location + inputPrefix + extensions[label], jsonString);
}

runPipeline().then(() => {
    console.log('Done!');
});