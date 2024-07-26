/**
 * You are given a large integer represented as an integer array digits, where each digits
 * [i] is the ith digit of the integer. The digits are ordered from most significant to
 * least significant in left-to-right order. The large integer does not contain any leading 0's.
 *
 * Increment the large integer by one and return the resulting array of digits.
 */

function plusOne(digits: number[]): number[] {
    let carry = 1;

    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i] = digits[i] + carry;
        carry = Math.floor(digits[i] / 10);
        digits[i] = digits[i] % 10;
    }

    if (carry > 0) {
        digits.unshift(carry);
    }

    return digits;
}

console.log(plusOne([1, 2, 3]));
console.log(plusOne([9]));
console.log(plusOne([9, 9]));
console.log(plusOne([9, 9, 9]));
