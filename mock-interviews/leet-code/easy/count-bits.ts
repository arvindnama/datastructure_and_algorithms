/**
 * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 */

function countBits(n: number): number[] {
    /**
     * if n is even count of bits same as that of  n/2
     * if n is odd count of bits same as that of  1 + n/2
     *
     */

    if (n === 0) return [0];
    if (n === 1) return [0, 1];
    const res = [0, 1];
    for (let i = 2; i <= n; i++) {
        res[i] = i % 2 === 0 ? res[i / 2] : 1 + res[Math.floor(i / 2)];
    }

    return res;
}

console.log(countBits(2));
console.log(countBits(5));
console.log(countBits(10));
