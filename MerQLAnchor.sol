pragma solidity ^0.5.7;

contract MerQLAnchor {
    string public targetHash;
    uint256 public creationTime;
    address public owner;
    string public indexType; // Defines how data was split: uniform = data split based on LSD and divisor, subject = based on hash of subject term, object = based on hash of object term, predicate = based on hash of predicate term, graph = based on hash of graph term, subjectobject = based on hash of subject & object term
    uint256 public leastSignificantDigits;
    string public divisor;
    string public quadHashFunction;
    string public treeHashFunction;
    string public indexHashFunction;

    constructor(
        string memory hashIn,
        string memory newIndexType,
        uint256 lsds,
        string memory div,
        string memory quadHashFunctionIn,
        string memory treeHashFunctionIn,
        string memory indexHashFunctionIn
    ) public {
        owner = msg.sender;
        targetHash = hashIn;
        creationTime = block.timestamp;
        leastSignificantDigits = lsds;
        divisor = div;
        indexType = newIndexType;
		quadHashFunction = quadHashFunctionIn;
		treeHashFunction = treeHashFunctionIn;
		indexHashFunction = indexHashFunctionIn;
    }

    function getData()
        public
        view
        returns (
            uint256 theCreationTime,
            address theOwner,
            string memory thetargetHash,
            string memory theIndexType,
            uint256 leastSignificants,
            string memory theDivisor,
        	string memory theQuadHashFunction,
        	string memory theTreeHashFunction,
        	string memory theIndexHashFunction
        )
    {
        theCreationTime = creationTime;
        theOwner = owner;
        thetargetHash = targetHash;
        theIndexType = indexType;
        leastSignificants = leastSignificantDigits;
        theDivisor = divisor;
		theQuadHashFunction = quadHashFunction;
		theTreeHashFunction = treeHashFunction;
		theIndexHashFunction = indexHashFunction;
    }
}
