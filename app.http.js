const http = require('http');
const querystring = require('querystring');
const qs = require('qs');
const { URL } = require('url');

const app = http.createServer((req, res, ...args) => {

    handleFavicon(req);
    if (req.url === '/req') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        showReq(req, res);
    } else if (req.url === '/res') {
        res.writeHead(202, {
            'Content-Type': 'application/json',
        });
        res.write('kajdlksajdklsajdklasdsk');
        showRes(res);
    }
    res.end();
});

function handleFavicon(req) {
    if(req.url!='/favicon.ico'){
        return;
     }
}


function showReq(req, res) {
    let {
        _readableState,
        readable,
        domain,
        _events,
        _eventsCount,
        _maxListeners,
        socket,
        connection,
        httpVersionMajor,
        httpVersionMinor,
        httpVersion,
        complete,
        headers,
        rawHeaders,
        trailers,
        rawTrailers,
        aborted,
        upgrade,
        url,
        method,
        statusCode,
        statusMessage,
        client,
        _consuming,
        _dumped
    } = req;
    resBody(res, {
        keys: Object.keys(req),
        _readableState,
        readable,
        domain,
        _events,
        _eventsCount,
        _maxListeners,
        // socket,
        // connection,
        httpVersionMajor,
        httpVersionMinor,
        httpVersion,
        complete,
        headers,
        rawHeaders,
        trailers,
        rawTrailers,
        aborted,
        upgrade,
        url,
        method,
        statusCode,
        statusMessage,
        // client,
        _consuming,
        _dumped
    });
}

function showRes(res) {
    let keys = Object.keys(res);
    let {
        domain,
        _events,
        _eventsCount,
        _maxListeners,
        output,
        outputEncodings,
        outputCallbacks,
        outputSize,
        writable,
        _last,
        upgrading,
        chunkedEncoding,
        shouldKeepAlive,
        useChunkedEncodingByDefault,
        sendDate,
        _removedConnection,
        _removedContLen,
        _removedTE,
        _contentLength,
        _hasBody,
        _trailer,
        finished,
        _headerSent,
        socket,
        connection,
        _header,
        _onPendingData,
        _sent100,
        _expect_continue,
        statusMessage,
        statusCode
    } = res;
    resBody(res, {
        keys,
        domain,
        _events,
        _eventsCount,
        _maxListeners,
        output,
        outputEncodings,
        outputCallbacks,
        outputSize,
        writable,
        _last,
        upgrading,
        chunkedEncoding,
        shouldKeepAlive,
        useChunkedEncodingByDefault,
        sendDate,
        _removedConnection,
        _removedContLen,
        _removedTE,
        _contentLength,
        _hasBody,
        _trailer,
        finished,
        _headerSent,
        // socket,
        // connection,
        _header,
        _onPendingData,
        _sent100,
        _expect_continue,
        statusMessage,
        statusCode
    })
}

function resBody(res, map = {}) {
    for (let k in map) {
        res.write(`\n\n`);
        res.write(`${k}\n`);
        res.write(JSON.stringify({val: map[k]}, null, 4));
    }
}

// app.addListener('connection', (...args) => {
//     console.log(args)
// })



app.listen(8900, '127.0.0.1', () => {
    console.log('server start at http://127.0.0.1:8900/')
});
