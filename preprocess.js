var fs = require('fs');
const N3 = require('n3');
const parser = new N3.Parser();
var stringify = require('json-stable-stringify');
var SortedMap = require("collections/sorted-map");

const hashingFunctions = require('./hashing');

var settings = {
    "pluggableFunctions": {
        "quadHash": {
            "thefunction": hashingFunctions.getHash,
            "parameters": {
                "type": "KECCAK256"
            }
        }
    }
};

var pluggable = settings.pluggableFunctions;

class State {
    indexType;
    lsds;
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
        /* var defaultHash = 'KECCAK256';
        var quadHash = options.quadHash ? options.quadHash : defaultHash;
        var treeHash = options.treeHash ? options.treeHash : defaultHash;
        var indexHash = options.indexHash ? options.indexHash : defaultHash;
        pluggable = {
            "quadHash": {
                "getHash": (input) => {
                    return hashingFunctions.getHash(input, {
                        "type": quadHash
                    });
                }
            },
            "treeHash": {
                "getHash": (input) => {
                    return hashingFunctions.getHash(input, {
                        "type": treeHash
                    });
                }
            },
            "indexHash": {
                "getHash": (input) => {
                    return hashingFunctions.getHash(input, {
                        "type": indexHash
                    });
                }
            }
        } */
        this.lsds = options.lsd ? options.lsd : 64;
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

function processQuads(state) {
    for (var currentQuad = 0; currentQuad < state.quads.length; currentQuad++) {
        processQuad(state, state.quads[currentQuad]);
    }
}

function processQuad(state, quad) {
    if (quad !== undefined) {
        var quadStringsObj = makeQuadString(quad);

        quadStringsObj.quadHash = pluggable.quadHash.thefunction(quadStringsObj.quadString,
            pluggable.quadHash.parameters);

        var index = makeHashIndex(state, quadStringsObj);
        state.addToIndices(index.toString(), quadStringsObj.quadHash);
    }
}

function makeHashIndex(state, quadStringsObj) {
    if (state.indexType == "uniform") {
        hash = quadStringsObj.quadHash;
    } else if (state.indexType == "subject") {
        hash = pluggable.quadHash.thefunction(quadStringsObj.subjectString,
            pluggable.quadHash.parameters);
    } else if (state.indexType == "predicate") {
        hash = pluggable.quadHash.thefunction(quadStringsObj.predicateString,
            pluggable.quadHash.parameters);
    } else if (state.indexType == "object") {
        hash = pluggable.quadHash.thefunction(quadStringsObj.objectString,
            pluggable.quadHash.parameters);
    } else if (state.indexType == "graph") {
        hash = pluggable.quadHash.thefunction(quadStringsObj.graphString,
            pluggable.quadHash.parameters);
    } else if (state.indexType == "subjectobject") {
        hash = pluggable.quadHash.thefunction(quadStringsObj.subjectString +
            " " + quadStringsObj.objectString,
            pluggable.quadHash.parameters);
    }
    var lastdigits = hash.substr(hash.length - state.lsds);
    var decimalInt = BigInt("0x" + lastdigits);
    var index = decimalInt / state.divisorInt;
    return index;
}

function processAllData(quads, options) {
    var state = new State(options);
    state.addAndParseQuads(quads);

    processQuads(state);
    return state.indices;
}

exports.processAllData = processAllData

var options = {
    "quadHash": 'KECCAK256',
    "divisor": "0x1",
    "indexType": "object",
    "lsd": 64
};

var json = processAllData("<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n", 
                options);