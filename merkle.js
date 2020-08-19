require("./config.js");

var settings = {
    "pluggableFunctions": {
        "getFileHash": addFileToIPFS
    },
};

var MerkleTools = require('merkle-tools/merkletools');
var fs = require('fs');

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
		//console.log(JSON.stringify(analysis));
		

		var json = JSON.stringify(analysis, null, 4);
		fs.writeFile (folderpath + "sorted/merkle.json", json, function(err) {
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
processAllData();

function setUpFolderPaths() {
	res = rdfdatafile.split(".");
	res.pop();
	var folder = res.join(".");
	af = folder;
	console.log(folder);
	sortedpath = sortedpath + folder + "/";
	parentdatafolder = sortedpath;
	
	if (analysis[af] == undefined) analysis[af] = new Array();
	ai = analysis[af].length;
	analysis[af][ai] = {};
	analysis[af][ai].type = indexType;
	analysis[af][ai].lsd = lsds;
	analysis[af][ai].divisor = divisor;
	analysis[af][ai].files = {};
	analysis[af][ai].files.indextoindex = {};
	analysis[af][ai].files.index = new Array();
	
	sortedpath = sortedpath + indexType + "_" + lsds + "_" + divisor + "/";

	if (!fs.existsSync(sortedpath)){
		fs.mkdirSync(sortedpath, {recursive:true});
	}
	
	ipfsfilepath = ipfsfilepath + folder + "/";
	parentipfsdatafolder = ipfsfilepath;
	if (!fs.existsSync(ipfsfilepath)){
		fs.mkdirSync(ipfsfilepath, {recursive:true});
	}
	ipfsfilepath = ipfsfilepath + indexType + "_" + lsds + "_" + divisor + "/";
	
	deleteFolderRecursive(ipfsfilepath);
	if (!fs.existsSync(ipfsfilepath)){
		fs.mkdirSync(ipfsfilepath, {recursive:true});
	}
	
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




/*
ipfs.pin.rm(hash, function (err, pinset) {
  if (err) {
    throw err
  }
  console.log(pinset) prints the hashes that were unpinned
})
*/




function processfiles() {
	if (progresscount == count) {
		var indextoindex = {}
		for (i = 0; i < processdata.treesandindexes.length; i++) {
			indextoindex["" + processdata.treesandindexes[i].indexIndex] = processdata.treesandindexes[i].indexipfs;
		}
		path = ipfsfilepath + "indextoindex.json";
		fs.writeFileSync(path, JSON.stringify(indextoindex));
		//console.log(indextoindex);
		
		var starttime = microtime.now();


		function handler(hash) {
			//console.log("HASH = " + hash);
			analysis[af][ai].files.indextoindex.ipfshash = hash;
			analysis[af][ai].files.indextoindex.IPFSWriteTime = microtime.now() - starttime;
			processdata.ipfsindextoindex = hash;

			function innerhandler(output) {
				//console.log(output);
				analysis[af][ai].files.indextoindex.filesize = output.cumulativeSize;

				/*
				fs.writeFile(ipfsfilepath + "sampledata.json", JSON.stringify(processdata), function(err) {
					if (err) throw err;
					console.log("FINISHED " + rdfdatafile + " " + indexType);
					dataLoopCount += 1;
					processAllData();
				});
				*/
				cfg.data[dataLoopCount].indextoindex = hash;
				cfg.data[dataLoopCount].treesandindexes = processdata.treesandindexes.length;
				
				var json = "cfg = " + JSON.stringify(cfg, null, 4);
				fs.writeFile ("./config.js", json, function(err) {
					if (err) throw err;
						console.log('config,js data updated');
						dataLoopCount += 1;
						processAllData();
					}
				);	
				
			}
			fileStatsIPFS(hash, onlyHashIndexToIndex, innerhandler);
		}
		pluggable.getFileHash(path, onlyHashIndexToIndex, handler);
	} else {
		start(fileArray[progresscount]);
	}
}






function start(file) {
	analysis[af][ai].files.index[progresscount] = {};
	analysis[af][ai].files.index[progresscount].sourceFile = sortedpath + file;
	analysis[af][ai].files.index[progresscount].merkleTree = {};
	analysis[af][ai].files.index[progresscount].IPFSIndex = {};
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

		analysis[af][ai].files.index[progresscount].merkleTree.leafArrayReadTime = microtime.now() - starttime;
		analysis[af][ai].files.index[progresscount].count = linecount;
		makeTree(dat);
	} else {
		//if (linecount % 10000 == 0) console.log(linecount);
		dat.jsonhasharray[linecount - 1] = data;
	}
}

/*
function addExtraLeafs(dat) {
	var offset = dat.jsonhasharray.length;
	//console.log("Start Array Length " + dat.jsonhasharray.length);
	for (i = 0; i < dat.extras; i++) {
		dat.jsonhasharray[i + offset] = randomHash;
	}
	//console.log("Final Array Length " + dat.jsonhasharray.length);
	makeTree(dat);
}
*/

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
	tree = merkleTools.getMerkleTree();
	//console.log("tree leaves length = " + tree.leaves.length);
	for (var x = 0; x < tree.levels.length; x++) {
		//console.log("level " + x + "  = " + tree.levels[x].length);
		for (var y = 0; y < tree.levels[x].length; y++) {
			tree.levels[x][y] = tree.levels[x][y].toString('hex');
		}   	
	}
	
    res = dat.file.split(".");
	out = {};
	out.merkletree = tree.levels;
	//out.merkleleaves = tree.leaves;
	str = JSON.stringify(out);
	path = ipfsfilepath + res[0] + ".json";
	fs.writeFileSync(path, str);
	
	analysis[af][ai].files.index[progresscount].merkleTree.treeJSONFileCreation = microtime.now() - starttime;
	starttime = microtime.now();


	function handler1(hash) {
		//console.log("HASH = " + hash);

		analysis[af][ai].files.index[progresscount].merkleTree.treeIPFSWriteTime = microtime.now() - starttime;
		analysis[af][ai].files.index[progresscount].merkleTree.IPFSHash = hash;

		function innerhandler1(output) {
			analysis[af][ai].files.index[progresscount].merkleTree.filesize = output.cumulativeSize;
			//analysis[af][ai].files.index[progresscount].merkleTree.size = stats.size;
			starttime = microtime.now();
			dat.ipfshashtree = hash;
			index = {};
			index.merkleipfs = dat.ipfshashtree;
			index.merkleroot = dat.merkleroot;
			leaveslevel = tree.levels.length - 1;
			index.data = {};
			for (var x = 0; x < dat.total; x++) {
				index.data[tree.levels[leaveslevel][x]] = x;
			}
			path = ipfsfilepath + res[0] + "_index.json";
			//console.log(path);
			fs.writeFileSync(path, JSON.stringify(index));	
			
			analysis[af][ai].files.index[progresscount].IPFSIndex.indexJSONFileCreation = microtime.now() - starttime;
			starttime = microtime.now();
			
			//console.log(ipfsfilepath + res[0] + "_index.json");

			function handler2(hash) {
				//console.log("HASH = " + hash);
				analysis[af][ai].files.index[progresscount].IPFSIndex.treeIPFSWriteTime = microtime.now() - starttime;
				analysis[af][ai].files.index[progresscount].IPFSIndex.IPFSHash = hash;

				function innerhandler2(output) {
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
				fileStatsIPFS(hash, onlyHashIndex, innerhandler2);
			}
			pluggable.getFileHash(path, onlyHashMerkle, handler2);
		}
		fileStatsIPFS(hash, onlyHashMerkle, innerhandler1);
	}
	pluggable.getFileHash(path, onlyHashMerkle, handler1);

}

async function addFileToIPFS(file, hashonly, returnhandler) {
	for await (const result of ipfs.add(globSource(file), { onlyHash: hashonly })) {
		hash = bs58.encode(result.cid.multihash);
		returnhandler(hash);
	}
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
	str = JSON.stringify(json);
	fs.writeFile(folderpath + "/jsons/" + hash + ".json", str, function(err) {
		if (err) throw err;
		loopcount++;
		generateProofs(loopcount);
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

/*

var merkleBatchSize = 32;

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var i;
var jsonhasharray = new Array();
var proofs = new Array();
var ids = new Array();
var treeOptions = {
	hashType: 'KECCAK256' // optional, defaults to 'sha256'
}
var merkleTools = new MerkleTools(treeOptions);

for (i = 0; i < merkleBatchSize; i++) {
	randomString = makeid();
	randomString = "hello";
	randomHash = web3.utils.sha3(randomString);  // web3 keccak256
	jsonhasharray[i] = randomHash;
}
console.log(jsonhasharray);
merkleTools.addLeaves(jsonhasharray, false);
merkleTools.makeTree();
var rootbuffer = merkleTools.getMerkleRoot();
var merkleroot = rootbuffer.toString('hex');
for (i = 0; i < merkleBatchSize; i++) {
	proofs[i] = merkleTools.getProof(i);
	//console.log(i + " " + proofs[i].length);
	console.log(merkleTools.getProof(i))
}

// generating the parent hash demo where both child hashes are the same 
var x= web3.utils.sha3("hello");  // web3 keccak256
console.log(x);
var leftbuf = Buffer.from(x, 'hex');
var rightbuf = Buffer.from(x, 'hex');
var bufconcat = Buffer.concat([leftbuf, rightbuf]);
//console.log(bufconcat.toString('hex'));
var hash = keccak256(bufconcat);
console.log(hash);

bufconcat = Buffer.from(x + x, 'hex');
hash = keccak256(bufconcat);
console.log(hash);

// in other words the hashes up the tree are the hashes of Buffers of the concatenated values, and not just a hash of the concatenated strings

//console.log(z);

var isValid = merkleTools.validateProof(proofs[0], '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8', merkleroot);
console.log (isValid);

merkleTools.resetTree();
*/