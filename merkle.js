var MerkleTools = require('merkle-tools/merkletools');
var stringify = require('json-stable-stringify');

const hashingFunctions = require('./hashing');

var utils;

class TreeInfo {
	tree = {};
	config = {};

	constructor(state) {
		this.config = state.config;
	}

	addMerkleTree(passedTree) {
		this.tree.merkletree = passedTree;
	}

	getMerkleTree() {
		return this.tree.merkletree;
	}

	addLeaves(leaves) {
		this.tree.leaves = {
			"@list": leaves
		};
	}

	toObject() {
		var treeObj = {};
		treeObj.index = this.index;
		treeObj.containerhash = this.merkleipfs;
		treeObj.containerhashalg = this.config.indexHash;  
		treeObj.merkleroot = this.merkleroot;
		treeObj.leaves = this.tree.leaves;
		return treeObj;
	}
}

class State {
	config = {};
	loadedHashes = {};
	treeInfoArray = [];
	indexToIndex = {};
	indexToIndexHash = 0;
	onComplete = function () { };

	constructor(options) {
		this.readOptions(options);
	}

	readOptions(options) {
		var defaultHash = 'KECCAK-256';
		this.config.quadHash = options.quadHash ? options.quadHash : defaultHash;
		this.config.treeHash = options.treeHash ? options.treeHash : defaultHash;
		this.config.indexHash = options.indexHash ? options.indexHash : defaultHash;
		var quadHashFunction = async function(input) {
			return hashingFunctions.getHash(input, {
				"type": this.config.quadHash
			});
		};
		var treeHashFunction = async function(input) {
			return hashingFunctions.getHash(input, {
				"type": this.config.treeHash
			});
		};
		var indexHashFunction = async function(input) {
			return hashingFunctions.getHash(input, {
				"type": options.indexHash ? options.indexHash : defaultHash
			});
		};
		utils = {
			quadHash: quadHashFunction,
			treeHash: treeHashFunction,
			indexHash: indexHashFunction
		}
		this.config.lsd = options.lsd ? options.lsd : 64;
		this.config.indexType = options.indexType ? options.indexType : 'subject';
		this.config.divisor = options.divisor ? options.divisor : 0x1;
		this.config.jsonldcontext = options.jsonldcontext ? options.jsonldcontext : {
			"@vocab": "https://blockchain.open.ac.uk/vocab/",
			"index": "merkletreeid",
			"indexToTrees": "merkletrees",
			"leaf": "merkleleaf",
			"leaves": "merkleleaves",
			"root": "merklecontainerroot"
		};
	}

	storeHashes(data) {
		this.loadedHashes = data;
	}

	addTreeInfo(treeInfo) {
		this.treeInfoArray.push(treeInfo);
	}

	addIndexToIndex(indexToIndex) {
		this.indexToIndex = indexToIndex;
	}

	addIndexToIndexHash(hash) {
		this.indexToIndexHash = hash;
	}

	toObject() {
		var results = {};
		results["@context"] = this.config.jsonldcontext;
		results.indexToTrees = {};
		results.indexToTrees.indexhash = this.indexToIndexHash;
		results.indexToTrees.indexhashalg = this.config.indexHash; 
		results.indexToTrees.treesettings = this.config;
		delete results.indexToTrees.treesettings.jsonldcontext;
		results.indexToTrees.trees = [];
		for (var i = 0; i < this.treeInfoArray.length; i++) {
			results.indexToTrees.trees.push(this.treeInfoArray[i].toObject());
		}
		return results;
	}
}

async function processHashsets(state) {
	for (var currentHashset = 0; currentHashset < state.loadedHashes.length; currentHashset++) {
		var tree = await makeTree(state, state.loadedHashes[currentHashset]);
		state.addTreeInfo(tree);
	}

	var indextoindex = createIndexToIndex(state);
	state.addIndexToIndex(indextoindex);

	var indexToIndexHash = await utils.indexHash(JSON.stringify(indextoindex));
	
	state.addIndexToIndexHash(indexToIndexHash);
}


async function makeTree(state, hashset) {
	var tree = new TreeInfo(state);
	tree.treehashalg = state.config.treeHash;
	tree.index = hashset[0];

	var merkleTools = new MerkleTools({ hashType: tree.treehashalg });

	merkleTools.addLeaves(hashset[1], false);
	tree.addLeaves(hashset[1]);

	merkleTools.makeTree();

	var rootbuffer = merkleTools.getMerkleRoot();
	tree.merkleroot = rootbuffer.toString('hex');

	var merkleTree = merkleTools.getMerkleTree();
	for (var x = 0; x < merkleTree.levels.length; x++) {
		for (var y = 0; y < merkleTree.levels[x].length; y++) {
			merkleTree.levels[x][y] = merkleTree.levels[x][y].toString('hex');
		}
	}

	tree.addMerkleTree(merkleTree);

	var fullTreeHash = await utils.indexHash(JSON.stringify(merkleTree));
	tree.merkleipfs = fullTreeHash;
	var index = createIndex(tree, merkleTree);

	var indexHash = await utils.indexHash(JSON.stringify(index));
	tree.ipfsindex = indexHash;
	
	return tree;
}

function createIndex(tree) {
	var index = {};
	index.merkleipfs = tree.merkleipfs;
	index.merkleroot = tree.merkleroot;
	index.index = tree.index;
	var leaveslevel = tree.getMerkleTree().levels.length - 1;
	index.data = {};
	for (var x = 0; x < tree.getMerkleTree().leaves.length; x++) {
		index.data[tree.getMerkleTree().levels[leaveslevel][x]] = x;
	}
	return index;
}

function createIndexToIndex(state) {
	var indextoindex = {}
	for (var tree = 0; tree < state.treeInfoArray.length; tree++) {
		indextoindex["" + state.treeInfoArray[tree].index] = state.treeInfoArray[tree].ipfsindex;
	}
	return indextoindex;
}

async function processAllDataFromJson(hashes, options) {
	var state = new State(options);

	state.storeHashes(hashes);
	await processHashsets(state);

	return state.toObject();
}


exports.processAllDataFromJson = processAllDataFromJson
