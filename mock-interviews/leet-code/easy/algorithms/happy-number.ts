/**
 * Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.
 */

function isHappy(n: number): boolean {
    const getSqOfNo = (n: number): number => {
        let res = 0;
        while (n) {
            const r = n % 10;
            res += r ** 2;
            n = Math.floor(n / 10);
        }
        return res;
    };

    const tracker: number[] = [];
    while (n !== 1 && !tracker.includes(n)) {
        tracker.push(n);
        n = getSqOfNo(n);
    }
    return n === 1;
}

console.log(isHappy(19));
console.log(isHappy(2));
console.log(isHappy(3));
