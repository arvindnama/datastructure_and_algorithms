/**
 * In this question, you need to create a function that accepts a callback and restricts its invocation to at most once.
 *
 * Repeat calls to the function return the value of the first invocation. The callback is invoked with the this binding and arguments of the created function.
 */

type Callback = (...args: unknown[]) => unknown;

function once(callback: Callback): Callback {
    if (!callback) return callback;

    let res: unknown;
    return function (...args: unknown[]): unknown {
        if (res) return res;
        res = callback(args);
        return res;
    };
}

class Foo {
    private get random() {
        return Math.random();
    }
    public execute(a: number, b: number): number {
        console.log('execute called');
        return this.random + a + b;
    }
}

const foo = new Foo();

const onceFn = once(foo.execute.bind(foo) as Callback);

const val1 = onceFn(1, 2);
const val2 = onceFn(1, 2);

console.assert(val1 === val2, 'values should not change');
console.log('All tests passed');
