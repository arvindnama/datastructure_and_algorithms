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
     * Here we can use DP with tabulation
     * calender from 0 -> last day for travel  (0 dummy just for easy indexing)
     * initial step is to mark the days that i will travel as 1 (this is optional as we can get that info from days itself)
     *  calender will eventually hold the cost calculations for the day.
     * loop from 1 to calender.length -1
     * calender[i] === 1 -> travel day
     *    need to decide if day pass / weekly pass / monthly pass is better.
     *    if i choose day pass , cost for day will cost of previous day + day pass
     *    if i choose 7-day pass , cost for day will cost 7 days prior +  7 day pass
     *    if i choose 30-day pass , cost for day will cost 30 days prior + 30  day pass
     *
     *    the min of these 3 is the best for cur day.
     *
     * calender[i] undefined -> no travel day ==> my cost will same as previous day
     *    calender[i] = calender[i-1]
     *
     * At the end calender[calender.length - 1] will have the min cost for travel
     */

    const calender = [0];
    for (const day of days) calender[day] = 1;

    for (let i = 1; i < calender.length; i++) {
        if (calender[i] === undefined) {
            calender[i] = calender[i - 1];
            continue;
        }

        calender[i] = Math.min(
            calender[i - 1] + costs[0],
            (calender[i - 7] ?? 0) + costs[1],
            (calender[i - 30] ?? 0) + costs[2]
        );
    }

    return calender[calender.length - 1];
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));
console.log(
    mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
);
