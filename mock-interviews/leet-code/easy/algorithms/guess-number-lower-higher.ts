/**
 * We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.
 */

const guessFnGenerator =
    (pick: number) =>
    (num: number): number =>
        num > pick ? -1 : num < pick ? 1 : 0;

function guessNumber(n: number): number {
    let [l, h] = [1, n];
    while (l <= h) {
        const mid = Math.floor((l + h) / 2);
        const g = guess(mid);
        if (g === 0) return mid;
        else if (g === -1) h = mid - 1;
        else l = mid + 1;
    }
    return -1;
}

let guess = guessFnGenerator(4);
console.log(guessNumber(10));

guess = guessFnGenerator(6);
console.log(guessNumber(10));

guess = guessFnGenerator(6);
console.log(guessNumber(6));

guess = guessFnGenerator(4);
console.log(guessNumber(6));

guess = guessFnGenerator(3);
console.log(guessNumber(6));
