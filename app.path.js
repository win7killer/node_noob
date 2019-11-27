const path = require('path');
const util  = require('util');
const colors = require('colors');
colors.enable();
const {log, info, warn, error, group, groupEnd} = console;

const STYLES = {
    'bold'          : ['\x1B[1m',  '\x1B[22m'],
    'italic'        : ['\x1B[3m',  '\x1B[23m'],
    'underline'     : ['\x1B[4m',  '\x1B[24m'],
    'inverse'       : ['\x1B[7m',  '\x1B[27m'],
    'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
    'white'         : ['\x1B[37m', '\x1B[39m'],
    'grey'          : ['\x1B[90m', '\x1B[39m'],
    'black'         : ['\x1B[30m', '\x1B[39m'],
    'blue'          : ['\x1B[34m', '\x1B[39m'],
    'cyan'          : ['\x1B[36m', '\x1B[39m'],
    'green'         : ['\x1B[32m', '\x1B[39m'],
    'magenta'       : ['\x1B[35m', '\x1B[39m'],
    'red'           : ['\x1B[31m', '\x1B[39m'],
    'yellow'        : ['\x1B[33m', '\x1B[39m'],
    'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
    'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG'       : ['\x1B[40m', '\x1B[49m'],
    'blueBG'        : ['\x1B[44m', '\x1B[49m'],
    'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
    'greenBG'       : ['\x1B[42m', '\x1B[49m'],
    'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
    'redBG'         : ['\x1B[41m', '\x1B[49m'],
    'yellowBG'      : ['\x1B[43m', '\x1B[49m']
};
// log(__dirname);
// log(__filename);

let _path = {};
Object.entries(path).forEach(([key, val]) => {
    _path[key] = function(...args) {
        let res = val(...args);
        info(`${res}%s%c`, 'font-size: #f90;');
        return res;
    }
})


function clog(color, ...args) {
    let cArr = STYLES[color];
    let str = [
        cArr[0],
        '%s',
        cArr[1],
    ].join('')
    // console.log(str1.red);
    console.log(str, ...args)
}

// _path.parse(__filename)


// info(path.relative('1/2/3/4', '1/2/3/121323/232323/232323/111'))

// info(path.resolve('../1/2/3/4/5/6/7', '../../a/b/c'))
// // info(path.relative(path.resolve('./', '../1/2/3/4/5/6/7', '../../a/b/c')))
// info(path.join('../1/2/3/4/5/6/7', '../../a/b/c'))

// info(path.normalize('../////...../.././///cimg'))


// info(path.normalize('a/b/c/' + '/a///./b'))

// info(path.format({
//     root: 'a/',
//     dir: '../../1/2/3/4/5',
//     base: '1.js',
//     name: '566666',
//     ext: '.txt'
// }))

// info(path.basename('a/b/c/v/d/f/sssss.sdsds.js'))

// info()


clog('red', 'sdsds')
