/**
 * You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array days. Each day is an integer from 1 to 365.

Train tickets are sold in three different ways:

a 1-day pass is sold for costs[0] dollars,
a 7-day pass is sold for costs[1] dollars, and
a 30-day pass is sold for costs[2] dollars.
The passes allow that many days of consecutive travel.

For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
Return the minimum number of dollars you need to travel every day in the given list of days.
 */

function mincostTickets(days: number[], costs: number[]): number {
    /**
     * we can use dp to solve this problem.
     *
     *  for every day you travel the cost to travel on that day is
     *  the min of
     *      cost of travel on previous day + day pass
     *      cost of travel 7 days prior + 7 day pass
     *      cost of travel 30 days prior + 30 days pass.
     *
     */
    const dp: number[] = [0];
    for (const day of days) dp[day] = 1; // marking all the days of travel.

    for (let i = 1; i < dp.length; i++) {
        if (dp[i] !== 1) {
            // not travelling on this day cost wont change
            dp[i] = dp[i - 1];
            continue;
        }
        // travel on this day.
        // see if taking a day pass is better or taking a 7day pass 7 days ago was better
        // or taking a 30 days pass 30 days ago was better.

        const dayPass = dp[i - 1] + costs[0];
        const weekPass = (dp?.[i - 7] ?? 0) + costs[1];
        const monthPass = (dp?.[i - 30] ?? 0) + costs[2];
        dp[i] = Math.min(dayPass, weekPass, monthPass);
    }
    return dp[dp.length - 1];
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));
console.log(
    mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
);
