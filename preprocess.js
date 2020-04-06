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
var rdfdatafile;
var path;
var parentdatafolder;
var total;
var target;
var indexType;
var lsds;
var divisor;
var divisorInt;
var alldatafile = new Array();
var quadHashes;
var quadres, quad, quadString;

var count =  0;
var dataLoopCount = 0;
var reg = new RegExp('^\\d+$');
var allQuadHashesTestArr = new Array();
var analysis = {};
var ai = 0;
var af;
var analcount = 0;
var fileArray;
var filecaount;
var processTimes = new Array();



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
		
		sortedpath = folderpath + "sorted/";
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
	if (analcount >= cfg.data.length) {
		//console.log(JSON.stringify(analysis));
		
		var json = JSON.stringify(analysis, null, 4);
		fs.writeFile (folderpath + "sorted/preprocess.json", json, function(err) {
			if (err) throw err;
				//
			process.exit();
		});	
		
		//console.log("ANALYSIS FINISHED");
	} else {
		lsds = cfg.data[analcount].lsd;
		divisor = cfg.data[analcount].divisor;
		indexType = cfg.data[analcount].indexType;
		sortedpath = folderpath + "sorted/";
		rdfdatafile = cfg.data[analcount].datafile;
		res = rdfdatafile.split(".");
		res.pop();
		var folder = res.join(".");
		af = folder;
		sortedpath = sortedpath + folder + "/";
		
		sortedpath = sortedpath + indexType + "_" + lsds + "_" + divisor +  "/";
		fileArray = new Array();
		filecaount = 0;
		
		fs.readdir(sortedpath, function (err, files) {
			//handling error
			if (err) {
				return console.log('Unable to scan directory: ' + err);
			} 
			//listing all files using forEach
			files.forEach(function (file) {
				// Do whatever you want to do with the file
				//console.log(file); 
				fileArray.push(file);
			});
			analysisPerFile();
		});	
	}
}

function analysisPerFile() {
	if (filecaount >= fileArray.length) {
		analcount += 1;
		finishAnalysis();
	} else {
		fl = analysis[af].variants[analcount].files.length;
		f = sortedpath + fileArray[filecaount];
		analysis[af].variants[analcount].files[fl] = {};
		analysis[af].variants[analcount].files[fl].filename = fileArray[filecaount];
		analysis[af].variants[analcount].fileSortTime = processTimes[analcount];
		countLinesInFile(f, (error, numberOfLines) => {
			analysis[af].variants[analcount].files[fl].count = numberOfLines;
			analysis[af].variants[analcount].files[fl].filesize = fs.statSync(f).size;
			filecaount += 1;
			analysisPerFile();
		});
	}
}



function setUpFolderPaths() {
	res = rdfdatafile.split(".");
	res.pop();
	var folder = res.join(".");
	af = folder;
	//var folder = res[0];
	console.log(folder);
	
	if (alldatafile[af] == undefined) alldatafile[af] = 1;
	
	sortedpath = sortedpath + folder + "/";
	parentdatafolder = sortedpath;
	if (analysis[af] == undefined) analysis[af] = {};
	if (analysis[af].allhashes == undefined) analysis[af].allhashes = {};
	if (analysis[af].variants == undefined) analysis[af].variants = new Array();
	ai = analysis[af].variants.length;
	analysis[af].variants[ai] = {};
	analysis[af].variants[ai].type = indexType;
	analysis[af].variants[ai].lsd = lsds;
	analysis[af].variants[ai].divisor = divisor;
	analysis[af].variants[ai].files = new Array();
	
	if (!fs.existsSync(sortedpath)){
		fs.mkdirSync(sortedpath);
	}
	sortedpath = sortedpath + indexType + "_" + lsds + "_" + divisor +  "/";
	countLinesInFile(path, (error, numberOfLines) => {
		total = numberOfLines;
		console.log("total lines = " + total);
		cleanUpFilesAndFolders();
	});
}

function cleanUpFilesAndFolders() {
	deleteFolderRecursive(sortedpath);
	if (!fs.existsSync(sortedpath)){
		fs.mkdirSync(sortedpath);
	}
	if (allQuadHashesTestArr[parentdatafolder] == undefined) {
		allQuadHashesTestArr[parentdatafolder] = 1;
		fs.unlink(parentdatafolder + "allquadhashes.txt", function(err) {
			if(err && err.code == 'ENOENT') {
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
	} else {
		readthelines();
	}
}

function  readthelines() {
	var starttime = microtime.now();
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
		
		quadHash = pluggable.quadHash.thefunction(quadString, pluggable.quadHash.parameters);
		
		text = quadHash + "\n";
		
		if (alldatafile[af] == 0) {
			if (indexType == "uniform") {
				hash = quadHash;
			} else if (indexType == "subject") {
				hash = pluggable.quadHash.thefunction(subject, pluggable.quadHash.parameters);
			} else if (indexType == "predicate") {
				hash = pluggable.quadHash.thefunction(predicate, pluggable.quadHash.parameters);
			} else if (indexType == "object") {
				hash = pluggable.quadHash.thefunction(object, pluggable.quadHash.parameters);
			} else if (indexType == "graph") {
				hash = pluggable.quadHash.thefunction(graph, pluggable.quadHash.parameters);
			} else if (indexType == "subjectobject") {
				hash = pluggable.quadHash.thefunction(subject + " " + object, pluggable.quadHash.parameters);
			}
			lastdigits = hash.substr(hash.length - lsds);
			decimalInt = BigInt("0x" + lastdigits);
			index = decimalInt/divisorInt;
			fs.appendFile(sortedpath + index + ".txt", text, function (err) {
				if (err) return console.log(err);
			});
				
			//if (linecount % 10000 == 0) console.log(linecount);
			if (linecount == total) {
				processTimes[dataLoopCount] = microtime.now() - starttime;
				console.log("File read finished");
				dataLoopCount += 1;
				processAllData();
			}
		} else {
			fs.appendFile(parentdatafolder + "allquadhashes.txt", text, function (err) {
				if (err) return console.log(err);
			});
			if (linecount == total) {
				analysis[af].allhashes.count = total;
				analysis[af].allhashes.time = microtime.now() - starttime;
				analysis[af].allhashes.filesize = fs.statSync(parentdatafolder + "allquadhashes.txt").size;
				alldatafile[af] = 0;
				fs.unlink(parentdatafolder + "allquadhashes.txt", function(err) {
					if(err && err.code == 'ENOENT') {
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
		count++;
	});
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
};


