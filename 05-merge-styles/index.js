const path = require('node:path');
const fs = require('fs');

const pathToDirStyles = path.join(__dirname, 'styles');
const pathToDirProject = path.join(__dirname, 'project-dist');

const pathToFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pToFileProject = fs.createWriteStream(pathToFile);

fs.readdir(pathToDirStyles, {withFileTypes: true}, (err, files) => {
	if(err) {
		console.log(err)
	} else {
		files.forEach(item => {
			if(item.isFile()) {
				if(path.extname(item.name) === '.css') {
					fs.createReadStream(path.join(__dirname, 'styles', item.name), 'utf-8').on('data', function(inf) {
						pToFileProject.write(inf);
					})
				}
			}})
	}
});