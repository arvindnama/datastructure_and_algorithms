/**
 * In this question, the candidate needs to implement a function customPop that mimics the behaviour of Array.prototype.pop method.
 */

declare global {
    interface Array<T> {
        customPop(): T | undefined;
    }
}

Array.prototype.customPop = function <T>(): T | undefined {
    if (this.length === 0) return undefined;

    const val = this[this.length - 1];
    this.length--;
    return val;
};

const array = [1, 2, 3];
const popped = array.pop();

// prints 3
console.log(popped);

// prints [1,2]
console.log(array);
