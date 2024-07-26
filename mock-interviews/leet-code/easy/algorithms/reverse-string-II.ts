/**
 * Given a string s and an integer k, reverse the first k characters for every 2k characters counting from the start of the string.

If there are fewer than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and leave the other as original.
 */

function reverseStr(s: string, k: number): string {
    const reverse = (a: string) => a.split('').reverse().join('');

    if (s.length < k) {
        return reverse(s);
    }

    if (s.length >= k && s.length < 2 * k) {
        return `${reverse(s.slice(0, k))}${s.slice(k)}`;
    }

    return `${reverse(s.slice(0, k))}${s.slice(k, 2 * k)}${reverseStr(s.slice(2 * k), k)}`;
}

console.log(reverseStr('abcdefg', 2));
console.log(reverseStr('abcd', 2));
