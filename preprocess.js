var fs = require('fs');
const countLinesInFile = require('count-lines-in-file');
var readline = require('linebyline');
const hashingFunctions = require('./hashing');
var microtime = require('microtime');
//const readLastLines = require('read-last-lines');
const N3 = require('n3');
const parser = new N3.Parser();
var stringify = require('json-stable-stringify');

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

var analysisFlag = true;

var folderpath = cfg.dataFolder;
var datasetFolder;
var sortedFolder;
var rdfdatafile;
var path;
var parentdatafolder;
var total;
var target;
var indexType;
var lsds;
var divisor;
var divisorInt;
var processedAllDataRelatedToFolder = new Array();
var quadHashes;

var count =  0;
var dataLoopCount = 0;
var reg = new RegExp('^\\d+$');
var allQuadHashesTestArr = new Array();
var SortedMap = require("collections/sorted-map");

class Stats {
	analysis = {}
	fileArray;
	counter;
	index;
	processTimes = new Array();
	curFolder = {}
	constructor () {
		this.index = 0;
		this.counter = 0;
	}
	resetCurStats() {
		if (this.analysis[this.curFolder] == undefined) this.analysis[this.curFolder] = {};
		if (this.analysis[this.curFolder].allhashes == undefined) this.analysis[this.curFolder].allhashes = {};
		if (this.analysis[this.curFolder].variants == undefined) this.analysis[this.curFolder].variants = new Array();
		var folderIndex = this.analysis[this.curFolder].variants.length;
		this.analysis[this.curFolder].variants[folderIndex] = {};
		this.analysis[this.curFolder].variants[folderIndex].type = indexType;
		this.analysis[this.curFolder].variants[folderIndex].lsd = lsds;
		this.analysis[this.curFolder].variants[folderIndex].divisor = divisor;
		this.analysis[this.curFolder].variants[folderIndex].files = new Array();
	}

	storeTotalAndDataFolder(curTotal, starttime, curParentDataFolder, state) {
		this.analysis[this.curFolder].allhashes.count = curTotal;
		this.analysis[this.curFolder].allhashes.time = microtime.now() - starttime;
		this.analysis[this.curFolder].allhashes.filesize = state.allQuadHashes.length;
	}

	setCurStats() {
		var length = this.analysis[this.curFolder].variants[this.index].files.length;
		var storedData = sortedFolder + this.fileArray[this.counter];
		this.analysis[this.curFolder].variants[this.index].files[length] = {};
		this.analysis[this.curFolder].variants[this.index].files[length].filename = this.fileArray[this.counter];
		this.analysis[this.curFolder].variants[this.index].fileSortTime = this.processTimes[this.index];
		return storedData;
	}

	getJson(){
		return stringify(this.analysis, {space: 4});
	}

	curStatsFromStoredData( numberOfLines, state) {
		var length = this.analysis[this.curFolder].variants[this.index].files.length;
		var storedData = sortedFolder + this.fileArray[this.counter];
		this.analysis[this.curFolder].variants[this.index].files[length - 1].count = numberOfLines;
		this.analysis[this.curFolder].variants[this.index].files[length - 1].filesize = state.indexes.get(storedData).length;
		return storedData;
	}


}

class State{
	stats;
	indexes;
	folder;
	allQuadHashes;
	quadText;
	preprocess;

	constructor (options){
		this.stats = new Stats();
		this.indexes = new SortedMap();
		this.jsonStatsData = new SortedMap();
		this.folder="";
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
		lsds = options.lsd ? options.lsd : 64;
		indexType = options.indexType ? options.indexType : 'subject';
		divisor = options.divisor ? options.divisor : 0x1;
		divisorInt = BigInt(divisor);
	};

	appendAllQuadHashes(data){
		if (this.allQuadHashes === undefined){
			this.allQuadHashes = data;
		} else {
			this.allQuadHashes += data;
		}
	}

	resetAllQuadHashes(){
		this.allQuadHashes = undefined;
	}

	numberOfRows(data){
		if (data === undefined ){
			// Not reading all indexes issue
			console.log("Issue");
			return 0;
		}
		return data.split(/\r\n|\r|\n/).length;
	}

	numberOfQuads(data){
		var quadres = parser.parse(data);
		var quadNumber = quadres.length;
		return quadNumber;
	}

