/**
 * Given an integer array of coins[ ] of size N representing different types of denominations and an integer sum, the task is to count all combinations of coins to make a given value sum.
 *
 * Note: Assume that you have an infinite supply of each type of coin.
 *
 *
 *  We start with either
 *   - including the last coin Or
 *   - excluding the last coin
 *  recurse till sum is zero or we run out of coins.
 * if sum is zero we have `1` possible solution
 *   n: no. of coins
 *   s: sum requested
 *   count(s,n) => no. of count needed to reach target sum with n coins
 *
 *   count(0,n) == 1
 *   count(s, 0) || count (s, -1) == 0 (no luck)
 */

const countCoins = (coins: number[], sum: number, n: number): number => {
    if (n <= 0 || sum < 0) return 0; // no more coins left of cannot reach target sum

    if (sum === 0) return 1; // target sum reached and this is `1` such possibility

    // note we have unlimited supply of coins so when we include nth coin we done remove it from coins array
    const countWhenNthCoinIncluded = countCoins(coins, sum - coins[n - 1], n);
    const countWhenNthCoinExcluded = countCoins(coins, sum, n - 1);
    return countWhenNthCoinIncluded + countWhenNthCoinExcluded;
};

let coins = [1, 2, 3],
    sum = 4;
console.log(
    `Count coins: ${coins} sum :${sum}: Possibilities`,
    countCoins(coins, sum, coins.length)
);

coins = [2, 5, 3, 6];
sum = 10;
console.log(
    `Count coins: ${coins} sum :${sum}: Possibilities`,
    countCoins(coins, sum, coins.length)
);
