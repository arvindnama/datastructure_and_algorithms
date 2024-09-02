/**
 * You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.
 */

function insert(intervals: number[][], newInterval: number[]): number[][] {
    /**
     * Intervals are sorted on start time.
     *
     *  start from 0th interval  (cur) & compare with newInterval (n)
     *
     * if cur & n overlap -> n will be merge cur & n
     * if no overlap ->
     *       -> cur < n --> res.push(cur); cur = next in intervals
     *       -> n < cur --> res.push(n); n = cur , cur = next in intervals.
     * end the loop when cur cross intervals
     * n will still have the last interval , push to res.
     */

    const overlap = (m: number[], n: number[]): boolean => {
        // check if m is > than n .. if yes swap m & n;
        if (m[0] > n[0]) {
            [m, n] = [n, m];
        }

        // m is the smallest
        return n[0] <= m[1];
    };

    const merge = (m: number[], n: number[]): number[] => {
        return [Math.min(m[0], n[0]), Math.max(m[1], n[1])];
    };

    let n = newInterval;
    const res: number[][] = [];
    for (let i = 0; i < intervals.length; i++) {
        const cur = intervals[i];
        if (overlap(cur, n)) {
            n = merge(cur, n);
        } else {
            if (cur[0] < n[0]) {
                res.push(cur);
            } else {
                res.push(n);
                n = cur;
            }
        }
    }
    res.push(n);
    return res;
}

console.log(
    insert(
        [
            [1, 3],
            [6, 9],
        ],
        [2, 5]
    )
);

console.log(
    insert(
        [
            [1, 2],
            [3, 5],
            [6, 7],
            [8, 10],
            [12, 16],
        ],
        [4, 8]
    )
);
