/**
 * Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.

You may assume the array is the output of JSON.parse.

 */

declare global {
    interface Array<T> {
        last(): T | -1;
    }
}

Array.prototype.last = function () {
    const last = this.at(this.length - 1);
    return last === undefined ? -1 : last;
};

console.log([1, 2, 3].last());
console.log([1, 2, 0].last());
console.log([1, 2, null].last());
console.log([1, 2, {}].last());
console.log([1, 2, { a: '1' }].last());
