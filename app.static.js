const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');


function TakeMiddlewareHandler() {
    let queen = [];

    function add(handle, name) {
        if ((typeof handle !== 'function')) {
            throw Error('.add(handle), handle must be function');
        }
        queen.push({name, handle});
    }

    function remove(name) {
        if (name === undefined) {
            throw Error('.remove(name|index), (name|index) must be (string|number)');
        }
        let index = name;
        if (typeof name === 'string') {
            queen.some((item, idx) => {
                if (item.name === name) {
                    index = idx;
                    return true;
                }
            });
        }
        queen.splice(index, 1);
    }

    function* apply(req, res) {
        let i = 0;
        if (queen.length) {
            queen[i](req, res, () => {
                queen[i + 1](req, res)
            });
        }
    }
}


function handleMiddlewares(req, res) {

}


const topMiddleware = async function topMiddleware (req, res) {
    console.log('\ntop middle start');
    res.write('666');

    await handleMiddlewares(req, res);
    console.log('\ntop middle end');
    res.end();
};

const app = http.createServer(topMiddleware);


app.listen(3001, () => {
    console.log('localhostL:3001');
});
