/**
 * Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.

promise resolves:

When all the promises returned from functions were resolved successfully in parallel. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions. The promise should resolve when all the asynchronous functions in the array have completed execution in parallel.
promise rejects:

When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
Please solve it without using the built-in Promise.all function.
 */

type Fn<T> = () => Promise<T>;

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        const results: { [idx in number]: T } = {};
        functions.forEach((func, idx) => {
            func()
                .then((result) => {
                    results[idx] = result;
                    if (Object.keys(results).length === functions.length) {
                        // all done ..
                        const resultsInOrder = Object.keys(results)
                            .map((k) => parseInt(k))
                            .sort()
                            .map((k) => results[k]);

                        resolve(resultsInOrder);
                    }
                })
                .catch((e) => reject(e));
        });
    });
}

const promise = promiseAll([
    () => new Promise((res) => setTimeout(() => res(1), 200)),
    () => new Promise((res) => setTimeout(() => res(2), 100)),
    () => new Promise((res) => setTimeout(() => res(3), 50)),
    () => new Promise((res) => setTimeout(() => res(4), 10)),
    () => new Promise((res, rej) => setTimeout(() => rej('aaa'), 1000)),
]);
promise.then(console.log).catch(console.log);
