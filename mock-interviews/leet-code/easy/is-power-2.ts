/**
 * Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2x.
 */

function isPowerOfTwo(n: number): boolean {
    if (n <= 0) return false;
    return !(n & (n - 1));
}

console.log(isPowerOfTwo(-16));
console.log(isPowerOfTwo(1));
console.log(isPowerOfTwo(16));
console.log(isPowerOfTwo(2));
console.log(isPowerOfTwo(3));
