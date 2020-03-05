/*
CURRENT WAY OF CALCULATING INDEX NUMBER FROM QUAD HASH FOR 100,000 SAMPLE data
		lastfive = data.substr(data.length - 5);
		decimal = parseInt(lastfive, 16);
		index = Math.floor(decimal/8500);
		
		dividing by 8500 for this set creates 124 sorted sets with just less than 1024 elements
*/

require("PATH_TO/IPFSMerkleProof3.js");

const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:56000'));

var data = require("./dataset/sampledata.json");
var numberToProcess = data.treesandindexes.length;

var account = "BLOCKCHAIN_ACCOUNT";
var abi = cfg.contracts.ipfsmerkleproof.abi;
var binary = cfg.contracts.ipfsmerkleproof.binary;
var contract = "CONTRACT_ADDRESS"; 


function getData() {

	var aninstance = new web3.eth.Contract(abi, contract);
	aninstance.methods.getData().call(function(e, result){
		if (!e) {
			console.log(result);
			console.log("Timestamp = " + result['theCreationTime']); //remember comes in as string
			console.log("Owner = " + result['theOwner']);
			console.log("IPFS Hash = " + result['theIPFSAddress']);
			console.log("theIndexType = " + result['theIndexType']);
			console.log("leastSignificants = " + result['leastSignificants']); //remember comes in as string
			console.log("theDivisor = " + result['theDivisor']); //remember comes in as string
		} else {
			console.error(e);
		}
	});
}

getData();
