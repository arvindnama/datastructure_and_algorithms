/**
 * Given a positive integer num, return true if num is a perfect square or false otherwise.

A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as sqrt.
 */

function isPerfectSquare(num: number): boolean {
    let [l, r] = [1, num];
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        const temp = mid * mid;
        if (temp === num) return true;
        if (temp < num) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}

console.log(isPerfectSquare(16));
console.log(isPerfectSquare(14));
console.log(isPerfectSquare(9));
console.log(isPerfectSquare(100));
