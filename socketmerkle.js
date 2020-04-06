require("./config.js");
const fs = require('fs');
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://' + cfg.web3Socket.domain + ':' + cfg.web3Socket.port));

var gasPrice = 21000000000;
// var gasUnits = 4700000; // this is the max
var gasUnits = 100000;
var empty = "0x0000000000000000000000000000000000000000";

var socketport = cfg.socketServer.port;
var http = require('http');
var server = http.createServer(callHandler);

var serveraddress = cfg.socketServer.domain;
var io = require('socket.io')(server, {'path': '/node_modules/socket.io'});
server.listen(socketport, serveraddress);
io.set("origins", "*:*");

/*********************/

function callHandler(req, res) {
	 //console.log("[200] " + req.method + " to " + req.url);
	 //console.log(req);
	var fullBody = '';

	req.on('data', function(chunk) {
		fullBody += chunk.toString();
		if (fullBody.length > 1e6) {
			// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
			req.connection.destroy();
		}
	});

	req.on('end', function() {
		if (fullBody !== null && fullBody !== "") {
			//console.log('fullBody ' + fullBody);
			var json = JSON.parse(fullBody);
			if (json.blockchainaddress) {
				rdfContractRead(json, res);
			} else {
				console.log(err);
				res.writeHead(401, "Unauthorized", {'Content-Type': 'text/html'});
				res.end();
			}
		} else {
			// console.log('ERROR: fullBody reported as empty ' + req.url);
		}
	});
}

function rdfContractRead(json, res) {
	// Code for Allan Thirds RDF query experiments
	console.log("Address passed:" + json.blockchainaddress);
	var ipfsInstance = new web3.eth.Contract(json.contractabi, json.blockchainaddress);
	ipfsInstance.methods.getData().call(function(e, result){
		if (!e) {
			//console.log(result);
			var back = {};
			back.created = parseInt(result["theCreationTime"]);
			back.owner = result['theOwner'];
			back.IPFSindextoindex = result['theIPFSAddress'];
			back.theIndexType = result['theIndexType'];
			back.leastSignificants = result['leastSignificants'];
			back.theDivisor = result['theDivisor'];
			var replydata = JSON.stringify(back);
			res.writeHead(200, "OK", {'Content-Type': 'application/json'});
			res.end(replydata);
		} else {
			console.error(e);
		}
		return;
	});
}
