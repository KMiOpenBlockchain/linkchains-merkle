var fs = require('fs');
const rp = require('request-promise-native');
var request = require('request');
var keccak256 = require('js-sha3').keccak_256;
var crypto = require('crypto');
var MerkleTools = require('merkle-tools');
const N3 = require('n3');
const parser = new N3.Parser();
var treeOptions = {
	hashType: 'KECCAK256' // optional, defaults to 'sha256'
}

/*
const parser = new N3.Parser({
 format: 'N-Triples'
});
*/


var settings = {
	"blockchainaddress": "BLOCKCHAIN_ADDRESS",
	"apiurl": "http://API_HOST:API_PORT/",
	"IPFSurl": "http://IPFS_NODE:IPFS_PORT/ipfs/",
	"contractabi": [{"constant":true,"inputs":[],"name":"leastSignificantDigits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"divisor","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"theCreationTime","type":"uint256"},{"name":"theOwner","type":"address"},{"name":"theIPFSAddress","type":"string"},{"name":"theIndexType","type":"string"},{"name":"leastSignificants","type":"uint256"},{"name":"theDivisor","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IPFSAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"indexType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"IPFSAddr","type":"string"},{"name":"newIndexType","type":"string"},{"name":"lsds","type":"uint256"},{"name":"div","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
};

//var triples = ['<http://dbpedia.org/resource/Geng_Xiaofeng__1>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Genevieve_Blatt__1>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Genevieve_Blatt__2>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Geng_Xiaofeng__4>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .', '<http://dbpedia.org/resource/Geng_Xiaofeng__5>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .'];
var triples = ['<http://dbpedia.org/resource/Geng_Xiaofeng__1>	<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>	<http://www.w3.org/2002/07/owl#Thing> <http://blockchain.kmi.open.ac.uk/dbpedia-20000> .'];

var divisor;
var lsds;
var indexesArray = new Array();
var hashArray = new Array();
var count = 0;
var start = 0;
var end = 0;

function getData(settings, triples) {
	post_contractdata = {};
	post_contractdata.blockchainaddress = settings.blockchainaddress;
	post_contractdata.contractabi = settings.contractabi;
	var options = {
		method: 'POST',
		uri: settings.apiurl,
		body: post_contractdata,
		json: true
	};

	rp(options).then(function(body) {
		//var results = JSON.parse(body);
		//console.log(body);
		//console.log(body);
		getIndextoIndex(body, settings, triples);
	})
	.catch(function(err) {
		console.log(err)
	});

}

getData(settings, triples);

function getIndextoIndex(contractdata, settings, triples) {
	ipfsurl = settings.IPFSurl + contractdata.IPFSindextoindex;
	request.get({
		url: ipfsurl,
		json: true,
		headers: {'User-Agent': 'request'}
	}, (err, res, indextoindex) => {
		if (err) {
			console.log('Error:', err);
		} else if (res.statusCode !== 200) {
			console.log('Status:', res.statusCode);
		} else {
			//console.log(indextoindex);
			loopIndexToIndex(indextoindex);
		}
	});
}

function loopIndexToIndex(indextoindex) {
	for (var key in indextoindex) {
		indexesArray.push(indextoindex[key]);
	}
	//console.log(indexesArray);
	processloop();
}

function processloop() {
	if (count < indexesArray.length) {
		hashArray = new Array();
		start = 0;
		end = 0;
		process();
	} else {
		console.log("FINISHED");
	}
}

function process() {

	ipfsurl = settings.IPFSurl + indexesArray[count];
	//console.log(ipfsurl);
	request.get({
		url: ipfsurl,
		json: true,
		headers: {'User-Agent': 'request'}
	}, (err, res, ipfsindex) => {
		if (err) {
			console.log('Error:', err);
		} else if (res.statusCode !== 200) {
			console.log('Status:', res.statusCode);
		} else {
			var IPFSindexJson = ipfsindex;
			//console.log(IPFSindexJson);
			start = (new Date()).getTime();
			for (var key in IPFSindexJson.data) {
				hashArray.push(key.toString());
			}
			//console.log(hashArray);
			makeTree(hashArray);
			
			
			
			//getTree(processing, indextoindex, settings, sortedTriples, handler);
		}
	});


}


function makeTree(dat) {
	var merkleTools = new MerkleTools(treeOptions);
	merkleTools.addLeaves(dat, false);
	merkleTools.makeTree();
	//var rootbuffer = merkleTools.getMerkleRoot();
	//var merkleroot = rootbuffer.toString('hex');
	
	tree = merkleTools.getMerkleTree();
	
	end = (new Date()).getTime();
	duration = end - start;
	console.log(hashArray.length + " leafs took " + duration + " milliseconds to create & retrieve merkle tree");
	count += 1;
	processloop();
}
