const path = require('node:path');
const fs = require('fs');

const pathToDirNew = path.join(__dirname, 'project-dist');
const pathToDirNewAssets = path.join(__dirname, 'project-dist', 'assets');
const pathToDirAssets = path.join(__dirname, 'assets');

// create project-dist with assets
async function copyDir(output, input) {
  fs.mkdir(pathToDirNew, {recursive: true}, (err) => {
    if(err) {
      console.log(err);
    }
  });
  fs.mkdir(pathToDirNewAssets, {recursive: true}, (err) => {
    if(err) {
      console.log(err);
    }
  });
  fs.readdir(path.join(output), {withFileTypes: true}, (err, files) => {
    if(err) {
      console.log(err)
    } else {
      files.forEach(item => {
        let newOutput = path.join(output, item.name);
        let newInput = path.join(input, item.name);
        if(item.isDirectory()){
          fs.mkdir(path.join(input, item.name), {recursive: true}, (err) => {
            if(err) {
              console.log(err);
            }
          })
          copyDir(newOutput, newInput);
        } else {
          fs.copyFile(newOutput, newInput, (err) => {
            if(err) {
              console.log(err);
            }
          });
        }
      })
    }
  })
}

copyDir(pathToDirAssets, pathToDirNewAssets);

// create style.css
const pathToDirStyles = path.join(__dirname, 'styles');

const pathToFileCss = path.join(__dirname, 'project-dist', 'style.css');
const pToFileProject = fs.createWriteStream(pathToFileCss);

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

// create index.html
const pathToFileHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathToFileTemplateHtml = path.join(__dirname, 'template.html');
const pathToComponent = path.join(__dirname, 'components')
const pToFileHtml= fs.createWriteStream(pathToFileHtml);
fs.createReadStream(pathToFileTemplateHtml, 'utf-8').on('data', function(tags) {
  fs.readdir(pathToComponent, {withFileTypes: true}, (err, files) => {
    if(err) {
      console.log(err);
    }
    files.forEach((file, index) => {
      if(file.isFile()) {
        if(path.extname(file.name) === '.html') {
          fs.createReadStream(path.join(__dirname, 'components', file.name), 'utf-8').on('data', function(data) {
            tags = tags.replace(`{{${file.name.slice(0, -5)}}}`, data);
            if(files.length === index + 1){
              pToFileHtml.write(tags);
            }
          })
        }
      }
    })
  })
})
