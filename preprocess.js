const N3 = require('n3');
const parser = new N3.Parser();
var stringify = require('json-stable-stringify');
var SortedMap = require("collections/sorted-map");

const hashingFunctions = require('./hashing');

var utils;

class State {
    indexType;
    lsd;
    divisor;
    divisorInt;
    quadText;

    quadCount;
    quads;
	indices;
	
    constructor(options) {
        this.indices = new SortedMap();
        this.readOptions(options);
    }

    readOptions(options) {
		var defaultHash = 'KECCAK-256';
		var quadHashFunction = async function(input) {
			return hashingFunctions.getHash(input, {
				"type": options.quadHash ? options.quadHash : defaultHash
			});
		};
		var treeHashFunction = async function(input) {
			return hashingFunctions.getHash(input, {
				"type": options.treeHash ? options.treeHash : defaultHash
			});
		};
		var indexHashFunction = async function(input) {
			return hashingFunctions.getHash(input, {
				"type": options.indexHash ? options.indexHash : defaultHash
			});
		};
		utils = {
			quadHash: quadHashFunction,
			treeHash: treeHashFunction,
			indexHash: indexHashFunction
		};
        this.lsd = options.lsd ? options.lsd : 64;
        this.indexType = options.indexType ? options.indexType : 'subject';
        this.divisor = options.divisor ? options.divisor : 0x1;
        this.divisorInt = BigInt(this.divisor);
    };

    addAndParseQuads(data) {
        this.quads = parser.parse(data);
        this.quadCount = this.quads.length;
    }

    addToIndices(key, value) {
        if (!this.indices.has(key)) {
            this.indices.set(key, []);
        }
        this.indices.get(key).push(value);
    }
}


function makeQuadTerm(value) {
    return '<' + value + '>';
}

function makeQuadValue(value) {
    return '"' + value + '"';
}

function makeQuadString(quad) {
    var subjectTerm = makeQuadTerm(quad.subject.value);
    var predicate = makeQuadTerm(quad.predicate.value);
    var objectTerm;
    if (quad.object.termType != "Literal") {
        objectTerm = makeQuadTerm(quad.object.value);
    } else {
        objectTerm = makeQuadValue(quad.object.value);
        if (quad.object.language) {
            objectTerm += '@' + quad.object.language;
        }
        if (quad.object.datatype) {
            objectTerm += '^^' + makeQuadTerm(quad.object.datatype.value);
        }
    }
    var graph = (quad.graph.value ? makeQuadTerm(quad.graph.value) : '');

    var quadString = subjectTerm + ' ' + predicate + ' ' + objectTerm + ' ' + graph + ' .';
    return {
        'subjectString': subjectTerm,
        'predicateString': predicate,
        'objectString': objectTerm,
        'graphString': graph,
        'quadString': quadString
    };
}

async function processQuads(state) {
    for (var currentQuad = 0; currentQuad < state.quads.length; currentQuad++) {
        await processQuad(state, state.quads[currentQuad]);
    }
}

async function processQuad(state, quad) {
    if (quad !== undefined) {
        var quadStringsObj = makeQuadString(quad);

        quadStringsObj.quadHash = await utils.quadHash(quadStringsObj.quadString);

        var index = await makeHashIndex(state, quadStringsObj);
        state.addToIndices(index.toString(), quadStringsObj.quadHash);
    }
}

async function makeHashIndex(state, quadStringsObj) {
    if (state.indexType == "uniform") {
        hash = quadStringsObj.quadHash;
    } else if (state.indexType == "subject") {
        hash = await utils.quadHash(quadStringsObj.subjectString);
    } else if (state.indexType == "predicate") {
        hash = await utils.quadHash(quadStringsObj.predicateString);
    } else if (state.indexType == "object") {
        hash = await utils.quadHash(quadStringsObj.objectString);
    } else if (state.indexType == "graph") {
        hash = await utils.quadHash(quadStringsObj.graphString);
    } else if (state.indexType == "subjectobject") {
        hash = await utils.quadHash(quadStringsObj.subjectString +
            " " + quadStringsObj.objectString);
	}
    var lastdigits = hash.substr(hash.length - state.lsd);
    var decimalInt = BigInt("0x" + lastdigits);
    var index = decimalInt / state.divisorInt;
    return index;
}

async function processAllData(quads, options) {
    var state = new State(options);
    state.addAndParseQuads(quads);

    await processQuads(state);
    return state.indices;
}

exports.processAllData = processAllData
exports.makeQuadString = makeQuadString