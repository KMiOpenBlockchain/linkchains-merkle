var fs = require('fs');
const countLinesInFile = require('count-lines-in-file');
var readline = require('linebyline');
const hashingFunctions = require('./hashing');
var microtime = require('microtime');
//const readLastLines = require('read-last-lines');
const N3 = require('n3');
const parser = new N3.Parser();
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

	storeTotalAndDataFolder(curTotal, starttime, curParentDataFolder) {
		this.analysis[this.curFolder].allhashes.count = curTotal;
		this.analysis[this.curFolder].allhashes.time = microtime.now() - starttime;
		this.analysis[this.curFolder].allhashes.filesize = fs.statSync(curParentDataFolder + "allquadhashes.txt").size;
	}

	setCurStats() {
		var length = this.analysis[this.curFolder].variants[this.index].files.length;
		var storedData = sortedFolder + stats.fileArray[stats.counter];
		this.analysis[this.curFolder].variants[this.index].files[length] = {};
		this.analysis[this.curFolder].variants[this.index].files[length].filename = stats.fileArray[stats.counter];
		this.analysis[this.curFolder].variants[this.index].fileSortTime = this.processTimes[this.index];
		return storedData;
	}

	getJson(){
		return JSON.stringify(this.analysis, null, 4);
	}

	curStatsFromStoredData( numberOfLines ) {
		var length = this.analysis[this.curFolder].variants[this.index].files.length;
		var storedData = sortedFolder + stats.fileArray[stats.counter];
		this.analysis[this.curFolder].variants[this.index].files[length - 1].count = numberOfLines;
		this.analysis[this.curFolder].variants[this.index].files[length - 1].filesize = fs.statSync(storedData).size;
		return storedData;
	}


}

const stats = new Stats();

function processAllData() {
	if (dataLoopCount >= cfg.data.length) {
		console.log("FINISHED");
		if (analysisFlag) {
			finishAnalysis();
		} else {
			process.exit();
		}
	} else {
		//console.log(cfg.data[i]);
		console.log(dataLoopCount);
		count = 0;
		total = 0;
		target = 0;
		
		sortedFolder = folderpath + "sorted/";
		quadHashes = new Array();
		datasetFolder = cfg.data[dataLoopCount].datafolder;
		rdfdatafile = cfg.data[dataLoopCount].datafile;
		path = folderpath + datasetFolder + rdfdatafile;
		indexType = cfg.data[dataLoopCount].indexType;
		lsds = cfg.data[dataLoopCount].lsd;
		divisor = cfg.data[dataLoopCount].divisor;
		divisorInt = BigInt(divisor);
		setUpFolderPaths();
	}
}
processAllData();

function finishAnalysis() {
	if (stats.index >= cfg.data.length) {
		//console.log(JSON.stringify(analysis));
		
		fs.writeFile (folderpath + "sorted/preprocess.json", stats.getJson(), function(err) {
			if (err) throw err;
				//
			process.exit();
		});	
		
		//console.log("ANALYSIS FINISHED");
	} else {
		lsds = cfg.data[stats.index].lsd;
		divisor = cfg.data[stats.index].divisor;
		indexType = cfg.data[stats.index].indexType;
		sortedFolder = folderpath + "sorted/";
		rdfdatafile = cfg.data[stats.index].datafile;
		res = rdfdatafile.split(".");
		res.pop();
		var folder = res.join(".");
		stats.curFolder = folder;
		sortedFolder = sortedFolder + folder + "/";
		
		sortedFolder = sortedFolder + indexType + "_" + lsds + "_" + divisor +  "/";
		stats.fileArray = new Array();
		stats.counter = 0;
		
		fs.readdir(sortedFolder, function (err, files) {
			//handling error
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			} 
			//listing all files using forEach
			files.forEach(function (file) {
				// Do whatever you want to do with the file
				//console.log(file); 
				stats.fileArray.push(file);
			});
			analysisPerFile();
		});	
	}
}


