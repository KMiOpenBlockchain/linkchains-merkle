require("./config.js");

var settings = {
    "pluggableFunctions": {
        "getFileHash": addFileToIPFS
    },
}

async function addFileToIPFS(file, hashonly, returnhandler) {
	for await (const result of ipfs.add(globSource(file), { onlyHash: hashonly })) {
		hash = bs58.encode(result.cid.multihash);
		returnhandler(hash);
	}
}

var MerkleTools = require('merkle-tools/merkletools');
var fs = require('fs');
var stringify=require('json-stable-stringify');

const web3_extended = require('web3_ipc');
//var keccak256 = require('js-sha3').keccak_256;
const countLinesInFile = require('count-lines-in-file');
var readline = require('linebyline');
const ipfsClient = require('ipfs-http-client');
const globSource = require('ipfs-utils/src/files/glob-source');
const bs58 = require('bs58');
var microtime = require('microtime');
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:56000'));
var ipfsurl = "http://" + cfg.ipfs.domain + ":" + cfg.ipfs.APIPort;
//var ipfs = ipfsClient(cfg.ipfsDomain, cfg.ipfsAPIPort, { protocol: 'http' });
var ipfs = ipfsClient(ipfsurl);
var randomHash = web3.utils.sha3("dummy data");  // web3 keccak256
var reg = new RegExp('^\\d+$');

var treeOptions = {
	hashType: cfg.treeHash.type // optional, defaults to 'sha256'
}

var folderpath = cfg.dataFolder;
var sortedpath;
var ipfsfilepath;
var parentdatafolder;
var parentipfsdatafolder;
var rdfdatafile;
var indexType;
var lsds;
var divisor;
var count;
var dataLoopCount = 0;
var processdata;
var fileArray;
var pluggable = settings.pluggableFunctions;

var onlyHashMerkle = cfg.ipfs.onlyHash.merkleTree;
var onlyHashIndex = cfg.ipfs.onlyHash.index;
var onlyHashIndexToIndex = cfg.ipfs.onlyHash.indextoindex;

class Stats {
	analysis = {};
	progresscount;
	ai;
	af;

	constructor(){
		this.ai =0;
	}

	resetStatsData() {
		if (this.analysis[this.af] == undefined) this.analysis[this.af] = new Array();
		this.ai = this.analysis[this.af].length;
		this.analysis[this.af][this.ai] = {};
		this.analysis[this.af][this.ai].type = indexType;
		this.analysis[this.af][this.ai].lsd = lsds;
		this.analysis[this.af][this.ai].divisor = divisor;
		this.analysis[this.af][this.ai].files = {};
		this.analysis[this.af][this.ai].files.indextoindex = {};
		this.analysis[this.af][this.ai].files.index = new Array();
	}

	setHashAndTimeInStatsData(hash, starttime) {
		this.analysis[this.af][this.ai].files.indextoindex.ipfshash = hash;
		this.analysis[this.af][this.ai].files.indextoindex.IPFSWriteTime = microtime.now() - starttime;
	}

	setCurrentDataInStats(file) {
		this.analysis[this.af][this.ai].files.index[this.progresscount] = {};
		this.analysis[this.af][this.ai].files.index[this.progresscount].sourceFile = sortedpath + file;
		this.analysis[this.af][this.ai].files.index[this.progresscount].merkleTree = {};
		this.analysis[this.af][this.ai].files.index[this.progresscount].IPFSIndex = {};
	}

	setDataInStatsArrays(starttime, linecount) {
		this.analysis[this.af][this.ai].files.index[this.progresscount].merkleTree.leafArrayReadTime = microtime.now() - starttime;
		this.analysis[this.af][this.ai].files.index[this.progresscount].count = linecount;
	}

}


function processAllData() {
	var stats = new Stats();

	if (dataLoopCount == cfg.data.length) {
		console.log("FINISHED");

		var analysisJson = stringify(stats.analysis, {space: 4});
		fs.writeFile (folderpath + "sorted/merkle.json", analysisJson, function(err) {
			if (err) throw err;
				//
				process.exit();
			}
		);			
		
	} else {
		//console.log(cfg.data[i]);
		count = 0;
		stats.progresscount = 0;
		sortedpath = folderpath + "sorted/";
		ipfsfilepath = folderpath + "foripfs/";
		fileArray = new Array();
		processdata = {};
		processdata.treesandindexes = new Array();
		rdfdatafile = cfg.data[dataLoopCount].datafile;
		indexType = cfg.data[dataLoopCount].indexType;
		lsds = cfg.data[dataLoopCount].lsd;
		divisor = cfg.data[dataLoopCount].divisor;
		setUpFolderPaths(stats);
	}
}

