const Koa = require('koa');
const fs = require('fs');
const open = require('open');
const exec = require('child_process').execFileSync;
const kaoSession = require('koa-session');
const koaRouter = require('koa-router');
const compose = require('koa-compose');
const app = new Koa();
const router = new koaRouter();

router.get('/a', (ctx) => {
    ctx.body = 'aaaa';
})

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    let data = Object.keys(ctx).join('\n');
    data += '\n-------\n';
    // res.body = 'hello world';
    // data += Object.keys(res).join('\n');
    console.log(ctx.query)
    ctx.body = 'hello world' + ctx.querystring;
    fs.writeFile('temp_req_keys.md', data, (err) => {
        if (err) throw err;
        console.log('success');
    })
});

app.listen(3000, () => {
    console.log('start server with http://0.0.0.0:3000');
    // open('http://0.0.0.0:3000');

    // exec('atom')
});
