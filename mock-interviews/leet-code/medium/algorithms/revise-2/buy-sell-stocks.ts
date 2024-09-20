/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
*/

function maxProfit(prices: number[]): number {
    /*
       [7, 1, 5, 3, 6, 4]
        b  s                p = -6  mx = -6
           b  s             p = 4   mx 4
           b     s          p = 2   mx 4
           b        s       p = 5   mx 5
           b          s     p = 3   mx 5

       [7, 6, 5, 4, 3, 2, 1]
        b  s                 p = -1 mx = -1
           b  s              p = -1 mx = -1
              b  s           p = -1 mx = -1
                 b  s        p = -1 mx = -1
                    b  s     p = -1 mx = -1
                          bs p = -1 mx = -1
    */
    let maxProfit = 0;
    let buyIdx = 0;
    for (let sellIdx = 1; sellIdx < prices.length; sellIdx++) {
        const curProfit = prices[sellIdx] - prices[buyIdx];
        maxProfit = Math.max(curProfit, maxProfit);
        if (prices[sellIdx] < prices[buyIdx]) {
            buyIdx = sellIdx;
        }
    }

    return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 5, 4, 3, 2, 1]));
