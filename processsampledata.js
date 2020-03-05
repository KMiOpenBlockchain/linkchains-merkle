var fs = require('fs');
const countLinesInFile = require('count-lines-in-file');
var readline = require('linebyline');
var ipfsClient = require('ipfs-http-client');

var folderpath = 'DATASET_FOLDER_PATH';
var ipfsfilepath = folderpath;

var ipfs = ipfsClient('IPFS_NODE', 'IPFS_PORT', { protocol: 'http' });
var processdata = require(folderpath + "sampledata.json");


function processfiles() {
	str = JSON.stringify(processdata);
	var indextoindex = {}
	for (i = 0; i < processdata.treesandindexes.length; i++) {
		indextoindex["" + processdata.treesandindexes[i].indexIndex] = processdata.treesandindexes[i].indexipfs;
	}
	path = ipfsfilepath + "indextoindex.json";
	fs.writeFileSync(path, JSON.stringify(indextoindex));
	//console.log(indextoindex);
	ipfs.addFromFs(path, (err, result) => {
		if (err) { throw err }
		processdata.ipfsindextoindex = result[0].hash;
		console.log(result[0].hash);
		fs.writeFile(folderpath + "sampledata.json", JSON.stringify(processdata), function(err) {
			if (err) throw err;
			console.log("FINISHED");
		});	
	});
}

processfiles();
