const bytecode = "0x60806040523480156200001157600080fd5b506040516200159038038062001590833981810160405260e08110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b506040526020018051906020019092919080516040519392919084640100000000821115620001dc57600080fd5b83820191506020820185811115620001f357600080fd5b82518660018202830111640100000000821117156200021157600080fd5b8083526020830192505050908051906020019080838360005b83811015620002475780820151818401526020810190506200022a565b50505050905090810190601f168015620002755780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200029957600080fd5b83820191506020820185811115620002b057600080fd5b8251866001820283011164010000000082111715620002ce57600080fd5b8083526020830192505050908051906020019080838360005b8381101562000304578082015181840152602081019050620002e7565b50505050905090810190601f168015620003325780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200035657600080fd5b838201915060208201858111156200036d57600080fd5b82518660018202830111640100000000821117156200038b57600080fd5b8083526020830192505050908051906020019080838360005b83811015620003c1578082015181840152602081019050620003a4565b50505050905090810190601f168015620003ef5780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200041357600080fd5b838201915060208201858111156200042a57600080fd5b82518660018202830111640100000000821117156200044857600080fd5b8083526020830192505050908051906020019080838360005b838110156200047e57808201518184015260208101905062000461565b50505050905090810190601f168015620004ac5780820380516001836020036101000a031916815260200191505b5060405250505033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555086600090805190602001906200050c929190620005a5565b504260018190555084600481905550836005908051906020019062000533929190620005a5565b5085600390805190602001906200054c929190620005a5565b50826006908051906020019062000565929190620005a5565b5081600790805190602001906200057e929190620005a5565b50806008908051906020019062000597929190620005a5565b505050505050505062000654565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620005e857805160ff191683800117855562000619565b8280016001018555821562000619579182015b8281111562000618578251825591602001919060010190620005fb565b5b5090506200062891906200062c565b5090565b6200065191905b808211156200064d57600081600090555060010162000633565b5090565b90565b610f2c80620006646000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806388d8c5ab1161006657806388d8c5ab1461052a5780638da5cb5b146105ad578063d8270dce146105f7578063f39867ca14610615578063f6f49a0a146106985761009e565b80630852ecb1146100a35780631f2dc5ef146100c157806331d0f968146101445780633bc5de30146101c757806353f50447146104a7575b600080fd5b6100ab61071b565b6040518082815260200191505060405180910390f35b6100c9610721565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101095780820151818401526020810190506100ee565b50505050905090810190601f1680156101365780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61014c6107bf565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561018c578082015181840152602081019050610171565b50505050905090810190601f1680156101b95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101cf61085d565b604051808a81526020018973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001806020018881526020018060200180602001806020018060200187810387528e818151815260200191508051906020019080838360005b83811015610261578082015181840152602081019050610246565b50505050905090810190601f16801561028e5780820380516001836020036101000a031916815260200191505b5087810386528d818151815260200191508051906020019080838360005b838110156102c75780820151818401526020810190506102ac565b50505050905090810190601f1680156102f45780820380516001836020036101000a031916815260200191505b5087810385528b818151815260200191508051906020019080838360005b8381101561032d578082015181840152602081019050610312565b50505050905090810190601f16801561035a5780820380516001836020036101000a031916815260200191505b5087810384528a818151815260200191508051906020019080838360005b83811015610393578082015181840152602081019050610378565b50505050905090810190601f1680156103c05780820380516001836020036101000a031916815260200191505b50878103835289818151815260200191508051906020019080838360005b838110156103f95780820151818401526020810190506103de565b50505050905090810190601f1680156104265780820380516001836020036101000a031916815260200191505b50878103825288818151815260200191508051906020019080838360005b8381101561045f578082015181840152602081019050610444565b50505050905090810190601f16801561048c5780820380516001836020036101000a031916815260200191505b509f5050505050505050505050505050505060405180910390f35b6104af610c53565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104ef5780820151818401526020810190506104d4565b50505050905090810190601f16801561051c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610532610cf1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610572578082015181840152602081019050610557565b50505050905090810190601f16801561059f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105b5610d8f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105ff610db5565b6040518082815260200191505060405180910390f35b61061d610dbb565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561065d578082015181840152602081019050610642565b50505050905090810190601f16801561068a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6106a0610e59565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106e05780820151818401526020810190506106c5565b50505050905090810190601f16801561070d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60045481565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107b75780601f1061078c576101008083540402835291602001916107b7565b820191906000526020600020905b81548152906001019060200180831161079a57829003601f168201915b505050505081565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108555780601f1061082a57610100808354040283529160200191610855565b820191906000526020600020905b81548152906001019060200180831161083857829003601f168201915b505050505081565b60008060608060006060806060806001549850600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16975060008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561092b5780601f106109005761010080835404028352916020019161092b565b820191906000526020600020905b81548152906001019060200180831161090e57829003601f168201915b5050505050965060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109c85780601f1061099d576101008083540402835291602001916109c8565b820191906000526020600020905b8154815290600101906020018083116109ab57829003601f168201915b50505050509550600454945060058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a6a5780601f10610a3f57610100808354040283529160200191610a6a565b820191906000526020600020905b815481529060010190602001808311610a4d57829003601f168201915b5050505050935060068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b075780601f10610adc57610100808354040283529160200191610b07565b820191906000526020600020905b815481529060010190602001808311610aea57829003601f168201915b5050505050925060078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ba45780601f10610b7957610100808354040283529160200191610ba4565b820191906000526020600020905b815481529060010190602001808311610b8757829003601f168201915b5050505050915060088054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c415780601f10610c1657610100808354040283529160200191610c41565b820191906000526020600020905b815481529060010190602001808311610c2457829003601f168201915b50505050509050909192939495969798565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ce95780601f10610cbe57610100808354040283529160200191610ce9565b820191906000526020600020905b815481529060010190602001808311610ccc57829003601f168201915b505050505081565b60088054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d875780601f10610d5c57610100808354040283529160200191610d87565b820191906000526020600020905b815481529060010190602001808311610d6a57829003601f168201915b505050505081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e515780601f10610e2657610100808354040283529160200191610e51565b820191906000526020600020905b815481529060010190602001808311610e3457829003601f168201915b505050505081565b60078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610eef5780601f10610ec457610100808354040283529160200191610eef565b820191906000526020600020905b815481529060010190602001808311610ed257829003601f168201915b50505050508156fea265627a7a723158200e0b89fcb9f633a72ddea16325695516368f352a428ce8bdabfd34797076bbe764736f6c63430005110032";


const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hashIn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newIndexType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lsds",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "div",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quadHashFunctionIn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "treeHashFunctionIn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "indexHashFunctionIn",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creationTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "divisor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "theCreationTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "theOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "thetargetHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "theIndexType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "leastSignificants",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "theDivisor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "theQuadHashFunction",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "theTreeHashFunction",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "theIndexHashFunction",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "indexHashFunction",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "indexType",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "leastSignificantDigits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "quadHashFunction",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "targetHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "treeHashFunction",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

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
	var result = new web3.eth.Contract(abi, handle.contractAddress);
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

	var merqlanchorContract = await deploy(abi, bytecode, contractArguments);
	console.log('Contract mined! address: ' + merqlanchorContract.address +
		' transactionHash: ' + merqlanchorContract.transactionHash);

	merkleOutput.merkletrees.anchor = {
		type : "ETHMerQL", //hardcoded
		address : merqlanchorContract._address,
		userAddress : cfg.user.address,
		transactionhash : merqlanchorContract.transactionHash // Not actually sure this is needed - I guess it can't hurt?
	};

	return merkleOutput;
}

exports.hashAndStore = hashAndStore