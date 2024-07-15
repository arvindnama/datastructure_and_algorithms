/**
 * An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return true if n is an ugly number.
 */

function isUgly(n: number): boolean {
    if (n <= 0) return false;

    while (n > 1) {
        if (n % 2 === 0) n = n / 2;
        else if (n % 3 === 0) n = n / 3;
        else if (n % 5 === 0) n = n / 5;
        else return false;
    }
    return true;
}

console.log(isUgly(6));
console.log(isUgly(1));
console.log(isUgly(14));
console.log(isUgly(2 * 3 * 5 * 7));
