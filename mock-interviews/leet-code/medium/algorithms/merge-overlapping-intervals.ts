/**
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 */

function merge(intervals: Array<[number, number]>): Array<[number, number]> {
    /**
     * first we will need to sort the interval by there start time
     * [[1,3],[2,6],[8,10],[15,18],[1,20]]
     *
     * sort :
     * [[1,3],[2,6],[1,20],[8,10],[15,18],[1,20]]
     * res: [[1,3]] cur :[2,6]
     * res: [[1,6],] cur :[1,20]
     * res: [[1,20],] cur :[8,10]
     */

    intervals.sort(([sa], [sb]) => sa - sb);

    const res: Array<[number, number]> = [];
    let prev = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const cur = intervals[i];
        if (cur[0] <= prev[1]) {
            //overlap
            // update prev of if cur end time is > prev end time
            if (cur[1] > prev[1]) prev = [prev[0], cur[1]];
        } else {
            // no overlap, add prev to result and cur to prev
            res.push(prev);
            prev = cur;
        }
    }

    res.push(prev);
    return res;
}

console.log(
    merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
    ])
);

console.log(
    merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
        [1, 20],
    ])
);

console.log(
    merge([
        [1, 4],
        [4, 5],
        [8, 10],
        [15, 18],
    ])
);
