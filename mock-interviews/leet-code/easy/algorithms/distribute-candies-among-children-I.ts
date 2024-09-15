/**
 * You are given two positive integers n and limit.

Return the total number of ways to distribute n candies among 3 children such that no child gets more than limit candies.
 */

function distributeCandies(n: number, limit: number): number {
    let count = 0;
    for (let i = 0; i <= limit; i++) {
        for (let j = 0; j <= limit; j++) {
            for (let k = 0; k <= limit; k++) {
                if (i + j + k === n) {
                    count++;
                }
            }
        }
    }
    return count;
}

console.log(distributeCandies(5, 2));
console.log(distributeCandies(3, 3));
