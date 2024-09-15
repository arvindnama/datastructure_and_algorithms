/**
 * You have a list arr of all integers in the range [1, n] sorted in a strictly increasing order. Apply the following algorithm on arr:

Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.
Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.
Keep repeating the steps again, alternating left to right and right to left, until a single number remains.
Given the integer n, return the last number that remains in arr
 */

function lastRemaining(n: number): number {
    const arr = new Array(n).fill(null).map((_, idx) => idx + 1);

    const eliminateGame = (arr: number[], order: number): number => {
        if (arr.length === 1) return arr[0];
        const res = [];
        const lastIdx = arr.length - 1;
        for (let i = 0; i <= lastIdx; i++) {
            if (order == 0 && i % 2 === 0) continue;
            if (order == 1 && (lastIdx - i) % 2 === 0) continue;

            res.push(arr[i]);
        }
        return eliminateGame(res, (order + 1) % 2);
    };

    return eliminateGame(arr, 0);
}

console.log(lastRemaining(9));
console.log(lastRemaining(6));
