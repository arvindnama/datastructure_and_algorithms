/**
 * Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.
 */

function reverseString(s: string[]): void {
    let [start, end] = [0, s.length - 1];

    while (start < end) {
        [s[start], s[end]] = [s[end], s[start]];
        start++;
        end--;
    }
}

let nums = ['h', 'e', 'l', 'l', 'o'];
reverseString(nums);
console.log(nums);

nums = ['H', 'a', 'n', 'n', 'a', 'h'];
reverseString(nums);
console.log(nums);
