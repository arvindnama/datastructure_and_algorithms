/**
 * The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
Given an integer num, return its complement.
 */

function findComplement(num: number): number {
    let complement = 0;
    let bitCounter = 0;
    while (num > 0) {
        const lsb = num & 1;
        const lsbFlip = lsb == 1 ? 0 : 1;
        complement = (lsbFlip << bitCounter) | complement;
        num = num >> 1;
        bitCounter++;
    }
    return complement;
}

console.log(findComplement(5));
console.log(findComplement(1));
console.log(findComplement(2));
console.log(findComplement(8));
console.log(findComplement(16));
