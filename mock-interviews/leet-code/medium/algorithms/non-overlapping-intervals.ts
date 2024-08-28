/**
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 */

function eraseOverlapIntervals(intervals: number[][]): number {
    /**
     * Sort the interval based on start and if same then end
     * iterate over sorted interval , is current interval overlaps pervious
     * interval then remove.
     */

    intervals.sort(([, ea], [, eb]) => {
        return ea - eb;
    });

    console.log(intervals);
    const isIntOverlapping = (
        prev: [number, number],
        cur: [number, number]
    ): boolean => {
        return cur[0] < prev[1];
    };
    let prev = intervals[0] as [number, number];
    const overlappingInt = [];

    for (let i = 1; i < intervals.length; i++) {
        const cur = intervals[i] as [number, number];
        if (isIntOverlapping(prev, cur)) {
            overlappingInt.push(cur);
            continue;
        }
        prev = cur;
    }

    console.log(overlappingInt);
    return overlappingInt.length;
}

console.log(
    eraseOverlapIntervals([
        [1, 3],
        [1, 2],
        [2, 3],
        [3, 4],
    ])
);
console.log(
    eraseOverlapIntervals([
        [1, 2],
        [1, 2],
        [1, 2],
    ])
);
console.log(
    eraseOverlapIntervals([
        [1, 2],
        [2, 3],
    ])
);
console.log(
    eraseOverlapIntervals([
        [-52, 31],
        [-40, -26],
        [82, 97],
        [-65, -11],
        [-62, -49],
        [95, 99],
        [58, 95],
        [-31, 49],
        [66, 98],
        [-63, 2],
        [30, 47],
        [-73, -26],
    ])
);
