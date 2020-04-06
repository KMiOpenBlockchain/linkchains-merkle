const hashingFunctions = require('./hashing');
require("./config.js");

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

var fs = require('fs');
const countLinesInFile = require('count-lines-in-file');
var readline = require('linebyline');
//var keccak256 = require('js-sha3').keccak_256;
const N3 = require('n3');
const parser = new N3.Parser();

var pluggable = settings.pluggableFunctions;
var folderpath = cfg.dataFolder;

var configDataIndex = "DATASET_ARRAY_INDEX_TO USE_IN_CONFIG";

var datasetFolder = cfg.data[configDataIndex].datafolder;
var rdfdatafile = cfg.data[configDataIndex].datafile;
//var rdfdatafile = 'test.nq';
var path = folderpath + datasetFolder + rdfdatafile;
var sortedpath = folderpath + "sorted/";
var parentdatafolder;

var total = 0;
var target = 0;

var indexType = "subjectobject";
var lsds = 5;
var divisor = 8500;

var count =  0;
var resultscount = 0;
var reg = new RegExp('^\\d+$');
var quadres, quad, quadString;
var quadHashes = new Array();
var results = new Array();

function setUpFolderPaths() {
	res = rdfdatafile.split(".");
	var folder = res[0];
	//console.log(folder);
	sortedpath = sortedpath + folder + "/";
	parentdatafolder = sortedpath;
	sortedpath = sortedpath + indexType + "/";
	countLinesInFile(path, (error, numberOfLines) => {
		total = numberOfLines;
		console.log("total lines = " + total);
		readthelines ();
	});
}

setUpFolderPaths();


function  readthelines () {
	rd = readline(path);
	rd.on('line', function(data, linecount) {
		quadres = parser.parse(data);
		quad = quadres[0];
		
		subject = '<' + quad.subject.value + '>';
		predicate = '<' + quad.predicate.value + '>';
		if (quad.object.termType != "Literal") {
			object = '<' + quad.object.value + '>';
		} else {
			object = '"' + quad.object.value + '"';
			if (quad.object.language) {
				object += '@' + quad.object.language;
			}
			if (quad.object.datatype) {
				object += '^^<' + quad.object.datatype.value + '>';
			}			
		}
		graph = (quad.graph.value ? '<' + quad.graph.value + '>' : '');
		
		quadString = subject + ' ' + predicate + ' ' + object + ' ' + graph + ' .';
		
		quadhash = pluggable.quadHash.thefunction(quadString, pluggable.quadHash.parameters);		
		
		if (indexType == "uniform") {
			lastfive = quadHash.substr(quadHash.length - 5);
			decimal = parseInt(lastfive, 16);
			index = Math.floor(decimal/8500);
			results[index] = 1;
		} else if (indexType == "subject") {
			filenamehash = pluggable.quadHash.thefunction(subject, pluggable.quadHash.parameters);
			if (results[filenamehash] == undefined) {
				resultscount += 1;
				results[filenamehash] = 1;
			}
		} else if (indexType == "predicate") {
			filenamehash = pluggable.quadHash.thefunction(predicate, pluggable.quadHash.parameters);
			if (results[filenamehash] == undefined) {
				resultscount += 1;
				results[filenamehash] = 1;
			}
			results[filenamehash] = 1;
		} else if (indexType == "object") {
			filenamehash = pluggable.quadHash.thefunction(object, pluggable.quadHash.parameters);
			if (results[filenamehash] == undefined) {
				resultscount += 1;
				results[filenamehash] = 1;
			}
			results[filenamehash] = 1;
		} else if (indexType == "graph") {
			filenamehash = pluggable.quadHash.thefunction(graph, pluggable.quadHash.parameters);
			if (results[filenamehash] == undefined) {
				resultscount += 1;
				results[filenamehash] = 1;
			}
			results[filenamehash] = 1;
		} else if (indexType == "subjectobject") {
			filenamehash = pluggable.quadHash.thefunction(subject + " " + object, pluggable.quadHash.parameters);
			if (results[filenamehash] == undefined) {
				resultscount += 1;
				results[filenamehash] = 1;
			}
			results[filenamehash] = 1;
		}
				
		if (linecount % 100000 == 0) console.log(linecount);
		if (linecount == total) {
			console.log("File read finished");
			if (indexType == "uniform") {
				console.log(results.length);
			} else {
				console.log(resultscount);
			}
		}		
		count++;
	});
}


