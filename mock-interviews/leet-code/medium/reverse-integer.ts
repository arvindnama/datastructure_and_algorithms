/**
 * Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
 */

function reverse(x: number): number {
    const maxInt = 2 ** 31;

    const isNeg = x < 0;
    x = Math.abs(x);
    let revInt = 0;
    while (x) {
        const reminder = x % 10;
        revInt = revInt * 10 + reminder;
        x = Math.floor(x / 10);
    }
    if (revInt > maxInt) return 0;
    return isNeg ? -1 * revInt : revInt;
}

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));
console.log(reverse(-1 * 2 ** 31));
console.log(reverse(2 ** 32));
console.log(reverse(-2147483412));
