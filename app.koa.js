const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log('step1 start');
    ctx.body = 'hello world';
    next();
    console.log('step1 end');

});

app.use(async (ctx, next) => {
    console.log('setp2 start');
    console.log(ctx.body);
    console.log('setp2 end');

})




app.listen(3000);
