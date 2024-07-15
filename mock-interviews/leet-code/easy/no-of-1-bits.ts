/**
 * Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).

 */

function hammingWeight(n: number): number {
    let count = 0;
    // 32 being the max input (in bits)
    for (let i = 0; i < 32; i++) {
        if ((n >> i) & 1) count++;
    }

    return count;
}

console.log(hammingWeight(11));
console.log(hammingWeight(128));
console.log(hammingWeight(2147483645));
