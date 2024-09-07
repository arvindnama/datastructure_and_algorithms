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
    const amountSpent: number[] = [0];
    for (const day of days) {
        amountSpent[day] = 1; // indication that we are traveling on that day
    }

    for (let curDay = 1; curDay < amountSpent.length; curDay++) {
        if (!amountSpent[curDay]) {
            // not traveling on this day
            // so the amount spent will be same as pervious day
            amountSpent[curDay] = amountSpent[curDay - 1];
            continue;
        }
        // we are traveling
        amountSpent[curDay] = Math.min(
            amountSpent[curDay - 1] + costs[0],
            (amountSpent[curDay - 7] ?? 0) + costs[1],
            (amountSpent[curDay - 30] ?? 0) + costs[2]
        );
    }
    return amountSpent[amountSpent.length - 1];
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));
console.log(
    mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
);

/**
 * Dynamic programming --> Tabulation .
 *
 * here we create a table to keep track of the running cost with  (amounts)
 *
 * initialize amounts with all days that we need to travel as 1
 *
 * for all the days for travel
 *  if we are traveling on that day ,
 *      cost to travel on that day is min of:
 *          1. cost to travel one day before + 1 day pass
 *          2. cost to travel 7 days before + 7 day pass
 *          3. cost to travel 30 days before + 30 day pass
 *       we need to go back 7 days or 30 days just so if during that period if we had to
 *       travel and we ended up other solution , we need to correct them
 * if we are not traveling on that day , our amount will be same as pervious day
 *
 * return the final amount of the last day
 */
