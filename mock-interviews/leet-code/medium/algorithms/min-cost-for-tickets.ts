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
     * dynamic programming .
     *  Min (pick 1 day pass, pick 7 day pass, pick 30 day pass) on that day
     *  idx >= lenght of days return the calculated amount
     */

    const findMinCost = (idx: number, amount: number): number => {
        if (idx >= days.length) return amount;

        const endOfWeekPass = days[idx] + 7; // need to find last idx where days[idx] < endofWeekPass
        const endOfMonthPass = days[idx] + 30;
        let [idx2, idx3] = [idx, idx];
        for (; days[idx2] < endOfWeekPass; idx2++);
        for (; days[idx3] < endOfMonthPass; idx3++);
        const costOneDayPass = findMinCost(idx + 1, costs[0] + amount);
        const costWeekPass = findMinCost(idx2, costs[1] + amount);
        const costMonthPass = findMinCost(idx3, costs[2] + amount);
        return Math.min(costOneDayPass, costWeekPass, costMonthPass);
    };

    return findMinCost(0, 0);
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));
console.log(
    mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
);
