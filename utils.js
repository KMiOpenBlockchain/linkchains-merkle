const N3 = require('n3');
const parser = new N3.Parser({ blankNodePrefix: '' });
const writer = new N3.Writer({ format: 'N-Quads' });
const jsonld = require('jsonld');
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const myEngine = newEngine();
const isomorphic = require('rdf-isomorphic');
const stringify = require('json-stable-stringify');
const { defaults } = require('./defaults.js');

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
    var quads = data;
    try {
        var json;
        if (!quads['@context']) {
            json = JSON.parse(quads);
        } else {
            json = quads;
        }
        quads = await jsonld.canonize(json, {
            algorithm: 'URDNA2015',
            format: 'application/n-quads'
        });
    } catch (error) {
        const parsed = parse(data);
        quads = writer.quadsToString(parsed);
    }

    var canonical = await jsonld.canonize(quads, {
        algorithm: 'URDNA2015',
        inputFormat: 'application/n-quads',
        format: 'application/n-quads'
    });
    return canonical;
}

async function normaliseMetadata(metadata) {
    var quads = metadata;
    try {
        var json;
        if (!quads['@context']) {
            json = JSON.parse(quads);
            if (!json['@context']) {
                json['@context'] = defaults.DEFAULT_JSONLD_CONTEXT;
            }
        } else {
            json = quads;
        }
        quads = await jsonld.compact(json, json['@context']);
    } catch (error) {
        const parsed = parse(metadata);
        const nquads = writer.quadsToString(parsed);
        const json = await jsonld.fromRDF(nquads);
        json['@context'] = defaults.DEFAULT_JSONLD_CONTEXT;
        quads = await jsonld.compact(json, json['@context']);
    }

    return quads;
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
    return canonicalWithTerms;
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
                        g = getRDFTerm(graph);
                    }
                    var s = getRDFTerm(subject);
                    var p = getRDFTerm(predicate);
                    var o = getRDFTerm(object);
                    quadString += s + ' ' + p + ' ' + o + ' ' + g + ' .\n';
                }
            }
        }
    }
    var quads = await parseCanonical(quadString);
    return quads;
}

function matchQuadsIgnoreBlanks(quadsA, quadsB) {
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

function getRDFTerm(term) {
    var id = null;
    try {
        var url = new URL(term);
        id = '<' + term + '>';
    } catch (e) {
        id = term;
    }
    return id;
}

exports.makeQuadString = makeQuadString;
exports.makeQuadTerm = makeQuadTerm;
exports.makeQuadValue = makeQuadValue;
exports.canonicalise = canonicalise;
exports.normaliseMetadata = normaliseMetadata;
exports.parse = parse;
exports.parseCanonical = parseCanonical;
exports.parseToTerms = parseToTerms;
exports.metadataToRDF = metadataToRDF;
exports.makeBareTermStrings = makeBareTermStrings;
exports.matchQuadsIgnoreBlanks = matchQuadsIgnoreBlanks;