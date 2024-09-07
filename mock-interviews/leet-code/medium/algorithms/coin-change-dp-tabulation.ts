/**
 * You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
 */

function coinChange(coins: number[], amount: number): number {
    const minCoins: number[] = new Array(amount + 1).fill(Infinity);
    minCoins[0] = 0;

    for (let curAmount = 1; curAmount <= amount; curAmount++) {
        // fin the min coins needed for the curAmount.
        // start with pick each and every coin from coins[]
        const possibleSolsNoOfCoinsForCurAmt = [];
        for (const coin of coins) {
            const remAmt = curAmount - coin;
            // if remAmt < 0 means this coin cannot be picked
            if (remAmt < 0) continue;
            possibleSolsNoOfCoinsForCurAmt.push(1 + minCoins[remAmt]);
        }
        if (possibleSolsNoOfCoinsForCurAmt.length)
            minCoins[curAmount] = Math.min(...possibleSolsNoOfCoinsForCurAmt);
    }

    return minCoins[minCoins.length - 1] === Infinity
        ? -1
        : minCoins[minCoins.length - 1];
}

console.log(coinChange([1, 2, 5], 5));
console.log(coinChange([1, 2, 5], 11));

/**
 *  Solution via DP tabulations .
 *
 *  1. create a tabulation array (amounts) of length == amount +1
 *     this array will keep track of min coins needs
 *     i.e idx = amount & amounts[idx] = min coins needed.
 *
 *  2. we will need start filling coins needed for each amount starting from zero
 *    by default for amount = 0 we need 0 counts
 *    hence amounts[0] = 0 & initialize all other entries with Infinite value (easy for performing Math.min operations)
 *
 *  3. for every curAmount = 1 to amount
 *      try each coin , k = 0 --> coins.length , --> coinPicked = coin[k]
 *      for the picked coin the remainderAmount is curAmt - coinPicked
 *       if remainderAmount < zero then coinPicked is not possible -> skip it
 *      if remainderAmount is zero or more
 *       total coins needed if this coins is picked will 1 + amounts[reminderAmt]
 *        (note amounts array stores all min coins needed.)
 *       then we need to update amount array if it has some other solution from previous iteration
 *
 * finally amounts[amount-1] will hold the min coins if value is Infinite return -1 i.e mean there is no solution
 *
 */
