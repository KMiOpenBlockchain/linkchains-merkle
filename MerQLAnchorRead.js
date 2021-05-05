const Web3 = require('web3');

async function retrieve(anchor, abi, options) {
	var url = 'ws://' + options.web3Socket.domain + ':' + options.web3Socket.port;
	var web3 = new Web3(new Web3.providers.WebsocketProvider(url));
	let contract = new web3.eth.Contract(abi, anchor.address);
	var anchorDetails = await contract.methods.getData().call();
	var transaction = await web3.eth.getTransactionReceipt(anchor.transactionhash);
	anchorDetails.transactionAccount = transaction.from;
	anchorDetails.transactionContractAddress = transaction.contractAddress;
	web3.currentProvider.disconnect();
	return anchorDetails;
}

async function retrieveAnchor(anchor, options) {
	var anchorDetails = retrieve(anchor, cfg.abi, {
		web3Socket : cfg.web3Socket
	});
	return anchorDetails;
}

exports.retrieveAnchor = retrieveAnchor