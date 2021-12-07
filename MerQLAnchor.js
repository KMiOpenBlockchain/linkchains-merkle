const Web3 = require('web3');

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
		address : (await new web3.eth.Contract(abi, handle.contractAddress))._address,
		userAddress : options.user.address,
		transactionHash : handle.transactionHash
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

async function anchor(metadata, options, anchorFunction){
	var indexHash = metadata.merkletrees.indexhash;
	var newIndexType = metadata.merkletrees.treesettings.indexType; //following lines take their values from merkleOutput too
	var lsds = metadata.merkletrees.treesettings.lsd;
	var div = metadata.merkletrees.treesettings.divisor;
	var quadHashFunctionIn = metadata.merkletrees.treesettings.quadHash;
	var treeHashFunctionIn = metadata.merkletrees.treesettings.treeHash;
	var indexHashFunctionIn = metadata.merkletrees.treesettings.indexHash;

	var contractArguments = [
		indexHash,
		newIndexType,
		lsds,
		div,
		quadHashFunctionIn,
		treeHashFunctionIn,
		indexHashFunctionIn,
	];

	var deployed = await anchorFunction(options, contractArguments);
	
	metadata.merkletrees.anchor = {
		type : "ETHMerQL", //hardcoded
		address : deployed.address,
		account : deployed.userAddress,
		indexhash : indexHash,
		settings : metadata.merkletrees.treesettings,
		transactionhash : deployed.transactionHash // Not actually sure this is needed - I guess it can't hurt?
	};

	return metadata;
}

async function anchorInternal(metadata, options) {
	return await anchor(metadata, options, (options, contractArguments) => {
		return await deployInternal(options.abi, options.bytecode, contractArguments, {
			web3Socket : options.web3Socket,
			user: options.user
		});
	});
}

exports.anchor = anchor
exports.defaultAnchor = anchorInternal