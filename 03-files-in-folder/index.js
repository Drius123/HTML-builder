const path = require('node:path');
const fs = require('fs');

const pathToDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathToDir, {withFileTypes: true}, (err, files) => {
	if(err) {
		console.log(err)
	} else {
		files.forEach(item => {
			if(item.isFile()) {
				fs.stat(path.join(__dirname, 'secret-folder', item.name), (err, stats) => {
					console.log(item.name.slice(0 ,item.name.indexOf('.')) + ' - ' + item.name.slice(item.name.indexOf('.') + 1) + ' - ' + stats.size.toString() + 'b');
				});
			}})
	}
});