function setUpFolderPaths(stats) {
	res = rdfdatafile.split(".");
	res.pop();
	var folder = res.join(".");
	stats.af = folder;
	console.log(folder);
	sortedpath = sortedpath + folder + "/";
	parentdatafolder = sortedpath;
	stats.resetStatsData();

	sortedpath = sortedpath + indexType + "_" + lsds + "_" + divisor + "/";
	mkDirIfNotPresent(sortedpath);

	ipfsfilepath = ipfsfilepath + folder + "/";
	parentipfsdatafolder = ipfsfilepath;
	mkDirIfNotPresent(ipfsfilepath);

	ipfsfilepath = ipfsfilepath + indexType + "_" + lsds + "_" + divisor + "/";

	deleteFolderRecursive(ipfsfilepath);
	mkDirIfNotPresent(ipfsfilepath);

	fs.readdir(sortedpath, function (err, files) {
		//console.log(files);
		//handling error
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}

		files.forEach(function (file) {
			res = file.split(".");
			//console.log(res[0]);
			if (res[0] != "") {
				fileArray[fileArray.length] = file;
			}
		});
		count = fileArray.length;
		//console.log(count + " " + sortedpath);
		processfiles(stats);
	});
}


function mkDirIfNotPresent(folders) {
	if (!fs.existsSync(folders)) {
		fs.mkdirSync(folders, {recursive: true});
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

function processfiles(stats) {
	if (stats.progresscount === count) {
		var indextoindex = createIndexToIndex();
		path = ipfsfilepath + "indextoindex.json";
		fs.writeFileSync(path, stringify(indextoindex, {space: 4}));

		var starttime = microtime.now();

		function handler(hash) {
			ipfsHandler(hash, starttime, stats);
		}
		pluggable.getFileHash(path, onlyHashIndexToIndex, handler);
	} else {
		start(fileArray[stats.progresscount], stats);
	}
}

function createIndexToIndex() {
	var indextoindex = {}
	for (i = 0; i < processdata.treesandindexes.length; i++) {
		indextoindex["" + processdata.treesandindexes[i].indexIndex] = processdata.treesandindexes[i].indexipfs;
	}
	return indextoindex;
}

function ipfsHandler(hash, starttime, stats) {
	//console.log("HASH = " + hash);
	stats.setHashAndTimeInStatsData(hash, starttime);
	processdata.ipfsindextoindex = hash;

	function innerhandler(output) {
		ipfsStatsHandler(output, hash, stats);
	}

	fileStatsIPFS(hash, onlyHashIndexToIndex, innerhandler);
}

function start(file, stats) {
	stats.setCurrentDataInStats(file);
	ipfshashtree = "";
	ipfsindex = "";
	merkleroot = "";
	jsonhasharray = new Array();

	countLinesInFile(sortedpath + file, (error, numberOfLines) => {
		dat = {};
		dat.total = numberOfLines;
		dat.target = Math.ceil(Math.log(dat.total)/Math.log(2));
		dat.extras = Math.pow(2, dat.target) - dat.total;
		dat.file = file;
		res = file.split(".");
		res.pop();
		dat.indexIndex = res.join(".");

		dat.jsonhasharray = new Array();
		dat.merkleroot = "";
		//console.log(file + " " + dat.total);
		//console.log(dat.extras);
		//console.log(dat.file);
		readthelines (dat, stats);
	});
}

function ipfsStatsHandler(output, hash, stats) {
	//console.log(output);
	stats.analysis[stats.af][stats.ai].files.indextoindex.filesize = output.cumulativeSize;

	cfg.data[dataLoopCount].indextoindex = hash;
	cfg.data[dataLoopCount].treesandindexes = processdata.treesandindexes.length;

	var json = "cfg = " + stringify(cfg, {space: 4});
	fs.writeFile("./config.js", json, function (err) {
			if (err) throw err;
			console.log('config.js data updated');
			dataLoopCount += 1;
			processAllData();
		}
	);
}

async function fileStatsIPFS(hash, hashonly, returnhandler) {
	if(hashonly) {
		stats = {"cumulativeSize": 0};
		returnhandler(stats);
	} else {
		try {
			stats = await ipfs.files.stat("/ipfs/" + hash);
			returnhandler(stats);
		} catch (e) {
			console.log(e);
		}
	}
}

function  readthelines (dat, stats) {
	var starttime = microtime.now();
	//console.log(sortedpath + dat.file);
	rd = readline(sortedpath + dat.file);
	rd.on('line', function ( data, linecount) {
			readRow(data, dat, linecount, starttime, stats);
		}
	);
}

function readRow(data, dat, linecount, starttime, stats) {
	if (linecount == dat.total) {
		if (data.trim() != "") {
			if (linecount % 10000 == 0) console.log(linecount);
			dat.jsonhasharray[linecount - 1] = data;
		}
		//console.log("File " + dat.file + " read finished");
		//addExtraLeafs(dat);
		stats.setDataInStatsArrays(starttime, linecount);
		makeTree(dat, stats);
	} else {
		//if (linecount % 10000 == 0) console.log(linecount);
		dat.jsonhasharray[linecount - 1] = data;
	}
}

function makeTree(dat, stats) {
	var starttime = microtime.now();
	//console.log(microtime.now());
	var merkleTools = new MerkleTools(treeOptions);
	merkleTools.addLeaves(dat.jsonhasharray, false);
	merkleTools.makeTree();
	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].merkleTree.treeCreationTime = microtime.now() - starttime;
	var rootbuffer = merkleTools.getMerkleRoot();
	dat.merkleroot = rootbuffer.toString('hex');
	//console.log(dat.merkleroot);
	//console.log("Tree Made");
	generateipfs(dat, merkleTools, stats );
}

function generateipfs(dat, merkleTools, stats) {
	var starttime = microtime.now();
	const {tree, str} = generateTreeJson(merkleTools, dat);

	res = dat.file.split(".");
	path = ipfsfilepath + res[0] + ".json";

	fs.writeFileSync(path, str);

	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].merkleTree.treeJSONFileCreation = microtime.now() - starttime;
	starttime = microtime.now();


	function handler1(hash) {
		//console.log("HASH = " + hash);

		stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].merkleTree.treeIPFSWriteTime = microtime.now() - starttime;
		stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].merkleTree.IPFSHash = hash;

		function innerhandler1(output) {
			starttime = indexHandler(output, starttime, dat, hash, tree, stats);
		}
		fileStatsIPFS(hash, onlyHashMerkle, innerhandler1);
	}
	pluggable.getFileHash(path, onlyHashMerkle, handler1);

}

