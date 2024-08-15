/**
 * Given a number n and a bit number k, check if kth index bit of n is set or not. A bit is called set if it is 1. Position of set bit '1' should be indexed starting with 0 from LSB side in binary representation of the number.
Note: Index is starting from 0. You just need to return true or false, driver code will take care of printing "Yes" and "No"
 */

const isKthBitSet = (n: number, k: number): boolean => {
    n = n >> k;
    return !!(n & 1);
};

console.log(isKthBitSet(0b100, 0));
console.log(isKthBitSet(0b100, 2));
console.log(isKthBitSet(0b101, 3));
