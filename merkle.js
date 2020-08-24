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
var progresscount;
var dataLoopCount = 0;
var processdata;
var fileArray;
var pluggable = settings.pluggableFunctions;

var analysis = {};
var ai = 0;
var af;

var onlyHashMerkle = cfg.ipfs.onlyHash.merkleTree;
var onlyHashIndex = cfg.ipfs.onlyHash.index;
var onlyHashIndexToIndex = cfg.ipfs.onlyHash.indextoindex;

function processAllData() {
	if (dataLoopCount == cfg.data.length) {
		console.log("FINISHED");

		var analysisJson = stringify(analysis, {space: 4});
		fs.writeFile (folderpath + "sorted/merkle.json", analysisJson, function(err) {
			if (err) throw err;
				//
				process.exit();
			}
		);			
		
	} else {
		//console.log(cfg.data[i]);
		count = 0;
		progresscount = 0;
		sortedpath = folderpath + "sorted/";
		ipfsfilepath = folderpath + "foripfs/";
		fileArray = new Array();
		processdata = {};
		processdata.treesandindexes = new Array();
		rdfdatafile = cfg.data[dataLoopCount].datafile;
		indexType = cfg.data[dataLoopCount].indexType;
		lsds = cfg.data[dataLoopCount].lsd;
		divisor = cfg.data[dataLoopCount].divisor;
		setUpFolderPaths();
	}
}

function setUpFolderPaths() {
	res = rdfdatafile.split(".");
	res.pop();
	var folder = res.join(".");
	af = folder;
	console.log(folder);
	sortedpath = sortedpath + folder + "/";
	parentdatafolder = sortedpath;
	resetStatsData();

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
		processfiles();
	});
}

function resetStatsData() {
	if (analysis[af] == undefined) analysis[af] = new Array();
	ai = analysis[af].length;
	analysis[af][ai] = {};
	analysis[af][ai].type = indexType;
	analysis[af][ai].lsd = lsds;
	analysis[af][ai].divisor = divisor;
	analysis[af][ai].files = {};
	analysis[af][ai].files.indextoindex = {};
	analysis[af][ai].files.index = new Array();
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

function processfiles() {
	if (progresscount == count) {
		var indextoindex = createIndexToIndex();
		path = ipfsfilepath + "indextoindex.json";
		fs.writeFileSync(path, stringify(indextoindex, {space: 4}));

		var starttime = microtime.now();

		function handler(hash) {
			ipfsHandler(hash, starttime);
		}
		pluggable.getFileHash(path, onlyHashIndexToIndex, handler);
	} else {
		start(fileArray[progresscount]);
	}
}

function createIndexToIndex() {
	var indextoindex = {}
	for (i = 0; i < processdata.treesandindexes.length; i++) {
		indextoindex["" + processdata.treesandindexes[i].indexIndex] = processdata.treesandindexes[i].indexipfs;
	}
	return indextoindex;
}

function ipfsHandler(hash, starttime) {
	//console.log("HASH = " + hash);
	setHashAndTimeInStatsData(hash, starttime);
	processdata.ipfsindextoindex = hash;

	function innerhandler(output) {
		ipfsStatsHandler(output, hash);
	}

	fileStatsIPFS(hash, onlyHashIndexToIndex, innerhandler);
}

function start(file) {
	setCurrentDataInStats(file);
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
		readthelines (dat);
	});
}

function setHashAndTimeInStatsData(hash, starttime) {
	analysis[af][ai].files.indextoindex.ipfshash = hash;
	analysis[af][ai].files.indextoindex.IPFSWriteTime = microtime.now() - starttime;
}

