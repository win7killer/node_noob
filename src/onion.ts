/**
 * 模拟实现一个洋葱
 */

type OnionInstance = {
    add: Function,
    remove: Function,
    apply: Function
};

type QueenItem = {
    name: string,
    handle: Function
};

type Req = {
    url: string,
};
type Res = {
    body: string,
    end: Function
};
type Context = {
    req: Req,
    res: Res
};

class Onion {
    queen: Array<any>;
    index: number;
    ctx: Context;
    constructor() {
        this.queen = [];
        this.index = 0;
    }
    add(name: string | Function, handle: Function | string) {
        handle = handle || name;
        this.queen.push({
            name,
            handle
        });
        return this;
    }
    remove(index: string | number) {

        return this;
    }
    async apply(ctx: Context) {
        this.ctx = ctx;
        await this.next();
        this.ctx.res.end();
    }
    async next() {
        let temp: QueenItem = this.queen[this.index++];
        if (temp) {
            return temp.handle(this.ctx, this.next.bind(this));
        } else {
            return true;
        }
    }
}


// --------------- test ----------------

const onion: OnionInstance = new Onion();

onion.add(async (ctx: Context, next: Function) => {
    console.log('111 start');
    console.log('ctx.req.url: %o', ctx.req.url);
    await next();
    ctx.res.body += '111\n';
    console.log('111 end');
}).add(async (ctx: Context, next: Function) => {
    console.log('222 start');
    await next();
    ctx.res.body += '222\n';
    console.log('2222 end');
});

const context: Context = {
    req: {
        url: '/a/b/c'
    },
    res: {
        body: '',
        end() {
            console.log('res.body end, can be print');
            console.log('res.body: %o', context.res.body);
        }
    }
}

console.log('onion\n %o', onion)
onion.apply(context);
