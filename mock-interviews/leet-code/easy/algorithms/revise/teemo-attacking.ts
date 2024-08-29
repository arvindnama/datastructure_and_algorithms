/**
 * \Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for a exactly duration seconds. More formally, an attack at second t will mean Ashe is poisoned during the inclusive time interval [t, t + duration - 1]. If Teemo attacks again before the poison effect ends, the timer for it is reset, and the poison effect will end duration seconds after the new attack.

You are given a non-decreasing integer array timeSeries, where timeSeries[i] denotes that Teemo attacks Ashe at second timeSeries[i], and an integer duration.

Return the total number of seconds that Ashe is poisoned.
 */

function findPoisonedDuration(timeSeries: number[], duration: number): number {
    /**
     * for the given time series
     * we can create interval map [start and end of poison attack]
     * later merge all overlapping intervals
     * sum up intervals SumOfAll(e-s)
     */

    const getInterval = (t: number): [number, number] => [
        timeSeries[t],
        timeSeries[t] + duration - 1,
    ];
    let prev: [number, number] = getInterval(0);
    let total = 0;
    for (let i = 1; i < timeSeries.length; i++) {
        // intervals are sorted (as time-series is sorted)
        // so just check the cur's start is less than prev'e end
        // if yes there is a overlap. merge them
        const cur = getInterval(i);
        if (cur[0] <= prev[1]) {
            prev = [prev[0], cur[1]];
        } else {
            total += prev[1] - prev[0] + 1;
            prev = cur;
        }
    }

    total += prev[1] - prev[0] + 1;
    return total;
}

console.log(findPoisonedDuration([1, 4], 2));
console.log(findPoisonedDuration([1, 2, 3], 2));