function ipfsStatsHandler(output, hash) {
	//console.log(output);
	analysis[af][ai].files.indextoindex.filesize = output.cumulativeSize;

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

function setCurrentDataInStats(file) {
	analysis[af][ai].files.index[progresscount] = {};
	analysis[af][ai].files.index[progresscount].sourceFile = sortedpath + file;
	analysis[af][ai].files.index[progresscount].merkleTree = {};
	analysis[af][ai].files.index[progresscount].IPFSIndex = {};
}

function  readthelines (dat) {
	var starttime = microtime.now();
	//console.log(sortedpath + dat.file);
	rd = readline(sortedpath + dat.file);
	rd.on('line', function ( data, linecount) {
			readRow(data, dat, linecount, starttime);
		}
	);
}

function readRow(data, dat, linecount, starttime) {
	if (linecount == dat.total) {
		if (data.trim() != "") {
			if (linecount % 10000 == 0) console.log(linecount);
			dat.jsonhasharray[linecount - 1] = data;
		}
		//console.log("File " + dat.file + " read finished");
		//addExtraLeafs(dat);
		setDataInStatsArrays(starttime, linecount);
		makeTree(dat);
	} else {
		//if (linecount % 10000 == 0) console.log(linecount);
		dat.jsonhasharray[linecount - 1] = data;
	}
}

function setDataInStatsArrays(starttime, linecount) {
	analysis[af][ai].files.index[progresscount].merkleTree.leafArrayReadTime = microtime.now() - starttime;
	analysis[af][ai].files.index[progresscount].count = linecount;
}

function makeTree(dat) {
	var starttime = microtime.now();
	//console.log(microtime.now());
	var merkleTools = new MerkleTools(treeOptions);
	merkleTools.addLeaves(dat.jsonhasharray, false);
	merkleTools.makeTree();
	analysis[af][ai].files.index[progresscount].merkleTree.treeCreationTime = microtime.now() - starttime;
	var rootbuffer = merkleTools.getMerkleRoot();
	dat.merkleroot = rootbuffer.toString('hex');
	//console.log(dat.merkleroot);
	//console.log("Tree Made");
	generateipfs(dat, merkleTools);
}

function generateipfs(dat, merkleTools) {
	var starttime = microtime.now();
	const {tree, str} = generateTreeJson(merkleTools, dat);

	res = dat.file.split(".");
	path = ipfsfilepath + res[0] + ".json";

	fs.writeFileSync(path, str);

	analysis[af][ai].files.index[progresscount].merkleTree.treeJSONFileCreation = microtime.now() - starttime;
	starttime = microtime.now();


	function handler1(hash) {
		//console.log("HASH = " + hash);

		analysis[af][ai].files.index[progresscount].merkleTree.treeIPFSWriteTime = microtime.now() - starttime;
		analysis[af][ai].files.index[progresscount].merkleTree.IPFSHash = hash;

		function innerhandler1(output) {
			starttime = indexHandler(output, starttime, dat, hash, tree);
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


function indexHandler(output, starttime, dat, hash, tree) {
	analysis[af][ai].files.index[progresscount].merkleTree.filesize = output.cumulativeSize;
	//analysis[af][ai].files.index[progresscount].merkleTree.size = stats.size;
	starttime = microtime.now();
	dat.ipfshashtree = hash;
	var index = createIndex(dat, tree);
	path = ipfsfilepath + res[0] + "_index.json";
	//console.log(path);
	fs.writeFileSync(path, stringify(index));

	analysis[af][ai].files.index[progresscount].IPFSIndex.indexJSONFileCreation = microtime.now() - starttime;
	starttime = microtime.now();

	//console.log(ipfsfilepath + res[0] + "_index.json");

	function handler2(hash) {
		//console.log("HASH = " + hash);
		fileProcessingStatsHandler(starttime, hash, dat);
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


function fileProcessingStatsHandler(starttime, hash, dat) {
	analysis[af][ai].files.index[progresscount].IPFSIndex.treeIPFSWriteTime = microtime.now() - starttime;
	analysis[af][ai].files.index[progresscount].IPFSIndex.IPFSHash = hash;

	function innerhandler2(output) {
		fileProcessingHandler(output, dat, hash);
	}

	fileStatsIPFS(hash, onlyHashIndex, innerhandler2);
}

function fileProcessingHandler(output, dat, hash) {
	analysis[af][ai].files.index[progresscount].IPFSIndex.filesize = output.cumulativeSize;
	//analysis[af][ai].files.index[progresscount].IPFSIndex.size = stats.size;
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
	progresscount++;
	processfiles();
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