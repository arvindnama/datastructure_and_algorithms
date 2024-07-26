/**
 * Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.

You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.
 */

function addStrings(num1: string, num2: string): string {
    const maxLen = Math.max(num1.length, num2.length);

    const zeroCode = '0'.charCodeAt(0);

    let carry = '0';
    const getCode = (s: string) => s.charCodeAt(0) - zeroCode;

    let res = '';
    for (let i = 0; i < maxLen; i++) {
        const n1 = num1.length - 1 - i >= 0 ? num1[num1.length - 1 - i] : '0';
        const n2 = num2.length - 1 - i >= 0 ? num2[num2.length - 1 - i] : '0';

        const r = getCode(n1) + getCode(n2) + getCode(carry);

        carry = `${Math.floor(r / 10)}`;
        res = `${r % 10}${res}`;
    }

    return carry !== '0' ? `${carry}${res}` : res;
}

console.log(addStrings('11', '123'));
console.log(addStrings('456', '77'));
console.log(addStrings('0', '0'));