	addToIndices(key, value){
		if (!this.indexes.has(key)){
			this.indexes.set(key,[]);
		}
		this.indexes.get(key).push(value);
	}
}

function getJsonIndices(state) {
	console.log("FINISHED");

	return writeIndexes(state.folder, state.indexes);

	// if (analysisFlag) {
	// 	finishAnalysis(state);
	//
	// 	writeStatsJson(state.jsonStatsData);
	//
	// } else {
	// 	//process.exit();
	// }
}

function makeDataReady(state) {
		console.log(dataLoopCount);
		count = 0;
		total = 0;
		target = 0;
		
		sortedFolder = folderpath + "sorted/";
		quadHashes = new Array();
		datasetFolder = cfg.data[dataLoopCount].datafolder;
		rdfdatafile = cfg.data[dataLoopCount].datafile;
		path = folderpath + datasetFolder + rdfdatafile;
		setUpFolderPaths(state);
}

function writeIndexes(folder, indexes) {
	// for (let [indexKey, indexValue] of indexes.entries()) {
	// 	fs.appendFile(indexKey, indexValue, function (err) {
	// 		if (err) return console.log(err);
	// 	});
	// }
	var jsonIndices = JSON.stringify(indexes, null, 3);

	return jsonIndices;
}

function writeStatsJson(jsonStatsData){
	// for (let [jsonKey, jsonValue] of jsonStatsData.entries()) {
	// 	fs.writeFile(jsonKey, jsonValue, function (err) {
	// 		if (err) throw err;
	// 		//
	// 		process.exit();
	// 	});
	// }
}

function finishAnalysis(state) {
	if (state.stats.index >= cfg.data.length) {

		state.jsonStatsData.add(state.stats.getJson(), folderpath + "sorted/preprocess.json");

		//console.log("ANALYSIS FINISHED");
	} else {
		sortedFolder = folderpath + "sorted/";
		rdfdatafile = cfg.data[state.stats.index].datafile;
		res = rdfdatafile.split(".");
		res.pop();
		var folder = res.join(".");
		state.stats.curFolder = folder;
		sortedFolder = sortedFolder + folder + "/";
		
		sortedFolder = sortedFolder + indexType + "_" + lsds + "_" + divisor +  "/";
		state.stats.fileArray = new Array();
		state.stats.counter = 0;


		fs.readdir(sortedFolder, function (err, files) {
			//handling error
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			} 
			//listing all files using forEach
			files.forEach(function (file) {
				// Do whatever you want to do with the file
				//console.log(file); 
				state.stats.fileArray.push(file);
			});
			analysisPerFile(state);
		});	
	}
}


function analysisPerFile(state) {
	if (state.stats.counter >= state.stats.fileArray.length) {
		state.stats.index += 1;
		finishAnalysis(state);

		writeStatsJson(state.jsonStatsData);

	} else {
		var storedData = state.stats.setCurStats();
		if (state.indexes.get(storedData) !== undefined ){
			var numberOfRows = state.numberOfRows(state.indexes.get(storedData));
			state.stats.curStatsFromStoredData( numberOfRows, state);
		}
		state.stats.counter += 1;
		analysisPerFile(state);
	}
}


function getQuadText(path) {
	return fs.readFileSync(path, 'UTF-8');
}

function getNumberOfQuads(state) {
	total = state.numberOfQuads(state.quadText);
	console.log("total lines = " + total);
}

function setUpFolderPaths(state) {
	res = rdfdatafile.split(".");
	res.pop();
	var folder = res.join(".");
	state.stats.curFolder = folder;
	//var folder = res[0];
	console.log(folder);
	
	if (processedAllDataRelatedToFolder[state.stats.curFolder] === undefined) processedAllDataRelatedToFolder[state.stats.curFolder] = true;
	
	sortedFolder = sortedFolder + folder + "/";
	parentdatafolder = sortedFolder;
	state.stats.resetCurStats();

	if (!fs.existsSync(sortedFolder)){
		fs.mkdirSync(sortedFolder);
	}
	sortedFolder = sortedFolder + indexType + "_" + lsds + "_" + divisor +  "/";

	state.quadText = getQuadText(path);

}

