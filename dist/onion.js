/**
 * 模拟实现一个洋葱
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Onion {
    constructor() {
        this.queen = [];
        this.index = 0;
    }
    add(name, handle) {
        handle = handle || name;
        this.queen.push({
            name,
            handle
        });
        return this;
    }
    remove(index) {
        return this;
    }
    apply(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ctx = ctx;
            yield this.next();
            this.ctx.res.end();
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = this.queen[this.index++];
            if (temp) {
                return temp.handle(this.ctx, this.next.bind(this));
            }
            else {
                return true;
            }
        });
    }
}
// --------------- test ----------------
const onion = new Onion();
onion.add((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('111 start');
    console.log('ctx.req.url: %o', ctx.req.url);
    yield next();
    ctx.res.body += '111\n';
    console.log('111 end');
})).add((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('222 start');
    yield next();
    ctx.res.body += '222\n';
    console.log('2222 end');
}));
const context = {
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
};
console.log('onion\n %o', onion);
onion.apply(context);
//# sourceMappingURL=onion.js.map