/**
 * Write a function that evaluates the following expression.
 *

function sum(a, b, c, d) {
  return a + b + c + d;
}

let curriedSum = curry(sum);

console.log(curriedSum(1,2,3,4,5)); // 10
console.log(curriedSum(1)(2,3)(4,5)); // 10
console.log(curriedSum(1)(2)(3)(4)); // 10
 */

function sum(a: number, b: number, c: number, d: number, e: number): number {
    return a + b + c + d + e;
}

const curry = (fn: (...args: number[]) => number): any => {
    return (...args: number[]) => {
        let store = args;

        if (store.length >= fn.length) {
            return fn(...store);
        }
        const funcCb = (...args: number[]) => {
            store = [...store, ...args];
            if (store.length >= fn.length) {
                return fn(...store);
            }
            return funcCb;
        };
        (funcCb as any).valueOf = fn(...store);
        (funcCb as any).value = (funcCb as any).valueOf;

        return funcCb;
    };
};

const curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3, 4, 5));
console.log(curriedSum(1)(2, 3)(4, 5));
console.log(curriedSum(1)(2)(3)(4)(5));
console.log(+curriedSum(1)(2)(3)(4));
