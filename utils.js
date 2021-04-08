const N3 = require('n3');
const parser = new N3.Parser({ blankNodePrefix: '' });
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const myEngine = newEngine();
const jsonld = require('jsonld');
const stringify = require('json-stable-stringify');

function makeQuadTerm(term) {
    if (term.termType === "BlankNode") {
        return '_:' + term.value;
    }
    return '<' + term.value + '>';
}

function makeQuadValue(value) {
    return '"' + value + '"';
}

function makeQuadString(quadObj) {
    var subjectTerm = makeQuadTerm(quadObj.subject);
    var predicate = makeQuadTerm(quadObj.predicate);
    var objectTerm;
    if (quadObj.object.termType != "Literal") {
        objectTerm = makeQuadTerm(quadObj.object);
    } else {
        objectTerm = makeQuadValue(quadObj.object.value);
        if (quadObj.object.language) {
            objectTerm += '@' + quadObj.object.language;
        }
        if (quadObj.object.datatype) {
            objectTerm += '^^' + makeQuadTerm(quadObj.object.datatype);
        }
    }
    var graph = (quadObj.graph.value ? makeQuadTerm(quadObj.graph) : '');

    var quadString = subjectTerm + ' ' + predicate + ' ' + objectTerm + ' ' + graph + ' .';

    var blanks = [];
    var fields = ['subject', 'predicate', 'object', 'graph'];
    for (var field = 0; field < fields.length; field++) {
        var term = quadObj[field];
        if (term && term.termType && term.termType === "BlankNode" &&
            !blanks.includes(term.value)) {
            blanks.push(term.value);
        }
    }

    return {
        'subjectString': subjectTerm,
        'predicateString': predicate,
        'objectString': objectTerm,
        'graphString': graph,
        'quadString': quadString,
        'blanks': blanks
    };
}

function makeBareTermStrings(quadStringObject) {
    const terms = ['subjectString', 'predicateString', 'objectString', 'graphString'];
    var result = Object.assign({}, quadStringObject);
    for (var term of terms) {
        var currentTerm = quadStringObject[term];
        if (currentTerm.startsWith('<') && currentTerm.endsWith('>')) {
            currentTerm = currentTerm.substring(1, currentTerm.length - 1);
        }
        result[term] = currentTerm;
    }
    return result;
}

async function canonicalise(data) {
    var canonical = await jsonld.canonize(data, {
        algorithm: 'URDNA2015',
        inputFormat: 'application/n-quads',
        format: 'application/n-quads'
    });
    return canonical;
}

function parse(quads) {
    return parser.parse(quads);
}

async function parseCanonical(data) {
    var canonical = await canonicalise(data);
    return parse(canonical);
}

async function parseToTerms(data) {
    var parsed = await parseCanonical(data);
    var canonicalWithTerms = [];
    for (var i = 0; i < parsed.length; i++) {
        canonicalWithTerms.push(makeQuadString(parsed[i]));
    }
}

async function metadataToRDF(perQuadMetadata) {
    var quadString = '';
    var metadata = Object.assign({}, perQuadMetadata);

    delete metadata["@context"];
    delete metadata.metadata;
    for (var graph of Object.keys(metadata)) {
        for (var subject of Object.keys(metadata[graph])) {
            for (var predicate of Object.keys(metadata[graph][subject])) {
                for (var object of Object.keys(metadata[graph][subject][predicate])) {
                    var g = "";
                    if (graph !== "@defaultgraph") {
                        g = getRDFTerm(graph, perQuadMetadata.metadata.blanks);
                    }
                    var s = getRDFTerm(subject, perQuadMetadata.metadata.blanks);
                    var p = getRDFTerm(predicate, perQuadMetadata.metadata.blanks);
                    var o = getRDFTerm(object, perQuadMetadata.metadata.blanks);
                    quadString += s + ' ' + p + ' ' + o + ' ' + g + ' .\n';
                }
            }
        }
    }
    var quads = await parseCanonical(quadString);
    //console.log("MAPPINGMAPPINGMAPPING " + quads);
    return quads;
}

// DELETE
async function metadataToGraphPattern(perQuadMetadata) {
    var quadString = '';
    var metadata = Object.assign({}, perQuadMetadata);

    delete metadata["@context"];
    delete metadata.metadata;
    for (var graph of Object.keys(metadata)) {
        for (var subject of Object.keys(metadata[graph])) {
            for (var predicate of Object.keys(metadata[graph][subject])) {
                for (var object of Object.keys(metadata[graph][subject][predicate])) {

                    var s = getGraphPatternTerm(subject, perQuadMetadata.metadata.blanks);
                    var p = getGraphPatternTerm(predicate, perQuadMetadata.metadata.blanks);
                    var o = getGraphPatternTerm(object, perQuadMetadata.metadata.blanks);
                    const tripleString = s + ' ' + p + ' ' + o + ' ';
                    var patternString = "";
                    var g = "";
                    if (graph !== "@defaultgraph") {
                        g = getGraphPatternTerm(graph, perQuadMetadata.metadata.blanks);
                        patternString += 'GRAPH ' + g + ' { ' + tripleString + ' . }'
                    } else {
                        patternString += tripleString + g + ' .\n';
                    }
                    quadString += "OPTIONAL { " + patternString + " }";
                }
            }
        }
    }

    return quadString;
}

