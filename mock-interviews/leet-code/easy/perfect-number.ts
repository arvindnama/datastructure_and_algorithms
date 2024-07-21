/**
 * A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. A divisor of an integer x is an integer that can divide x evenly.

Given an integer n, return true if n is a perfect number, otherwise return false.
 */

function checkPerfectNumber(num: number): boolean {
    let temp = 1;
    let sum = 0;
    const divisors: number[] = [];
    while (temp <= num / 2) {
        if (num % temp === 0) {
            divisors.push(temp);
            sum += temp;
        }
        temp++;
    }

    return num === sum;
}

console.log(checkPerfectNumber(6));
console.log(checkPerfectNumber(28));
console.log(checkPerfectNumber(496));
console.log(checkPerfectNumber(8128));
console.log(checkPerfectNumber(7));
console.log(checkPerfectNumber(100));
console.log(checkPerfectNumber(2016));
