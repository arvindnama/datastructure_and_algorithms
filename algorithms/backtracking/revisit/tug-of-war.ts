/**
 * Given a set of n integers, divide the set in two subsets of n/2 sizes each such that the absolute difference of the sum of two subsets is as minimum as possible
 */

const tugOfWar = (set: number[]): [number, number[], number[]] => {
    /**
     * start with 2 empty sets
     * for every element we traverse there can be 2 possibilities
     *  1. add to set -1
     *  2. add to set -2
     *  we attempt both possibilities
     *
     * when all items are processed.
     *   if we have set - 1 with length of n/2 then we have one potential solution
     *   we check the diff we prev result is min we update res.
     *
     */
    const n = set.length;

    const res: {
        diff: number;
        s1: number[];
        s2: number[];
    } = {
        diff: Number.MAX_VALUE,
        s1: [],
        s2: [],
    };
    const solve = (
        idx: number,
        s1: number[],
        s1Sum: number,
        s2: number[],
        s2Sum: number
    ) => {
        if (idx === n) {
            if (s1.length === Math.floor(n / 2)) {
                const diff = Math.abs(s1Sum - s2Sum);
                if (diff < res.diff) {
                    res.diff = diff;
                    res.s1 = s1;
                    res.s2 = s2;
                }
            }
            return;
        }

        // put current element in s1
        solve(idx + 1, [...s1, set[idx]], s1Sum + set[idx], s2, s2Sum);
        // put current element in s2
        solve(idx + 1, s1, s1Sum, [...s2, set[idx]], s2Sum + set[idx]);
    };

    solve(0, [], 0, [], 0);
    return [res.diff, res.s1, res.s2];
};

console.log(tugOfWar([3, 4, 5, -3, 100, 1, 89, 54, 23, 20]));
