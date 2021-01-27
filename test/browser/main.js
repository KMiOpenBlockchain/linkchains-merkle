"use strict";

let options = {
    "quadHash": "KECCAK-256",
    "treeHash": "KECCAK-256",
    "indexHash": "KECCAK-256",
    "lsd": 2,
    "indexType": "object",
    "divisor": "0xa"
};

document.getElementById('inputOptions').innerHTML = "<code>" + JSON.stringify(options) + "</code>";

let quads = "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n";

document.getElementById('inputQuads').innerHTML = "<code id=\"quads\"></code>";
document.getElementById('quads').innerText = quads;


let linkchains = window.linkchains();
linkchains.getVerificationMetadata(quads, options).then((merkleTrees) => {
    document.getElementById('response').innerHTML = "<code>" + JSON.stringify(merkleTrees) + "</code>";
});