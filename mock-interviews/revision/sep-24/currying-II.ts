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
    const totalArgs = fn.length;
    let accumulatedArgs: number[] = [];

    const innerFn = (...args: number[]) => {
        const curAccArgs = args.length + accumulatedArgs.length;
        accumulatedArgs = [...accumulatedArgs, ...args];
        if (curAccArgs >= totalArgs) {
            return valueOf();
        }
        return innerFn;
    };
    const valueOf = () => {
        // in case the valueOf is called before all the args are passed.
        // it might return undesired res based on fn handler
        // we can handle that case by filling default value
        // or leaving it to the handler
        const res = fn(...accumulatedArgs);
        accumulatedArgs = [];
        return res;
    };

    innerFn.valueOf = valueOf;
    innerFn.value = valueOf();
    return innerFn;
};

const curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3, 4, 5));
console.log(curriedSum(1)(2, 3)(4, 5));
console.log(curriedSum(1)(2)(3)(4)(5));
console.log(+curriedSum(1)(2)(3)(4));
