const os = require('os');
const fs = require('fs');
console.log(os.platform(), os.homedir());
console.log('...');

// read files
(function(){
  let bool = false; // make it 'true' to run
  if (bool){
    fs.readFile('./docs/doc1.txt', (err, data) => {
    if (err) console.log(err);
    console.log(data.toString());
    })
  }
})();

// write files
(function(){
  let bool = false; // make it 'true' to run
  if (bool){
    fs.writeFile('./docs/doc2.txt', 'Hello World', () => {
      console.log('write files success');
    })
  }
})();

// folder create and deleted
(function(){
  let bool = false; // make it 'true' to run
  if (bool){
    if (!fs.existsSync('./assets')){
      fs.mkdir('./assets', err => {
        if (err) console.log(err);
        console.log('folder created');
      })
    } else {
      fs.rmdir('./assets', err => {
        if (err) console.log(err);
        console.log('folder deleted');
      })
    }
  }
})();

// streams
(function(){
  let bool = false; // make it 'true' to run
  if (bool){
    const readStream = fs.createReadStream('./docs/doc1.txt', 'utf8');
    const writeStream = fs.createWriteStream('./docs/doc2.txt');
    // readStream.on('data', chunk => {
    //   console.log(chunk);
    //   writeStream.write(chunk)
    // })
    readStream.pipe(writeStream);
  }
})();