const path = require('node:path');
const fs = require('fs');

const pathToFile = path.join(__dirname, 'text.txt')
fs.createReadStream(pathToFile, 'utf-8').on('data', function(inf) {
	console.log(inf);
});