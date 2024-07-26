/**
 * Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve with a number. The returned promise should resolve with the sum of the two numbers.
 */

type P = Promise<number>;

async function addTwoPromises(promise1: P, promise2: P): P {
    return Promise.all([promise1, promise2]).then(([p1, p2]) => p1 + p2);
}

addTwoPromises(Promise.resolve(1), Promise.resolve(2)).then(console.log);
