/**
 * You are given a 0-indexed circular string array words and a string target. A circular array means that the array's end connects to the array's beginning.

Formally, the next element of words[i] is words[(i + 1) % n] and the previous element of words[i] is words[(i - 1 + n) % n], where n is the length of words.
Starting from startIndex, you can move to either the next word or the previous word with 1 step at a time.

Return the shortest distance needed to reach the string target. If the string target does not exist in words, return -1.
 */

function closetTarget(
    words: string[],
    target: string,
    startIndex: number
): number {
    const n = words.length;
    let distanceFwd = 0;
    for (let i = startIndex; distanceFwd < n; distanceFwd++, i = (i + 1) % n) {
        if (words[i] === target) {
            break;
        }
    }
    if (distanceFwd === n) return -1;
    let distanceBck = 0;
    for (
        let i = startIndex;
        distanceBck < n;
        distanceBck++, i = (i - 1 + n) % n
    ) {
        if (words[i] === target) {
            break;
        }
    }

    return Math.min(distanceFwd, distanceBck);
}

console.log(
    closetTarget(['hello', 'i', 'am', 'leetcode', 'hello'], 'hello', 1)
);
console.log(closetTarget(['a', 'b', 'leetcode'], 'leetcode', 0));
console.log(closetTarget(['a', 'b', 'leetcode'], 'leetcode', 2));
console.log(closetTarget(['i', 'eat', 'leetcode'], 'ate', 1));
