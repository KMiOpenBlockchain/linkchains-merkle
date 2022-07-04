const Web3 = require('web3');
const { defaults }  = require('./defaults.js');

// adapted from https://ethereum.stackexchange.com/a/71089
async function deployInternal(abi, bytecode, contractArgs, options) {
	var url = 'ws://' + options.web3Socket.domain + ':' + options.web3Socket.port;
	var web3 = new Web3(new Web3.providers.WebsocketProvider(url));
	const contract = new web3.eth.Contract(abi);
	const transactionOptions = {
		data: bytecode,
		arguments: contractArgs,
		user: options.user
	};
	const transaction = contract.deploy(transactionOptions);
	const handle = await send(transaction, web3, transactionOptions);
	// The args variable was never used in the source.
	//const args = transaction.encodeABI().slice(options.data.length); 
	var result = {
		address: (await new web3.eth.Contract(abi, handle.contractAddress))._address,
		account: options.user.address,
		transactionHash: handle.transactionHash
	};
	web3.currentProvider.disconnect();
	return result;
}

async function send(transaction, web3, sendOptions) {
	const options = {
		to: transaction._parent._address,
		data: transaction.encodeABI(),
		gas: (await web3.eth.getBlock("latest")).gasLimit
	};
	// Key management! It's OK to start with if all blockchain records are sent from a keypair we create
	const signedTransaction = await web3.eth.accounts.signTransaction(options, sendOptions.user.privateKey);
	const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
	return transactionReceipt;
}

async function anchor(metadata, options, anchorFunction) {
	var anchor = {
		type: options.anchorType ? options.anchorType : defaults.DEFAULT_ANCHOR_TYPE,
		indexhash: metadata.merkletrees.indexhash,
		settings: metadata.merkletrees.treesettings
	};

	metadata.merkletrees.anchor = await anchorFunction(anchor, options);
	return metadata;
}

async function anchorInternal(metadata, options) {
	const anchorResults = await anchor(metadata, options, (anchor, options) => {
		var indexHash = anchor.indexhash;
		var newIndexType = anchor.settings.indexType; //following lines take their values from merkleOutput too
		var lsds = anchor.settings.lsd;
		var div = anchor.settings.divisor;
		var quadHashFunctionIn = anchor.settings.quadHash;
		var treeHashFunctionIn = anchor.settings.treeHash;
		var indexHashFunctionIn = anchor.settings.indexHash;
	
		var contractArguments = [
			indexHash,
			newIndexType,
			lsds,
			div,
			quadHashFunctionIn,
			treeHashFunctionIn,
			indexHashFunctionIn,
		];
		const deployOpts = {
			web3Socket: options.web3Socket,
			user: options.user
		};
		const deployResults = deployInternal( options.abi, options.bytecode, contractArguments, deployOpts);
		anchor = Object.assign(anchor, deployResults);
		return anchor;
	});
	return anchorResults;
}

exports.anchor = anchor
exports.defaultAnchor = anchorInternal