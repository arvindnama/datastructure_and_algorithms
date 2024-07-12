/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
*/

function maxProfit(prices: number[]): number {
    /**
     * buy on the day the stock is low & sell on the day stock is high.
     * on any ith day we will see max profit when we buy on day who's val is lowest
     * i.e. minValue (amount 0 to i)
     *
     * For a o(n) solution as we iterate we will need to keep track of the minVal (till i)
     * i - minVal will be the max profit we get if we have to sell on ith day.
     */

    let [maxProfit, minVal] = [0, prices[0]];
    for (let i = 1; i < prices.length; i++) {
        const curProfit = prices[i] - minVal;
        // let check if curProfit is the max so far ??
        maxProfit = Math.max(maxProfit, curProfit);
        // also lets update minValue if prices[i]is less than minVal
        minVal = Math.min(prices[i], minVal);
    }
    return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 5, 4, 3, 2, 1]));
