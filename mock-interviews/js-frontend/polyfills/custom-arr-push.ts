/**
 * In this question, the candidate needs to implement a function customPush that mimics the behavior of Array.prototype.push method.
 * More about Array.prototype.push
 * The push() method adds one or more elements to the end of an array and returns the new length of the array.
 */

declare global {
    interface Array<T> {
        customPush(...args: T[]): number;
    }
}

Array.prototype.customPush = function <T>(...args: T[]): number {
    const curLen = this.length;

    if (!args) return curLen;

    for (let i = curLen; i < curLen + args.length; i++) {
        this[i] = args[i - curLen];
    }

    return this.length;
};

console.log('Running tests');
const array: Array<unknown> = [1, 2, 3, 4];
console.assert(array.customPush(5, 6, 7, 8) === 8);
console.log('array.customPush(5, 6, 7, 8) ::', array);

console.assert(array.customPush('a', 'b') === 10);
console.log(`array.customPush('a', 'b') ::`, array);

console.assert(array.customPush({ a: 11 }, { b: 12 }) === 12);
console.log(`array.customPush(({ a: 11 }, { b: 12 }) ::`, array);

console.log('Tests done');
