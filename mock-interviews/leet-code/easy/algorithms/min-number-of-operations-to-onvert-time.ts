/**
 * You are given two strings current and correct representing two 24-hour times.

24-hour times are formatted as "HH:MM", where HH is between 00 and 23, and MM is between 00 and 59. The earliest 24-hour time is 00:00, and the latest is 23:59.

In one operation you can increase the time current by 1, 5, 15, or 60 minutes. You can perform this operation any number of times.

Return the minimum number of operations needed to convert current to correct.


 */

function convertTime(current: string, correct: string): number {
    /**
     * conver the time in string to minutes
     * get the diff , start subtracting the high possible mins until and move to next
     * until diff becomes zero
     */

    const toMins = (t: string): number => {
        const [hh, mm] = t.split(':');
        return parseInt(hh) * 60 + parseInt(mm);
    };

    const [start, end] = [toMins(current), toMins(correct)];
    let diff = end - start; // we need so how to get this diff
    const posOps = [60, 15, 5, 1]; // possible add to start time

    const sub = (diff: number, min: number): [number, number] => {
        if (diff >= min) {
            const noOfOps = Math.floor(diff / min);
            diff = diff % min;
            return [diff, noOfOps];
        }
        return [diff, 0];
    };

    let noOfOps = 0;
    while (diff > 0) {
        const min = posOps.shift() as number;
        const res = sub(diff, min);
        noOfOps += res[1];
        diff = res[0];
    }

    return noOfOps;
}

console.log(convertTime('2:30', '4:37'));
console.log(convertTime('2:30', '4:35'));