function analysisPerFile() {
	if (stats.counter >= stats.fileArray.length) {
		stats.index += 1;
		finishAnalysis();
	} else {
		var storedData = stats.setCurStats();
		countLinesInFile(storedData, (error, numberOfLines) => {
			stats.curStatsFromStoredData( numberOfLines);
			stats.counter += 1;
			analysisPerFile();
		});
	}
}


function setUpFolderPaths() {
	res = rdfdatafile.split(".");
	res.pop();
	var folder = res.join(".");
	stats.curFolder = folder;
	//var folder = res[0];
	console.log(folder);
	
	if (processedAllDataRelatedToFolder[stats.curFolder] === undefined) processedAllDataRelatedToFolder[stats.curFolder] = true;
	
	sortedFolder = sortedFolder + folder + "/";
	parentdatafolder = sortedFolder;
	stats.resetCurStats();

	if (!fs.existsSync(sortedFolder)){
		fs.mkdirSync(sortedFolder);
	}
	sortedFolder = sortedFolder + indexType + "_" + lsds + "_" + divisor +  "/";
	countLinesInFile(path, (error, numberOfLines) => {
		total = numberOfLines;
		console.log("total lines = " + total);
		cleanUpFilesAndFolders();
	});
}

function cleanUpFilesAndFolders() {
	deleteFolderRecursive(sortedFolder);
	if (!fs.existsSync(sortedFolder)){
		fs.mkdirSync(sortedFolder);
	}
	if (allQuadHashesTestArr[parentdatafolder] == undefined) {
		allQuadHashesTestArr[parentdatafolder] = 1;
		fs.unlink(parentdatafolder + "allquadhashes.txt", function(err)
		{
			if (err) {
				if(err.code == 'ENOENT') {
					// file doens't exist
					console.info("allquadhashes.txt file doesn't exist, won't remove it.");
					readthelines();
				} else {	// other errors, e.g. maybe we don't have enough permission
					console.error("Error occurred while trying to remove file");
				}
			} else {
				console.info("removed allquadhashes.txt");
				readthelines();
			}}
		);
	} else {
		readthelines();
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


function possiblyAppendHashIndexes(subjectTerm, predicate, objectTerm, graph, linecount, starttime) {
	if (processedAllDataRelatedToFolder[stats.curFolder] === false) {
		const index = makeHashIndex(subjectTerm, predicate, objectTerm, graph);
		fs.appendFile(sortedFolder + index + ".txt", text, function (err) {
			if (err) return console.log(err);
		});

		//if (linecount % 10000 == 0) console.log(linecount);
		if (linecount == total) {
			stats.processTimes[dataLoopCount] = microtime.now() - starttime;
			console.log("File read finished");
			dataLoopCount += 1;
			processAllData();
		}
	} else {
		fs.appendFile(parentdatafolder + "allquadhashes.txt", text, function (err) {
			if (err) return console.log(err);
		});
		if (linecount == total) {
			stats.storeTotalAndDataFolder(total, starttime, parentdatafolder);
			processedAllDataRelatedToFolder[stats.curFolder] = false;
			fs.unlink(parentdatafolder + "allquadhashes.txt", function (err) {
				if (err && err.code == 'ENOENT') {
					// file doens't exist
					console.info("allquadhashes.txt file doesn't exist, won't remove it.");
					readthelines();
				} else if (err) {
					// other errors, e.g. maybe we don't have enough permission
					console.error("Error occurred while trying to remove file");
				} else {
					console.info("removed allquadhashes.txt");
					readthelines();
				}
			});
		}
	}
}

function readRow(data, linecount, starttime) {
	var quadres = parser.parse(data);
	var quad = quadres[0];
	var {subjectTerm, predicate, objectTerm, graph, quadString} = makeQuadString(quad);

	quadHash = pluggable.quadHash.thefunction(quadString, pluggable.quadHash.parameters);
	text = quadHash + "\n";

	possiblyAppendHashIndexes(subjectTerm, predicate, objectTerm, graph, linecount, starttime);
	count++;
}

function  readthelines() {
	var starttime = microtime.now();
	rd = readline(path);
	rd.on('line', function(data, linecount) {
			readRow(data, linecount, starttime);
		}

	);
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


