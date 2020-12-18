// adapted from https://ethereum.stackexchange.com/a/71089
async function deploy(abi, bytecode, contractArgs) {
	var Web3 = require('web3');
	var url = 'ws://' + cfg.web3Socket.domain + ':' + cfg.web3Socket.port;
	var web3 = new Web3(new Web3.providers.WebsocketProvider(url));
	const contract = new web3.eth.Contract(abi);
	const options = {
		data: bytecode,
		arguments: contractArgs
	};
	const transaction = contract.deploy(options);
	const handle = await send(transaction, web3);
	// The args variable was never used in the source.
	//const args = transaction.encodeABI().slice(options.data.length); 
	var result = {
		contract : new web3.eth.Contract(abi, handle.contractAddress),
		receipt : handle
	};
	web3.currentProvider.disconnect();
	return result;
}

async function send(transaction, web3) {
	const options = {
		to: transaction._parent._address,
		data: transaction.encodeABI(),
		gas: (await web3.eth.getBlock("latest")).gasLimit
	};
	// Key management! It's OK to start with if all blockchain records are sent from a keypair we create
	const signedTransaction = await web3.eth.accounts.signTransaction(options, cfg.user.privateKey);
	const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
	return transactionReceipt;
}

async function hashAndStore(merkleOutput, options){
	var indexHash = merkleOutput.merkletrees.indexhash;
	var newIndexType = merkleOutput.merkletrees.treesettings.indexType; //following lines take their values from merkleOutput too
	var lsds = merkleOutput.merkletrees.treesettings.lsd;
	var div = merkleOutput.merkletrees.treesettings.divisor;
	var quadHashFunctionIn = merkleOutput.merkletrees.treesettings.quadHash;
	var treeHashFunctionIn = merkleOutput.merkletrees.treesettings.treeHash;
	var indexHashFunctionIn = merkleOutput.merkletrees.treesettings.indexHash;

	var contractArguments = [
		indexHash,
		newIndexType,
		lsds,
		div,
		quadHashFunctionIn,
		treeHashFunctionIn,
		indexHashFunctionIn,
	];

	var merqlanchorContract = await deploy(cfg.abi, cfg.bytecode, contractArguments);
	console.log('Contract mined! address: ' + merqlanchorContract.address +
		' transactionHash: ' + merqlanchorContract.transactionHash);

	merkleOutput.merkletrees.anchor = {
		type : "ETHMerQL", //hardcoded
		address : merqlanchorContract.contract._address,
		account : cfg.user.address,
		transactionhash : merqlanchorContract.receipt.transactionHash // Not actually sure this is needed - I guess it can't hurt?
	};

	return merkleOutput;
}

exports.hashAndStore = hashAndStore