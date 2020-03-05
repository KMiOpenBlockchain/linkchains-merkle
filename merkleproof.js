const web3_extended = require('web3_ipc');
const bs58 = require('bs58');
var request = require('request');
var keccak256 = require('js-sha3').keccak_256;
var MerkleTools = require('merkle-tools');
//const Web3 = require('web3');


require("PATH_TO/IPFSMerkleProof.js");

var treeOptions = {
	hashType: 'KECCAK256' // optional, defaults to 'sha256'
}
var merkleTools = new MerkleTools(treeOptions);

var data = require("./dataset/sampledata.json");
var numberToProcess = data.treesandindexes.length;

var data = {"treeipfs":"TREE_IPFS","indexipfs":"INDEX_IPFS","indexipfsbytes32":"INDEX_IPFS_BYTES32","file":"100.txt","indexIndex":"100"};

var ipfsprotocol = "http";
var ipfshost = "IPFS_NODE";
var ipfsport = "IPFS_PORT";
var ipfspath = ipfsprotocol + "://" + ipfshost + ":" + ipfsport + "/ipfs/";
var treeurl = ipfspath + data.treeipfs;

var proof = {};


request.get({
	url: treeurl,
	json: true,
	headers: {'User-Agent': 'request'}
}, (err, res, tree) => {
	if (err) {
		console.log('Error:', err);
	} else if (res.statusCode !== 200) {
		console.log('Status:', res.statusCode);
	} else {
		processTree(tree.merkletree, data.indexIndex);
	}
});

function processTree(tree, leaf) {
	var levels = tree.length;
	//console.log(levels);
	var runningindex = 1*leaf;
	proof.merkleRoot = tree[0][0];
	proof.targetHash = tree[levels - 1][leaf];
	proof.proof = new Array();
	
	
	for (i = levels - 1; i > 0; i--) {
		proof.proof[levels - 1 - i] = {};
		side = runningindex % 2 == 0 ? "right" : "left";
		sign = runningindex % 2 == 0 ? 1 : -1;
		//console.log(runningindex);
		proof.proof[levels - 1 - i][side] = tree[i][runningindex + sign];
		
		console.log("actual = " + tree[i][runningindex]);
		if (sign == 1) {
			leftbuf = Buffer.from(tree[i][runningindex], 'hex');
			rightbuf = Buffer.from(tree[i][runningindex + sign], 'hex');
		} else {
			leftbuf = Buffer.from(tree[i][runningindex + sign], 'hex');
			rightbuf = Buffer.from(tree[i][runningindex], 'hex');
		}
		
		bufconcat = Buffer.concat([leftbuf, rightbuf]);
		//console.log(bufconcat.toString('hex'));
		hash = keccak256(bufconcat);
		console.log("calculated next = " +hash);	
		
			
		runningindex = Math.floor(runningindex / 2);
		//console.log("i - 1 = " + (i - 1) + " | runningindex = " + runningindex);	
		//console.log("Next = " + tree[i-1][runningindex]);	
	}
	console.log(JSON.stringify(proof));
	var isValid = merkleTools.validateProof(proof.proof, proof.targetHash, proof.merkleRoot);
	console.log (isValid);
}


