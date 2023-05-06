const path = require('node:path');
const fs = require('fs');

const pathToDir = path.join(__dirname, 'files');
const pathToDirNew = path.join(__dirname, 'files-copy');

fs.mkdir(pathToDirNew, {recursive: true}, (err) => {
	if(err) {
		console.log(err);
	}
});
fs.readdir(pathToDir, {withFileTypes: true}, (err, files) => {
	if(err) {
		console.log(err)
	} else {
		files.forEach(item => {
			if(item.isFile()) {
				fs.copyFile(path.join(__dirname, 'files', item.name), path.join(__dirname, 'files-copy', item.name), (err) => {
					if(err) {
						console.log(err);
					}
				});
			}})
	}
});

