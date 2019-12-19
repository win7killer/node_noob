const fs = require('fs');
const child  =require('child_process');
const colors = require('./utils/colors');
const path = require('path');
const execParams = handleExecParams();

function handleExecParams() {
    let originParams = process.argv.slice(2);
    let res = {};
    originParams.forEach(item => {
        let arr = item.split('=');
        arr[1] = arr[1] || true;
        res[arr[0]] = arr[1];
    });
    return res;
}

console.log(execParams);
doBuild()
// console.log('colors.STYLES:\n%o', colors.STYLES)
// child.exec('ls', (err, stdout, stderr) => {
//     console.log('666: %s', colors(stdout,));
// })

function doBuild() {
    try {
        path.parse(execParams.FILE);
    } catch (err) {
        throw Error(err);
    }
    let filePath = path.resolve(__dirname, execParams.FILE);
    console.log(filePath);
    child.exec(`tsc ${filePath}`, (error, stdout, stderr) => {

        if (error) {
            console.error('error:\n\n%o', error);
        }
        if (stderr) {
            console.error('stderr:\n\n%o', stderr);
        }
        console.log(stdout)
    });
}
