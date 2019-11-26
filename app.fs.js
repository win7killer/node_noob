const fs = require('fs');

function readFileAsync() {
    fs.readFile('./package.json', 'utf-8', (err, res) => {
        console.log(res);
    })

}

function readFileSync() {
    let str = fs.readFileSync('./package.json', 'utf-8');
    console.log(str);
}

// readFileAsync();
// readFileSync();
// writeFileSync()

function writeFileSync() {
    const fd = fs.openSync('./1.txt', 'r+');
    let status = fs.writeSync(fd, '111');
    // console.log(status)
}

function fileStats() {
    let res = fs.statSync('./package.json');
    console.log(res);
}


fileStats();
