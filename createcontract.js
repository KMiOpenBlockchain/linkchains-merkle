require("./config.js");

const hashingFunctions = require('./hashing');

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
/*
			var json = "cfg = " + JSON.stringify(cfg, null, 4);
			console.log(cfg.pathToSocketScript + 'socketserver.cfg');
			fs.writeFile (cfg.pathToSocketScript + 'socketserver.cfg', json, function(err) {
				if (err) throw err;
					console.log('nodes data in config file updated');
				}
			);
*/
var fs = require('fs');
const Web3 = require('web3');
//var net = require('net');
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:56000'));

var account = cfg.account;
var abi = cfg.contracts.ipfsmerkleproof.abi;
var binary = cfg.contracts.ipfsmerkleproof.binary;
var folderpath = cfg.dataFolder;
var dataLoopCount = 0;
var gasPrice =0;


//var IPFSAddress = "QmX6H6WpbMMDj7Rs3ffd1qYsVx4YNA7QJyQnbgGSsr5uBP"; 
var IPFSAddress; 
var type; // Defines how data was split: uniform = data split based on LSD and divisor, subject = based on hash of subject term, object = based on hash of object term, predicate = based on hash of predicate term, graph = based on hash of graph term, subjectobject = based on hash of subject & object term 
var lsds;
var divisor;
var sampledata;
var folder;

var contract = ""; 

function processAllData() {
	if (dataLoopCount == cfg.data.length) {
		console.log("FINISHED");
		process.exit();
	} else {
		//console.log(cfg.data[i]);
		sortedpath = folderpath + "sorted/";
		
		res = cfg.data[dataLoopCount].datafile.split(".");
		folder = res[0];
		IPFSAddress = cfg.data[dataLoopCount].indextoindex
		type = cfg.data[dataLoopCount].indexType;
		lsds = cfg.data[dataLoopCount].lsd;
		divisor = cfg.data[dataLoopCount].divisor;
		console.log(cfg.data[dataLoopCount].indextoindex);
		estimate();
	}
}

function estimate() {
	var newcontract = new web3.eth.Contract(abi);
	newcontract.deploy({
		data: binary,
		arguments: [IPFSAddress, type, lsds, divisor, settings.pluggableFunctions.quadHash.parameters.type, cfg.treeHash.type]
	}).estimateGas(function(error, gasAmount){
		console.log('Estimated Gas = ' + gasAmount);
		gastouse = parseInt(gasAmount * 1.05);
		make(gastouse);
	});
}

function make(gastouse) {
	var newcontract = new web3.eth.Contract(abi);
	newcontract.deploy({
		data: binary,
		arguments: [IPFSAddress, type, lsds, divisor, settings.pluggableFunctions.quadHash.parameters.type, cfg.treeHash.type]
	})
	.send({
		from: account,
		gas: gastouse,
		gasPrice: gasPrice
	}, function(error, transactionHash){
		console.log('transactionHash = ' + transactionHash);
	})
	.on('error', function(error){
		console.log(error);
	})
	.on('transactionHash', function(transactionHash){
		console.log('on event transactionHash = ' + transactionHash);
	})
	.on('receipt', function(receipt){
		console.log("Contract mined! '" + folder + " " + type + "' Address: " + receipt.contractAddress);
		cfg.data[dataLoopCount].contract = receipt.contractAddress;
		var json = "cfg = " + JSON.stringify(cfg, null, 4);
		fs.writeFile ("./config.js", json, function(err) {
			if (err) throw err;
				console.log('config,js data updated');
				dataLoopCount += 1;
				processAllData();
			}
		);	
	});
}

function getGasPrice(){
	var handler = function (e, result) {
		if (!e) {
			gasPrice = result;
			processAllData();
		} else {
			//
		}
	};
	web3.eth.getGasPrice(handler);
}
getGasPrice();


// Gas Used = 439610 Wei = 0.00000000000043961 Eth
// Our Gas Price =        21000000000
// Live chain Gas Price = 10000000000