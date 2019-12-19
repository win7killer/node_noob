const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const ROUTER_EXCLUDE = ['/favicon.ico'];
const STATIC_PATH = '/static';
let routerMap = new RouterMap();
routerMap.setItem('favicon.ico', (ctx) => {
    ctx.body = 'no data';
})

routerMap.setItem(STATIC_PATH, (ctx) => {
    let str = fs.readFileSync(ctx.url.substr(1), {
        encoding: 'utf-8'
    });
    ctx.body = str;
    ctx.type = ctx.request.header.accept;
})

routerMap.setItem('/', (ctx) => {
    console.log(123)
    ctx.body = template('./public/index.html', {
        some: 123,
        data: 'dddddddddddd'
    });
})

// console.log(routerMap.routers)

// app.use(async (ctx, next) => {
//     let handler = routerMap.getItem(ctx.req.url.substr(1));
//     handler && handler(ctx);
//     next();
// });


// app.use(async (ctx, next) => {
//     // console.log('url %o', ctx.req.url)
//     if (ROUTER_EXCLUDE.includes(ctx.req.url)) {
//         ctx.body = 'assets';
//         return;
//     }
//     next();
// });

// app.use(async (ctx, next) => {
//     let handler = routerMap.getItem(ctx.url);
//     if (ctx.url.indexOf(STATIC_PATH) > -1) {
//         handler = routerMap.getItem(STATIC_PATH);
//     }
//     handler(ctx);
//     next();
// });



function template(filePath, data = {}) {
    if (filePath) {
        let str = fs.readFileSync(filePath, {
            encoding: 'utf-8'
        });

        // console.log(str)

        const TIME_DEBUG = '\n[replace str]=========>';

        console.time(TIME_DEBUG);

        Object.keys(data).forEach(key => {
            let reg = new RegExp(`\\<\\{\\s*\\$${key}\\s*\\}\\>`, 'g');
            str = str.replace(reg, data[key]);
        });

        console.timeEnd(TIME_DEBUG);

        return str;
    }
}


function RouterMap() {
    const ROUTER_MAP = {};

    return {
        get routers() {
            return {
                ...ROUTER_MAP,
            };
        },
        getItem(path) {
            return ROUTER_MAP[path];
        },
        removeItem(path = '') {
            return delete ROUTER_MAP[path];
        },
        setItem(path, handler = (ctx) => {}) {
            ROUTER_MAP[path] = (ctx) => {
                return handler(ctx);
            };
            return !!ROUTER_MAP[path];
        },
        clear() {
            ROUTER_MAP
        }
    }
}


app.listen(3000);
