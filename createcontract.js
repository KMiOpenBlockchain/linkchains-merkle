require("./config.js");
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

var contract = "0x9a3201a27e01a332182f4e8d0b7b155936b959c4"; 

function processAllData() {
	if (dataLoopCount == cfg.data.length) {
		console.log("FINISHED");
	} else {
		//console.log(cfg.data[i]);
		sortedpath = folderpath + "sorted/";
		
		res = cfg.data[dataLoopCount].datafile.split(".");
		folder = res[0];
		ipfsfilepath = folderpath + "foripfs/" + folder + "/" + cfg.data[dataLoopCount].indexType + "/sampledata.json";
		rawdata = fs.readFileSync(ipfsfilepath);
		sampledata = JSON.parse(rawdata);
		IPFSAddress = sampledata.ipfsindextoindex;
		type = cfg.data[dataLoopCount].indexType;
		lsds = cfg.data[dataLoopCount].lsd;
		divisor = cfg.data[dataLoopCount].divisor;
		console.log(sampledata.ipfsindextoindex);
		estimate();
	}
}



function estimate() {
	var newcontract = new web3.eth.Contract(abi);
	newcontract.deploy({
		data: binary,
		arguments: [IPFSAddress, type, lsds, divisor]
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
		arguments: [IPFSAddress, type, lsds, divisor]
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