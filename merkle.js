const MerkleTools = require('merkle-tools/merkletools');
const stringify = require('json-stable-stringify');

const hashingFunctions = require('./hashing');

const DEFAULT_LSD = 64;
const DEFAULT_INDEXTYPE = 'subject';
const DEFAULT_DIVISOR = 0x1;
const DEFAULT_HASH_ALG = 'KECCAK-256';
const DEFAULT_JSONLD_CONTEXT = {
	"@vocab": "https://blockchain.open.ac.uk/vocab/"
};

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
			leafhashalg : this.config.quadHash,
			"leaves": {
				"@list": leaves
			}
		};
	}

	toObject() {
		var treeObj = {};
		treeObj.merkletreeid = this.indexNo;
		treeObj.treehashalg = this.config.treeHash;
		treeObj.merkleroot = this.merkleroot;
		treeObj.merkleleaves = this.tree.leaves;
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
		this.config.quadHash = options.quadHash ? options.quadHash : DEFAULT_HASH_ALG;
		this.config.treeHash = options.treeHash ? options.treeHash : DEFAULT_HASH_ALG;
		this.config.indexHash = options.indexHash ? options.indexHash : DEFAULT_HASH_ALG;
		var quadHashFunction = async function (input) {
			return hashingFunctions.getHash(input, {
				"type": this.config.quadHash
			});
		};
		var treeHashFunction = async function (input) {
			return hashingFunctions.getHash(input, {
				"type": this.config.treeHash
			});
		};
		var indexHashFunction = async function (input) {
			return hashingFunctions.getHash(input, {
				"type": options.indexHash ? options.indexHash : DEFAULT_HASH_ALG
			});
		};
		utils = {
			quadHash: quadHashFunction,
			treeHash: treeHashFunction,
			indexHash: indexHashFunction
		}
		this.config.lsd = options.lsd ? options.lsd : DEFAULT_LSD;
		this.config.indexType = options.indexType ? options.indexType : DEFAULT_INDEXTYPE;
		this.config.divisor = options.divisor ? options.divisor : DEFAULT_DIVISOR;
		this.config.jsonldcontext = options.jsonldcontext ? options.jsonldcontext : DEFAULT_JSONLD_CONTEXT;
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
		var results = {
			"@context" : this.config.jsonldcontext
		};
		results.merkletrees = {};
		results.merkletrees.indexhash = this.indexToIndexHash;
		results.merkletrees.indexhashalg = this.config.indexHash;
		results.merkletrees.treesettings = this.config;
		delete results.merkletrees.treesettings.jsonldcontext;
		var treeList = [];
		for (var i = 0; i < this.treeInfoArray.length; i++) {
			treeList.push(this.treeInfoArray[i].toObject());
		}
		results.merkletrees.trees = {
			"@list" : treeList
		};
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
	tree.indexNo = hashset[0];

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

	return tree;
}

function createIndexToIndex(state) {
	var indextoindex = [];
	for (var tree = 0; tree < state.treeInfoArray.length; tree++) {
		var entry = {};
		entry[state.treeInfoArray[tree].indexNo.toString()] = state.treeInfoArray[tree].merkleroot;
		indextoindex.push(entry);
	}
	return indextoindex;
}

async function hashListsToMerkleTrees(hashes, options) {
	var state = new State(options);

	state.storeHashes(hashes);
	await processHashsets(state);
	return state.toObject();
}


exports.hashListsToMerkleTrees = hashListsToMerkleTrees
