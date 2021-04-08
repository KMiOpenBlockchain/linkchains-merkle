const stringify = require('json-stable-stringify');
const SortedMap = require("collections/sorted-map");

const hashingFunctions = require('./hashing');
const defaults = require('./defaults').defaults;
const utils = require('./utils.js');

var hashUtils;

class State {
    indexType;
    lsd;
    divisor;
    divisorInt;
    quadText;

    quadCount;
    quads;
    indices;
    blanks;

    constructor(options) {
        this.indices = new SortedMap();
        this.blanks = [];
        this.readOptions(options);
    }

    readOptions(options) {
        var quadHashFunction = async function (input) {
            return hashingFunctions.getHash(input, {
                "type": options.quadHash ? options.quadHash : defaults.DEFAULT_HASH_ALG
            });
        };
        var treeHashFunction = async function (input) {
            return hashingFunctions.getHash(input, {
                "type": options.treeHash ? options.treeHash : defaults.DEFAULT_HASH_ALG
            });
        };
        var indexHashFunction = async function (input) {
            return hashingFunctions.getHash(input, {
                "type": options.indexHash ? options.indexHash : defaults.DEFAULT_HASH_ALG
            });
        };
        hashUtils = {
            quadHash: quadHashFunction,
            treeHash: treeHashFunction,
            indexHash: indexHashFunction
        };
        this.lsd = options.lsd ? options.lsd : defaults.DEFAULT_LSD;
        this.indexType = options.indexType ? options.indexType : defaults.DEFAULT_INDEXTYPE;
        this.divisor = options.divisor ? options.divisor : defaults.DEFAULT_DIVISOR;
        this.divisorInt = BigInt(this.divisor);
    };

    async addAndParseQuads(data) {
        this.quads = await utils.parseCanonical(data);
        this.quadCount = this.quads.length;
    }

    addToIndices(key, value) {
        if (!this.indices.has(key)) {
            this.indices.set(key, []);
        }
        this.indices.get(key).push(value);
    }

    addToBlanks(blank) {
        if (!this.blanks.includes(blank)) {
            this.blanks.push(blank);
        }
    }
}

async function processQuads(state) {
    for (var currentQuad = 0; currentQuad < state.quads.length; currentQuad++) {
        await processQuad(state, state.quads[currentQuad]);
    }
}

async function processQuad(state, quad) {
    if (quad !== undefined) {
        var quadStringsObj = utils.makeQuadString(quad);

        quadStringsObj.quadHash = await hashUtils.quadHash(quadStringsObj.quadString);

        var index = await makeHashIndex(state, quadStringsObj);
        state.addToIndices(index.toString(), quadStringsObj.quadHash);
        for (var i = 0; i < quadStringsObj.blanks.length; i++) {
            state.addToBlanks(quadStringsObj.blanks[i]);
        }
    }
}

async function makeHashIndex(state, quadStringsObj) {
    if (state.indexType == "uniform") {
        hash = quadStringsObj.quadHash;
    } else if (state.indexType == "subject") {
        hash = await hashUtils.quadHash(quadStringsObj.subjectString);
    } else if (state.indexType == "predicate") {
        hash = await hashUtils.quadHash(quadStringsObj.predicateString);
    } else if (state.indexType == "object") {
        hash = await hashUtils.quadHash(quadStringsObj.objectString);
    } else if (state.indexType == "graph") {
        hash = await hashUtils.quadHash(quadStringsObj.graphString);
    } else if (state.indexType == "subjectobject") {
        hash = await hashUtils.quadHash(quadStringsObj.subjectString +
            " " + quadStringsObj.objectString);
    }
    var lastdigits = hash.substr(hash.length - state.lsd);
    var decimalInt = BigInt("0x" + lastdigits);
    var index = decimalInt / state.divisorInt;
    return index;
}

async function divideQuadsIntoHashLists(quads, options) {
    var state = new State(options);
    await state.addAndParseQuads(quads);

    await processQuads(state);
    return {
        indices: state.indices.toJSON(),
        blanks: state.blanks
    };
}

exports.divideQuadsIntoHashLists = divideQuadsIntoHashLists