/**
 * Implement Reduce Polyfill from Scratch | Frontend Problem Solving | JavaScript Interview Question
 *
 */

declare global {
    interface Array<T> {
        customReduce<K>(
            callback: (acc: K, cur: T, index: number) => K,
            initialValue: K
        ): K;
    }
}

Array.prototype.customReduce = function <T, K>(
    callback: (acc: K, cur: T, index: number) => K,
    initialValue: K
): K {
    if (!callback) return initialValue;

    let res = initialValue;
    for (let i = 0; i < this.length; i++) {
        res = callback(res, this[i], i);
    }
    return res;
};

const array = [1, 2, 3, 4];

const custRes = array.customReduce((acc, cur) => acc + cur, 0);
const res = array.reduce((acc, cur) => acc + cur, 0);
console.assert(
    custRes === res,
    `custom res : ${custRes} should be as as actual res ${res}`
);
