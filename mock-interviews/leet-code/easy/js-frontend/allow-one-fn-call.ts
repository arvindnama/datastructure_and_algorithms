/**
 * Given a function fn, return a new function that is identical to the original function except that it ensures fn is called at most once.

The first time the returned function is called, it should return the same result as fn.
Every subsequent time it is called, it should return undefined.
 */

type JSONValue =
    | null
    | boolean
    | number
    | string
    | JSONValue[]
    | { [key: string]: JSONValue };
type OnceFn = (...args: Array<JSONValue>) => JSONValue | undefined;

function once(fn: (...args: Array<JSONValue>) => JSONValue): OnceFn {
    let counter = 1;
    return function (...args: Array<JSONValue>) {
        if (counter++ === 1) return fn(...args);
    };
}

const fn = (a: number, b: number, c: number) => a + b + c;
const onceFn = once(fn as any);

console.log(onceFn(1, 2, 3)); // 6
console.log(onceFn(2, 3, 6)); // returns undefined without calling fn
