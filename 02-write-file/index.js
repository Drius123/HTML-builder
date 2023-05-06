const path = require('node:path');
const fs = require('fs');
const process = require('node:process');
const pathToFile = path.join(__dirname, 'text.txt')

const pToFile = fs.createWriteStream(pathToFile);

process.stdout.write('Приветствие! Введите текст \n');
process.stdin.on('data', (data) => {
	if (data.toString().trim() === 'exit') {
		process.stdout.write('Выполнен выход из процесса записи текста');
		pToFile.end();
		process.exit();
	} else {
		pToFile.write(data);
	}
})
process.on('SIGINT', () => {
  process.stdout.write('Ввод закончен c помощью <Ctrl + C>. Проверьте файл text.txt'); 
  process.exit();
}); 