function matchQuadsIgnoreBlanks(isomorphic, quadsA, quadsB) {
    var aSignatureCount = {};
    var bSignatureCount = {};

    for (const quad of quadsA) {
        const signature = isomorphic.quadToSignature(quad, {}, quad);
        if (!aSignatureCount[signature]) {
            aSignatureCount[signature] = [quad];
        } else {
            aSignatureCount[signature].push(quad);
        }
    }

    for (const quad of quadsB) {
        const signature = isomorphic.quadToSignature(quad, {}, quad);
        if (!bSignatureCount[signature]) {
            bSignatureCount[signature] = [quad];
        } else {
            bSignatureCount[signature].push(quad);
        }
    }

    var matchesA = new Set([]);
    var matchesB = new Set([]);
    for (const signature in aSignatureCount) {
        if (bSignatureCount[signature] && aSignatureCount[signature].length === bSignatureCount[signature].length) {
            for (const quad of aSignatureCount[signature]) {
                matchesA.add(quad);
            }
        }
    }
    for (const signature in bSignatureCount) {
        if (aSignatureCount[signature] && aSignatureCount[signature].length === bSignatureCount[signature].length) {
            for (const quad of bSignatureCount[signature]) {
                matchesB.add(quad);
            }
        }
    }

    return {
        matchesA: matchesA,
        matchesB: matchesB
    };
}

// DELETE
function matchQuadsIgnoreBlanksOrig(quadsA, quadsB) {
    var unmatchedQuadsA = [];
    for (const quadA of quadsA) {
        var newQuadsB = [];
        var match = false;
        for (const quadB of quadsB) {
            if (match || !quadEqualsIgnoreBlanks(quadA, quadB)) {
                newQuadsB.push(quadB);
            } else {
                match = true;
            }
        }
        if (!match) {
            unmatchedQuadsA.push(quadA);
        }
        quadsB = newQuadsB;
    }
    return {
        unmatchedA: unmatchedQuadsA,
        unmatchedB: quadsB
    };
}

// DELETE
function quadEqualsIgnoreBlanks(quadA, quadB) {
    const terms = ['subject', 'predicate', 'object', 'graph'];
    var match = true;
    for (const term of terms) {
        if (quadA[term].termType === 'BlankNode') {
            continue;
        }
        if (!quadA[term].equals(quadB[term])) {
            match = false;
            break;
        }
    }
    return match;
}

// DELETE
async function isomorphicToSubgraph(metadata, quads) {
    var metadataGraphPattern = await metadataToGraphPattern(metadata);
    console.log(JSON.stringify(metadataGraphPattern));
    const sparql = "SELECT * WHERE { " + metadataGraphPattern + " }";

    var store = new N3.Store();;
    store.addQuads(quads);
    var source = {
        sources: [
            {
                type: 'rdfjsSource',
                value: store
            }
        ]
    };
    const result = await myEngine.query(
        sparql,
        source
    );
    try {
        const bindings = await result.bindings();
        console.log(JSON.stringify(bindings));
    } catch (e) {
        console.log(e);
    }

}

// DELETE
function getGraphPatternTerm(term, givenBlanks) {
    var id = null;
    if (givenBlanks.includes(term) || givenBlanks.includes(term.replace('_:', ''))) {
        if (!term.startsWith('_:')) {
            id = '?' + term;
        } else {
            id = '?' + (term.substring(2));
        }
    } else {
        try {
            var url = new URL(term);
            id = '<' + term + '>';
        } catch (e) {
            id = term;
        }
    }
    return id;
}

function getRDFTerm(term, givenBlanks) {
    var id = null;
    if (givenBlanks.includes(term) || givenBlanks.includes(term.replace('_:', ''))) {
        if (!term.startsWith('_:')) {
            id = '_:' + term;
        } else {
            id = term;
        }
    } else {
        try {
            var url = new URL(term);
            id = '<' + term + '>';
        } catch (e) {
            id = term;
        }
    }
    return id;
}

// DELETE
function mapBlankNodes(quadObj, mapping) {
    const terms = ['subject', 'predicate', 'object', 'graph'];
    var newQuad = Object.assign({}, current);
    for (var term of terms) {
        var current = quadObj[term];
        if (current.termType === 'BlankNode') {
            newQuad[term].id = mapping[current.id];
        }
    }
    return newQuad;
}

exports.makeQuadString = makeQuadString;
exports.makeQuadTerm = makeQuadTerm;
exports.makeQuadValue = makeQuadValue;
exports.canonicalise = canonicalise;
exports.parse = parse;
exports.parseCanonical = parseCanonical;
exports.parseToTerms = parseToTerms;
exports.metadataToRDF = metadataToRDF;
exports.makeBareTermStrings = makeBareTermStrings;
exports.matchQuadsIgnoreBlanks = matchQuadsIgnoreBlanks;