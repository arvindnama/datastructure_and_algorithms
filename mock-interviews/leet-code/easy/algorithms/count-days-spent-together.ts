/**
 * Alice and Bob are traveling to Rome for separate business meetings.

You are given 4 strings arriveAlice, leaveAlice, arriveBob, and leaveBob. Alice will be in the city from the dates arriveAlice to leaveAlice (inclusive), while Bob will be in the city from the dates arriveBob to leaveBob (inclusive). Each will be a 5-character string in the format "MM-DD", corresponding to the month and day of the date.

Return the total number of days that Alice and Bob are in Rome together.

You can assume that all dates occur in the same calendar year, which is not a leap year. Note that the number of days per month can be represented as: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].
 */

function countDaysTogether(
    arriveAlice: string,
    leaveAlice: string,
    arriveBob: string,
    leaveBob: string
): number {
    /**
     * Convert mm-dd to day number format
     * for example
     * 01-01 = 1  (1st day of the year)
     * 02-01 = 32  (1st day of the year)
     *
     *
     * perform a prefix sum on daysInMoth.
     * conversion from string to day is daysInMonth[mm - 1] + dd
     *
     * aliceArrive = 08-15 --> daysInMonth[7] + 15 = 212 + 15 = 227
     * aliceLeave = 08-18 --> daysInMonth[7] + 18 = 212 + 18 = 230
     *
     * bobArrive = 08-16 --> daysInMonth[7] + 16 = 212 + 16 = 228
     * bobLeave = 08-19 --> daysInMonth[7] + 19 = 212 + 19 = 231
     *
     * Alice    227 - 230
     * Bob      228 - 231
     *
     * Sort by start date ,  there is a overlap if startDate2 < endDate1
     * Overlap  is max(s1, s2) - min(e1,e2) = 228 - 230
     * days = e - s - 230 - 228 = 2 + 1 (inclusive) = 3
     */

    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 1; i < daysInMonth.length; i++) {
        daysInMonth[i] = daysInMonth[i - 1] + daysInMonth[i];
    }

    const toDay = (d: string): number => {
        const [mm, dd] = d.split('-');
        return daysInMonth[parseInt(mm) - 1] + parseInt(dd);
    };

    let [s1, e1] = [toDay(arriveAlice), toDay(leaveAlice)];
    let [s2, e2] = [toDay(arriveBob), toDay(leaveBob)];

    // sort by start date to figure out if there is a overlap
    if (s1 > s2) {
        [[s1, e1], [s2, e2]] = [
            [s2, e2],
            [s1, e1],
        ];
    }

    /**
     * if there is a overlap
     *     s1 ---- e1
     *          s2 ----e2
     *          s2--e1  --> overlap Max(s1,s2) Min(e1,e2)
     *
     * if no overlap
     *     s1 ----- e1
     *                   s1 ---- e2
     */
    if (s2 <= e1) {
        // there is a over lap
        // compute overlap
        const [s, e] = [Math.max(s1, s2), Math.min(e1, e2)];
        return e - s + 1; // +1 cos e is inclusive
    }
    return 0;
}

console.log(countDaysTogether('08-15', '08-18', '08-16', '08-19'));
console.log(countDaysTogether('10-01', '10-31', '11-01', '12-31'));
console.log(countDaysTogether('08-02', '08-02', '08-02', '08-02'));
