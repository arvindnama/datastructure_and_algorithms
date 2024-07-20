/**
 * Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for a exactly duration seconds. More formally, an attack at second t will mean Ashe is poisoned during the inclusive time interval [t, t + duration - 1]. If Teemo attacks again before the poison effect ends, the timer for it is reset, and the poison effect will end duration seconds after the new attack.

You are given a non-decreasing integer array timeSeries, where timeSeries[i] denotes that Teemo attacks Ashe at second timeSeries[i], and an integer duration.

Return the total number of seconds that Ashe is poisoned.


 */

function findPoisonedDuration(timeSeries: number[], duration: number): number {
    // const poisonTimeline: number[][] = [];
    // for (let i = 0; i < timeSeries.length; i++) {
    //     const [start, end] = [timeSeries[i], timeSeries[i] + duration - 1 || 0];
    //     poisonTimeline.push([start, end]);
    // }
    // return poisonTimeline
    //     .reduce(
    //         (acc, cur) => {
    //             if (acc.length === 0) acc.push(cur);
    //             const prev = acc[acc.length - 1];
    //             if (prev[1] >= cur[0]) {
    //                 acc[acc.length - 1] = [prev[0], cur[1]];
    //             } else {
    //                 acc.push(cur);
    //             }
    //             return acc;
    //         },
    //         [] as Array<number[]>
    //     )
    //     .reduce((acc, cur) => {
    //         const duration = cur[1] - cur[0] + 1;
    //         return acc + duration;
    //     }, 0);

    let total = 0;
    for (let i = 0; i < timeSeries.length - 1; i++) {
        total += Math.min(duration, timeSeries[i + 1] - timeSeries[i]);
    }
    return total + duration; // last attach will be full duration
}

console.log(findPoisonedDuration([1, 4], 2));
console.log(findPoisonedDuration([1, 2], 2));
console.log(findPoisonedDuration([1, 2, 3, 4], 4));
