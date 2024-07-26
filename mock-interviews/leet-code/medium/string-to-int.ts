/**
 *
 * Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity is neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
Return the integer as the final result.


 */

function myAtoi(s: string): number {
    s = s.trimStart();
    const isNeg = s[0] === '-';
    let i = s.startsWith('-') || s.startsWith('+') ? 1 : 0;
    let res = 0;
    for (; i < s.length; i++) {
        if (!s[i].match(/\d/)) break;
        res = res * 10 + parseInt(s[i]);
        if (!isNeg && res > 2 ** 31 - 1) return 2 ** 31 - 1;
        if (isNeg && res > 2 ** 31) return -1 * 2 ** 31;
    }

    return isNeg ? -1 * res : res;
}

console.log(myAtoi('42'));
console.log(myAtoi('-042'));
console.log(myAtoi('13376c05'));
console.log(myAtoi('0-1'));
console.log(myAtoi('words and 987"'));
console.log(myAtoi('123.4'));
console.log(myAtoi('2147483648'));
console.log(myAtoi('-2147483649'));
