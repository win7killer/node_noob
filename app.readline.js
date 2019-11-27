const path = require('path');
const http = require('http');
const fs = require('fs');

const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let answers = [];

async function takeQs(qs, close = false) {
    return new Promise((resolve, reject) => {
        rl.question(qs, con => {
            answers.push(con);
            resolve(con);
            close && rl.close();
        })
    })
}


rl.on('close', () => {
    console.group('close');
    console.log(JSON.stringify(answers, null, 2))
});

takeQs('qs1?\n').then(res => {
    console.log(1, res);
    return takeQs('qs2?\n');
}).then(res => {
    console.log(2, res);
    return takeQs('qs3?\n', true);
})
