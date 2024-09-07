/**
 * You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
 */

function coinChange(coins: number[], amount: number): number {
    const cache: { [key in string]: number } = {};
    const findNoOfCoins = (
        idx: number,
        amount: number,
        coinsCount: number
    ): number => {
        if (idx < 0 || amount < 0) return Number.MAX_VALUE;
        if (amount === 0) return coinsCount;

        const key = `${idx}_${amount}`;
        if (cache[key] !== undefined) return cache[key];
        const pickCoinCase = findNoOfCoins(
            idx,
            amount - coins[idx],
            coinsCount + 1
        );
        const dintPickCoinCase = findNoOfCoins(idx - 1, amount, coinsCount);

        return Math.min(pickCoinCase, dintPickCoinCase);
    };
    coins.sort((a, b) => a - b);
    const res = findNoOfCoins(coins.length - 1, amount, 0);
    return res === Number.MAX_VALUE ? -1 : res;
}

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([1, 2, 5, 10], 18));
console.log(coinChange([186, 419, 83, 408], 6249));

/**
 *                           [1, 2, 5, ->10], 18
 *                  ->10, 8 (10)           ->5, 18
 *       ->10, -2 (20)     ->5, 3
 *                     ->5, -2   ->2 1
 *                           -> 2 -1  ->1 0
 */