function clearHashesAndReadRows(state) {
	if (allQuadHashesTestArr[parentdatafolder] == undefined) {
		allQuadHashesTestArr[parentdatafolder] = 1;
		state.resetAllQuadHashes();
		readthelines(state);
	} else {
		readthelines(state);
	}
}

function cleanUpFilesAndFolders(state) {
	deleteFolderRecursive(sortedFolder);
	if (!fs.existsSync(sortedFolder)){
		fs.mkdirSync(sortedFolder);
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
	return {subjectTerm, predicate, objectTerm, graph, quadString};
}

function makeHashIndex(subjectTerm, predicate, objectTerm, graph) {
	if (indexType == "uniform") {
		hash = quadHash;
	} else if (indexType == "subject") {
		hash = pluggable.quadHash.thefunction(subjectTerm, pluggable.quadHash.parameters);
	} else if (indexType == "predicate") {
		hash = pluggable.quadHash.thefunction(predicate, pluggable.quadHash.parameters);
	} else if (indexType == "object") {
		hash = pluggable.quadHash.thefunction(objectTerm, pluggable.quadHash.parameters);
	} else if (indexType == "graph") {
		hash = pluggable.quadHash.thefunction(graph, pluggable.quadHash.parameters);
	} else if (indexType == "subjectobject") {
		hash = pluggable.quadHash.thefunction(subjectTerm + " " + objectTerm, pluggable.quadHash.parameters);
	}
	lastdigits = hash.substr(hash.length - lsds);
	decimalInt = BigInt("0x" + lastdigits);
	index = decimalInt / divisorInt;
	return index;
}


function possiblyAppendHashIndexes(subjectTerm, predicate, objectTerm, graph, linecount, starttime, state) {
	if (processedAllDataRelatedToFolder[state.stats.curFolder] === false) {
		const index = makeHashIndex(subjectTerm, predicate, objectTerm, graph);

		state.addToIndices(index.toString(), text);
		state.folder = sortedFolder;

		//if (linecount % 10000 == 0) console.log(linecount);
		if (linecount == total - 1 ) {
			state.stats.processTimes[dataLoopCount] = microtime.now() - starttime;
			console.log("File read finished");
		}
	} else {
		state.appendAllQuadHashes(text);
		if (linecount == total - 1) {
			state.stats.storeTotalAndDataFolder(total, starttime, parentdatafolder, state);
			processedAllDataRelatedToFolder[state.stats.curFolder] = false;
			state.resetAllQuadHashes();
			readthelines(state);
		}
	}
}

function readRow(data, linecount, starttime, state) {
	var quadres = parser.parse(data);
	var quad = quadres[0];
	if (quad !== undefined) {
		var {subjectTerm, predicate, objectTerm, graph, quadString} = makeQuadString(quad);

		quadHash = pluggable.quadHash.thefunction(quadString, pluggable.quadHash.parameters);
		text = quadHash;

		possiblyAppendHashIndexes(subjectTerm, predicate, objectTerm, graph, linecount, starttime, state);
		return 1;
	}
	count++;
	return 0;
}

function  readthelines(state) {
	var starttime = microtime.now();

	const rows = state.quadText.split(/\r?\n/);
	var curQuadNumber = 0;
	for (curRow = 0; curRow < rows.length; curRow++) {
		curQuadNumber += readRow(rows[curRow], curQuadNumber, starttime, state);
	}
}


function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function writeJsonIndices(state, jsonIndices) {
	fs.appendFile(state.folder + "indices.json", jsonIndices, function (err) {
		if (err) return console.log(err);
	});
}

function processAllDataJson(state) {
	getNumberOfQuads(state);
	clearHashesAndReadRows(state);
	var jsonIndices = getJsonIndices(state);
	return jsonIndices;
}

function processAndWriteAllData(options){
	var state = new State(options);
	makeDataReady(state);
	cleanUpFilesAndFolders(state);
	var jsonIndices = processAllDataJson(state);
	writeJsonIndices(state, jsonIndices);
}

function processAllData(quads, options) {
	var state = new State(options);
	state.stats.resetCurStats();
	state.quadText = quads;
	var jsonIndices = processAllDataJson(state);
	return jsonIndices;
}

//processAndWriteAllData();

exports.processAllData = processAllData