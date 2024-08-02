/**
 * Given an integer array of coins[ ] of size N representing different types of denominations and an integer sum, the task is to count all combinations of coins to make a given value sum.

Note: Assume that you have an infinite supply of each type of coin.
https://www.geeksforgeeks.org/coin-change-dp-7/?ref=lbp
 */

function countCoins(coins: number[], sum: number): number {
    const map: { [k in string]: number } = {};
    const count = (coin: number, sum: number): number => {
        const key = `${coin}_${sum}`;
        if (sum === 0) return 1;
        if (sum < 0 || coin >= coins.length) return 0;
        if (map[key] !== undefined) return map[key];

        return (map[key] =
            count(coin, sum - coins[coin]) + count(coin + 1, sum));
    };

    return count(0, sum);
}

console.log(countCoins([1, 2, 3, 4], 4));
console.log(countCoins([2, 5, 3, 6], 10));
