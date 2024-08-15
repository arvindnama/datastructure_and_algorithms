/**
 * Given two numbers M and N. The task is to find the position of the rightmost different bit in the binary representation of numbers. If both M and N are the same then return -1 in this case.
 */

const rightMostDiffBit = (m: number, n: number): number => {
    let pos = 0;
    while ((m & 1) === (n & 1)) {
        pos++;
        m >>= 1;
        n >>= 1;
    }
    return pos == 0 ? -1 : pos + 1;
};

console.log(rightMostDiffBit(11, 9));
console.log(rightMostDiffBit(52, 4));
