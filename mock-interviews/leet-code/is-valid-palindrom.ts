/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

*/

function isPalindrome(s: string): boolean {
    const [aCharCode, zCharCode] = ['a'.charCodeAt(0), 'z'.charCodeAt(0)];
    const [ACharCode, ZCharCode] = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];

    const isAlphabet = (c: string) => isUpper(c) || isLower(c);
    const isUpper = (c: string) =>
        c.charCodeAt(0) >= ACharCode && c.charCodeAt(0) <= ZCharCode;
    const isLower = (c: string) =>
        c.charCodeAt(0) >= aCharCode && c.charCodeAt(0) <= zCharCode;

    const toUpper = (c: string) =>
        isAlphabet(c) && !isUpper(c)
            ? String.fromCharCode(ACharCode + (c.charCodeAt(0) - aCharCode))
            : c;

    const removeNonAlphaChars = (c: string) => c.replace(/([^a-z0-9A-Z])/g, '');

    const alphaS = removeNonAlphaChars(s);

    let [i, j] = [0, alphaS.length - 1];

    while (i < j) {
        if (toUpper(alphaS[i]) !== toUpper(alphaS[j])) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

console.log(isPalindrome('A man, a plan, a canal: Panama'));
console.log(isPalindrome('race a car'));
console.log(isPalindrome(' aa '));
