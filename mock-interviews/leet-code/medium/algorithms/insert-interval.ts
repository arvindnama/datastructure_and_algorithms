/**
 * You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.
 */

function insert(intervals: number[][], newInterval: number[]): number[][] {
    /**
     *  Intervals is sorted by start time.
     *
     *  n = newInterval
     *  initialize res = [];
     *
     *  we Iterate from 0 to last interval .
     *  cur = intervals[i]
     *   check cur , overlaps with newInterval
     *      1. No
     *          if cur > newInterval ==> res.push(cur)
     *          else  res.push(n) n = cur
     *      2. Yes
     *           n = merge(cur, n)
     *   continue.
     *
     *  res.push(n)
     *
     *  intervals = [[1,3],[6,9]]
     *  n = [2,5]
     *
     *    1 -> cur = [1,3] , n = [2,5], res = []
     *          overlapping , n = merge([1,3], [2,5]) [1,5]
     *    2 -->cur = [6,9] , n = [1,5], res = []
     *          notOverlapping, cur > n , res.push([1, 5]) , n = [6,9]
     *    3 -> cur = -- n = [6,9] res = [1,5]
     *      terminate
     *
     *  res = [[1,5], 6,9]
     *
     *
     *  intervals = [[1,2],[3,5],[6,7],[8,10]]
     *  n = [4,8]
     *
     *    1 -> cur = [1,2] , n = [4,8], res = []
     *          res.push([1,2])
     *    2 -->cur = [3,5] , n = [4,8], res = [[1,5]]
                n = [3,8]
     *    3 -> cur = [6,7] n = [3,8] res = [[1,5]]
                n = [3,8]
     *    4-> cur = [8,10] n = [3,8] res = [[1,5]]
                n = [3,10]
     *  res = [[1,2], [3,10]]
     *
     */

    const isOverlapping = (
        i1: [number, number],
        i2: [number, number]
    ): boolean => {
        if (i1[0] > i2[0]) {
            [i1, i2] = [i2, i1];
        }

        return i2[0] <= i1[1]; // is 2nd interval's start is less than 1st intervals end.
    };

    const merge = (
        i1: [number, number],
        i2: [number, number]
    ): [number, number] => {
        if (i1[0] > i2[0]) {
            [i1, i2] = [i2, i1];
        }
        const s = i1[0] < i2[0] ? i1[0] : i2[0];
        const e = i1[1] < i2[1] ? i2[1] : i1[1];
        return [s, e];
    };

    let n = newInterval as [number, number];
    const res: Array<[number, number]> = [];
    for (let i = 0; i < intervals.length; i++) {
        const cur = intervals[i] as [number, number];

        if (!isOverlapping(cur, n)) {
            if (cur[0] < n[0]) {
                res.push(cur);
            } else {
                res.push(n);
                n = cur;
            }
        } else {
            n = merge(cur, n);
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
