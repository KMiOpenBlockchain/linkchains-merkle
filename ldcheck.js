require("./config.js");
var fs = require('fs');
const got = require('got');
//var keccak256 = require('js-sha3').keccak_256;
const hashingFunctions = require('./hashing');
var MerkleTools = require('merkle-tools');
var microtime = require('microtime');
const N3 = require('n3');
const parser = new N3.Parser();

//var cfgstr = fs.readFileSync('config.js', 'utf-8'); 
//var cfg = JSON.parse(cfgstr);
//console.log(cfgstr);

/*
const parser = new N3.Parser({
 format: 'N-Triples'
});
*/

var settings = {
	"blockchainaddress": "BLOCKCHAIN_ADDRESS",
	"apiurl": "http://API_HOST:API_PORT/",
	"IPFSurl": "http://IPFS_NODE:IPFS_PORT/ipfs",
    "treeHash": {
        "type": "KECCAK256" //value supported by the merkle-tools node module
    },
    "pluggableFunctions": {
        "getTree": getTree, // alternative getTreeDynamic
        "getIndex": getIndex,
        "getIndextoIndex": getIndextoIndex,
        "quadHash": {
        	"thefunction": hashingFunctions.getHash,
        	"parameters": {
        		"type": "KECCAK256"
        	}
        }
    },
	"contractabi": [{"constant":true,"inputs":[],"name":"leastSignificantDigits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"divisor","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"theCreationTime","type":"uint256"},{"name":"theOwner","type":"address"},{"name":"theIPFSAddress","type":"string"},{"name":"theIndexType","type":"string"},{"name":"leastSignificants","type":"uint256"},{"name":"theDivisor","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IPFSAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"indexType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"IPFSAddr","type":"string"},{"name":"newIndexType","type":"string"},{"name":"lsds","type":"uint256"},{"name":"div","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
};


//var triples = ['<http://dbpedia.org/resource/Geng_Xiaofeng__1>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Genevieve_Blatt__1>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Genevieve_Blatt__2>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Geng_Xiaofeng__4>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Geng_Xiaofeng__5>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .'];
var triples = ['<http://dbpedia.org/resource/Geert_Brusselers__9>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .'];




var treeOptions = {
	hashType: settings.treeHash.type // optional, defaults to 'sha256'
}

var divisor;
var lsds;
var pluggable = settings.pluggableFunctions;

function getData(settings, triples, handler) {
	post_contractdata = {};
	post_contractdata.blockchainaddress = settings.blockchainaddress;
	post_contractdata.contractabi = settings.contractabi;

	const postcustom = got.extend({
		responseType: 'json',
		headers: {'User-Agent': 'request'}
	});

	(async () => {
		try {
	    	const response = await postcustom.post(settings.apiurl, {json: post_contractdata});
			//console.log(response.body);
			
			pluggable.getIndextoIndex(response.body, settings, triples, handler);

		} catch (error) {
			console.log(error);
		}
	})();
}

var getProofsHandler = function(data) {
	console.log(data);
	//process.exit();
};

getData(settings, triples, getProofsHandler);

function getIndextoIndex(contractdata, settings, triples, handler) {
	const custom = got.extend({
	    prefixUrl: settings.IPFSurl,
	    responseType: 'json',
		headers: {'User-Agent': 'request'}
	});

	(async () => {
		try {
	    	const response = await custom(contractdata.IPFSindextoindex);
	    	//console.log(response);
	    	if (response.statusCode !== 200) {
				console.log('Status:', response.statusCode);
			} else {
				sortTriples(contractdata, response.body, settings, triples, handler);
			}
			//console.log(response.body);
		} catch (error) {
			console.log(error);
		}
	})();
}

function sortTriples(contractdata, indextoindex, settings, triples, handler) {
		theIndexType = contractdata.theIndexType;
		lsds = contractdata.leastSignificants;
		divisor = contractdata.theDivisor; 
		divisorInt = BigInt(divisor);
		var sortedTriples = {};
		for (i = 0; i < triples.length; i++) {
			var parsedTriple = parser.parse(triples[i]);
			hash = hashQuads(parsedTriple[0], theIndexType);
			//hash = keccak256(triples[i]);
			
			
			triplejson = {};
			triplejson.triple = triples[i];
			triplejson.hash = hash[0];
			triplejson.quadhash = hash[1];
			triplejson.indexType = theIndexType;
			lastdigits = hash[0].substr(hash[0].length - lsds);
			decimalInt = BigInt("0x" + lastdigits);
			index = decimalInt/divisorInt;			
			
			if (sortedTriples[index.toString()] == undefined) sortedTriples[index.toString()] = new Array();
			sortedTriples[index.toString()].push(triplejson);
		}
		//console.log(sortedTriples);
		var processing = {}
		processing.owner = contractdata.owner;
		processing.created = contractdata.created;
		processing.runningcount = 0;
		loopThroughTriples(processing, indextoindex, settings, sortedTriples, handler);
}


function loopThroughTriples(processing, indextoindex, settings, sortedTriples, handler) {
	//console.log(Object.keys(sortedTriples).length);
	if (processing.runningcount == Object.keys(sortedTriples).length) {
		var output = {};
		output.blockchainaddress = settings.blockchainaddress;
		output.owner = processing.owner;
		output.created = processing.created;
		output.tripledata = new Array();
		for (entry in sortedTriples) {
			//console.log(entry);
			for (var i = 0; i < sortedTriples[entry].length; i++) {
				output.tripledata.push(sortedTriples[entry][i]);
			}
		}		
		
		//console.log(sortedTriples);
		handler(output);
		//END GAME
	
	} else {
		processing.id = Object.keys(sortedTriples)[processing.runningcount];
		//console.log(indextoindex);

		function getIndexHandler(updatedprocessing) {
			processing = updatedprocessing;
			pluggable.getTree(processing, indextoindex, settings, sortedTriples, handler);
		}

		pluggable.getIndex(processing, indextoindex[processing.id], getIndexHandler);
	}
}

function getIndex(processing, indexid, returnhandler){
	processing.IPFSindex = indexid;
	const custom = got.extend({
	    prefixUrl: settings.IPFSurl,
	    responseType: 'json',
		headers: {'User-Agent': 'request'}
	});

	(async () => {
		try {
	    	const response = await custom(processing.IPFSindex);
	    	if (response.statusCode !== 200) {
				console.log('Status:', response.statusCode);
			} else {
				processing.IPFSindexJson = response.body;
				//console.log(processing.IPFSindexJson);
				returnhandler(processing);
			}
			//console.log(response.body);
		} catch (error) {
			console.log(error);
		}
	})();
}

function getTreeDynamic(processing, indextoindex, settings, sortedTriples, handler) {
	var hashArray = new Array();
	for (var key in processing.IPFSindexJson.data) {
		hashArray.push(key.toString());
	}
	
	var merkleTools = new MerkleTools(treeOptions);
	merkleTools.addLeaves(hashArray, false);
	merkleTools.makeTree();
	var rootbuffer = merkleTools.getMerkleRoot();
	var merkleroot = rootbuffer.toString('hex');

	for (i = 0; i < sortedTriples[processing.id].length; i++) {	
		hash = triplejson.quadhash;
		processing.IPFSTree = merkleTools.getMerkleTree();
		console.log(hash);
		leaf = processing.IPFSindexJson.data[hash];
		var levels = processing.IPFSTree.levels.length;
		if (leaf == undefined) {
			//proof = {};
			//sortedTriples[processing.id][i].proof = proof;
			break;
		} else {
			var proof = {};
			proof.merkleRoot = merkleroot;
			proof.targetHash = hash;
			proof.proof= merkleTools.getProof(parseInt(leaf));
			sortedTriples[processing.id][i].proof = proof;
	
			//console.log(proof);
		}
	}
	processing.runningcount = processing.runningcount + 1;
	//console.log(proof);
	loopThroughTriples(processing, indextoindex, settings, sortedTriples, handler);
	
}

function getTree(processing, indextoindex, settings, sortedTriples, handler) {

	const custom = got.extend({
	    prefixUrl: settings.IPFSurl,
	    responseType: 'json',
		headers: {'User-Agent': 'request'}
	});

	(async () => {
		try {
	    	const response = await custom(processing.IPFSindexJson["merkleipfs"]);
	    	if (response.statusCode !== 200) {
				console.log('Status:', response.statusCode);
			} else {
				processing.IPFSTree = response.body;
				//console.log(processing.IPFSTree);
				getProofs(processing, indextoindex, settings, sortedTriples, handler);
			}
			//console.log(response.body);
		} catch (error) {
			console.log(error);
		}
	})();
}

function getProofs(processing, indextoindex, settings, sortedTriples, handler) {
	//console.log(processing);
	for (i = 0; i < sortedTriples[processing.id].length; i++) {
		triplejson = sortedTriples[processing.id][i];
		hash = triplejson.quadhash;
		//console.log(hash);
		//console.log(processing.IPFSindexJson.data);
		leaf = processing.IPFSindexJson.data[hash];
		//console.log(hash);
		//console.log(triplejson);
		var levels = processing.IPFSTree.merkletree.length;
		var runningindex = 1*leaf;
		if (leaf == undefined) {
			//proof = {};
			//sortedTriples[processing.id][i].proof = proof;
			break;
		}
		//console.log(leaf);
		var proof = {};
		proof.merkleRoot = processing.IPFSTree.merkletree[0][0];
		proof.targetHash = processing.IPFSTree.merkletree[levels - 1][leaf];
		proof.proof = new Array();
		
		//console.log(proof);
		
		var workingproof = new Array();
		var nexthash = "";
		for (j = levels - 1; j > 0; j--) {
			workingproof[levels - 1 - j] = {};
			if (runningindex === processing.IPFSTree.merkletree[j].length - 1 && processing.IPFSTree.merkletree[j].length % 2 === 1 ) {
				   runningindex = Math.floor(runningindex / 2)
				   continue
			}
			
			if (processing.IPFSTree.merkletree[j][runningindex] != nexthash && nexthash != ""){
				//proof = {};
				//sortedTriples[processing.id][i].proof = proof;
				break;
			}
			side = runningindex % 2 == 0 ? "right" : "left";
			sign = runningindex % 2 == 0 ? 1 : -1;
			workingproof[levels - 1 - j][side] = processing.IPFSTree.merkletree[j][runningindex + sign];
			if (sign == 1) {
				leftbuf = Buffer.from(processing.IPFSTree.merkletree[j][runningindex], 'hex');
				rightbuf = Buffer.from(processing.IPFSTree.merkletree[j][runningindex + sign], 'hex');
			} else {
				leftbuf = Buffer.from(processing.IPFSTree.merkletree[j][runningindex + sign], 'hex');
				rightbuf = Buffer.from(processing.IPFSTree.merkletree[j][runningindex], 'hex');
			}
		
			bufconcat = Buffer.concat([leftbuf, rightbuf]);
			//nexthash = keccak256(bufconcat);
			nexthash = pluggable.quadHash.thefunction(bufconcat, settings.treeHash);
			runningindex = Math.floor(runningindex / 2);
		}
		// should really use array push rather than creating a temporary workingproofs array									
		for (j = 0; j < workingproof.length; j++) {
			if (workingproof[j].left == undefined && workingproof[j].right == undefined) {
				//skip
			} else {
				proof.proof[proof.proof.length] = workingproof[j];
			}
		} 
		sortedTriples[processing.id][i].proof = proof;
		//console.log(processing.IPFSindexJson.data[hash]);
		//console.log(proof);
	}
	processing.runningcount = processing.runningcount + 1;
	//console.log(proof);
	loopThroughTriples(processing, indextoindex, settings, sortedTriples, handler);
}

function hashQuads(quad, indexType) {
	if (quad) {
		//console.log(JSON.stringify(quad));
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
		hash = new Array();
		hash[0] = "";
		hash[1] = quadhash;
		if (indexType == "uniform") {
			hash[0] = quadhash;
		} else if (indexType == "subject") {
			hash[0] = pluggable.quadHash.thefunction(subject, pluggable.quadHash.parameters);
		} else if (indexType == "predicate") {
			hash[0] = pluggable.quadHash.thefunction(predicate, pluggable.quadHash.parameters);
		} else if (indexType == "object") {
			hash[0] = pluggable.quadHash.thefunction(object, pluggable.quadHash.parameters);
		} else if (indexType == "graph") {
			hash[0] = pluggable.quadHash.thefunction(graph, pluggable.quadHash.parameters);
		} else if (indexType == "subjectobject") {
			hash[0] = pluggable.quadHash.thefunction(subject + " " + object, pluggable.quadHash.parameters);
		}

		return hash;
	}
}
