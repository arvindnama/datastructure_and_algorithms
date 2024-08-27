/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
*/

function maxProfit(prices: number[]): number {
    /**
     * We buy on the day when price is low, and sell on a day (after we buy)
     * when the price is more to maximize the profit.
     */

    let [minVal, maxProfit] = [prices[0], 0];
    for (let i = 1; i < prices.length; i++) {
        // calculate the profit if i were to sell on ith day
        const curProfit = prices[i] - minVal;
        // update my maxProfit tracker if that is max.
        maxProfit = Math.max(maxProfit, curProfit);
        // if ith days price is lower than the previous
        // lower price , then update the price
        // so we might get a better profit if we sell on day > ith day
        minVal = Math.min(minVal, prices[i]);
    }

    return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 5, 4, 3, 2, 1]));