function generateTreeJson(merkleTools, dat) {
	tree = merkleTools.getMerkleTree();
	//console.log("tree leaves length = " + tree.leaves.length);
	for (var x = 0; x < tree.levels.length; x++) {
		//console.log("level " + x + "  = " + tree.levels[x].length);
		for (var y = 0; y < tree.levels[x].length; y++) {
			tree.levels[x][y] = tree.levels[x][y].toString('hex');
		}
	}

	out = {};
	out.merkletree = tree.levels;
	//out.merkleleaves = tree.leaves;
	str = stringify(out);
	return {tree, str};
}


function indexHandler(output, starttime, dat, hash, tree, stats) {
	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].merkleTree.filesize = output.cumulativeSize;
	//stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].merkleTree.size = stats.size;
	starttime = microtime.now();
	dat.ipfshashtree = hash;
	var index = createIndex(dat, tree);
	path = ipfsfilepath + res[0] + "_index.json";
	//console.log(path);
	fs.writeFileSync(path, stringify(index));

	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].IPFSIndex.indexJSONFileCreation = microtime.now() - starttime;
	starttime = microtime.now();

	//console.log(ipfsfilepath + res[0] + "_index.json");

	function handler2(hash) {
		//console.log("HASH = " + hash);
		fileProcessingStatsHandler(starttime, hash, dat, stats);
	}

	pluggable.getFileHash(path, onlyHashMerkle, handler2);
	return starttime;
}

function createIndex(dat, tree) {
	var index = {};
	index.merkleipfs = dat.ipfshashtree;
	index.merkleroot = dat.merkleroot;
	var leaveslevel = tree.levels.length - 1;
	index.data = {};
	for (var x = 0; x < dat.total; x++) {
		index.data[tree.levels[leaveslevel][x]] = x;
	}
	return index;
}


function fileProcessingStatsHandler(starttime, hash, dat, stats) {
	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].IPFSIndex.treeIPFSWriteTime = microtime.now() - starttime;
	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].IPFSIndex.IPFSHash = hash;

	function innerhandler2(output) {
		fileProcessingHandler(output, dat, hash, stats);
	}

	fileStatsIPFS(hash, onlyHashIndex, innerhandler2);
}

function fileProcessingHandler(output, dat, hash, stats) {
	stats.analysis[stats.af][stats.ai].files.index[stats.progresscount].IPFSIndex.filesize = output.cumulativeSize;
	//analysis[stats.af][stats.ai].files.index[stats.progresscount].IPFSIndex.size = stats.size;
	dat.ipfsindex = hash;
	//console.log(result);
	dat.enc = getBytes32FromIpfsHash(dat.ipfsindex);
	ind = processdata.treesandindexes.length;
	processdata.treesandindexes[ind] = {};
	processdata.treesandindexes[ind].treeipfs = dat.ipfshashtree;
	processdata.treesandindexes[ind].indexipfs = dat.ipfsindex;
	processdata.treesandindexes[ind].indexipfsbytes32 = dat.enc;
	processdata.treesandindexes[ind].file = dat.file;
	processdata.treesandindexes[ind].indexIndex = dat.indexIndex;
	stats.progresscount++;
	processfiles(stats);
}

function getBytes32FromIpfsHash(ipfsListing) {
	return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex');
}

// Return base58 encoded ipfs hash from bytes32 hex string,
// E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
// --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"

function getIpfsHashFromBytes32(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes);
  return hashStr;
}

function writejsons(hash, proof, loopcount) {
	var json = {};
	json.root = merkleroot;
	json.proof = proof;
	str = stringify(json);
	fs.writeFile(folderpath + "/jsons/" + hash + ".json", str, function(err) {
		if (err) throw err;
		loopcount++;
		generateProofs(loopcount);
	});
}

processAllData();