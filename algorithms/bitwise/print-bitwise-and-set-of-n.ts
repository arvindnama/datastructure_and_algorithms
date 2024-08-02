/**
 * Given a number N, print all the numbers which are a bitwise AND set of the binary representation of N. Bitwise AND set of a number N is all possible numbers x smaller than or equal N such that N & i is equal to x for some number i.
 */

const printBitwiseN = (n: number): number[] => {
    return Array(n + 1)
        .fill(0)
        .map((_, i) => n & i)
        .filter((r, i) => r === i);
};

console.log('printBitwiseN', 5, printBitwiseN(5));
console.log('printBitwiseN', 9, printBitwiseN(9));
