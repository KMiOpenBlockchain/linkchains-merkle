const preprocess = require('./preprocess.js');
const merkle = require('./merkle.js');

module.exports = {
    getVerificationMetadata: async function (quads, options) {
        var jsonHashes = await preprocess.divideQuadsIntoHashLists(quads, options);
        console.log(JSON.stringify(jsonHashes));
        console.log(JSON.stringify(merkle));
        var merkleTrees = await merkle.hashListsToMerkleTrees(jsonHashes, options);
        console.log(JSON.stringify(merkleTrees));
        return merkleTrees;
    }
};