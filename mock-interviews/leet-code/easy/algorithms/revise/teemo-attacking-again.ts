/**
 * Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for a exactly duration seconds. More formally, an attack at second t will mean Ashe is poisoned during the inclusive time interval [t, t + duration - 1]. If Teemo attacks again before the poison effect ends, the timer for it is reset, and the poison effect will end duration seconds after the new attack.

You are given a non-decreasing integer array timeSeries, where timeSeries[i] denotes that Teemo attacks Ashe at second timeSeries[i], and an integer duration.

Return the total number of seconds that Ashe is poisoned.


 */

function findPoisonedDuration(timeSeries: number[], duration: number): number {
    /**
     *  T = [1 4 5 7] d = 2
     *  PI = [[1,3] [4,6] [5,7] [7,9]]
     *  R = [[1,3] [4,9]]
     *  total = (3 -1) + (9- 4)
     */

    const intervals: Array<[number, number]> = timeSeries.map((t) => [
        t,
        t + duration,
    ]);
    let curInt: [number, number] = intervals[0];
    const IsOverlap = (
        [, y1]: [number, number],
        [x2]: [number, number]
    ): boolean => {
        // x1 & x2 are sorted , x1 < x2
        return x2 <= y1;
    };
    const resolvedIntervals: Array<[number, number]> = [];
    for (let i = 1; i < intervals.length; i++) {
        if (IsOverlap(curInt, intervals[i])) {
            // merge
            curInt = [curInt[0], intervals[i][1]];
            continue;
        }
        resolvedIntervals.push(curInt);
        curInt = intervals[i];
    }
    resolvedIntervals.push(curInt);

    return resolvedIntervals.reduce((acc, [s, e]) => {
        return acc + (e - s);
    }, 0);
}

console.log(findPoisonedDuration([1, 4], 2));
console.log(findPoisonedDuration([1, 2], 2));
console.log(findPoisonedDuration([1, 2, 3, 4], 4));

/**
 * 1-5
 *  2-6
 *   3-7
 *    4-8
 * 1-8
 * 7
 */
