/**
 * You are given a 0-indexed integer array nums. There exists an array arr of length nums.length, where arr[i] is the sum of |i - j| over all j such that nums[j] == nums[i] and j != i. If there is no such j, set arr[i] to be 0.

Return the array arr.
 */

function distance(nums: number[]): number[] {
    /**
     * for every num in nums we find all the indexes that have same num.
     *
     *  0,1,2,3,4,5
     * [1,3,1,1,1,1]  map = {}
     * map = {
     *  1 : [0,2,3,4,5]
     *  3 : [1]
     * }
     *
     * anything with just 1 index we just skip them
     *          0,1,2,3,4
     * index:  [0,2,3,4,5]
     * prefix: [0,2,5,9,14]
     *
     * find the distance of index = 3
     *
     *      3 - 0 + 3 - 2 +  |3 - 4| + |3 - 5|
     *      3 - 0 + 3 - 2  [left part] +  4 - 3  +  5 - 3[right part]
     *      3 * 2 - (0 + 2)            + (4 + 5) - 3 * 2
     *      leftPart = [idx] * (c_to_left) - prefixSum[idx]
     *      rightPart = (prefixSum[lastIdx] - prefixSum[idx]) - [idx] * (lastIdx - idx)
     *
     *
     *    index * countToLeft - sumToLeft +
     *    sumToRight - index * countToRight
     *
     *
     * Iterate again:
     * anything with just 1 index we just skip them
     *          0,1,2,3,4
     * index:  [0,2,3,4,5]
     * prefix: [0,2,5,9,14]
     *
     *
     * distance for index 3.
     *
     *  3 - 1 + 3 - 2 + |3 - 4| + |3 - 5|
     *  3 - 1 + 3 - 2         +          4 - 3 + 5 - 3
     *  3 * 2 - (1+2)         +          (4 + 5) - 3 * 2
     *  idx * c_to_left - sumToLeft  +   sumToRight - idx * c_to_right
     *
     * sumToLeft == prefixSum[idx - 1]
     * sumToRight === prefixSum[lastElement] - prefixSum[idx];
     */

    const map: { [k in number]: number[] } = {};

    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = map[nums[i]] || [];
        map[nums[i]].push(i);
    }

    const n = nums.length;
    const res = new Array(n).fill(0);
    const indicies = Object.values(map);

    for (const arr of indicies) {
        if (arr.length === 1) continue;

        // let calculate the prefix sum.
        const prefixSum = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
            prefixSum[i] = prefixSum[i - 1] + arr[i];
        }

        const lastIdx = arr.length - 1;

        for (let i = 0; i < arr.length; i++) {
            const index = arr[i];
            const sumToLeft = prefixSum?.[i - 1] ?? 0;
            const countToLeft = i;
            const leftPart = index * countToLeft - sumToLeft;

            const countToRight = lastIdx - i;
            const sumToRight = prefixSum[lastIdx] - prefixSum[i];
            const rightPart = sumToRight - index * countToRight;

            res[index] = leftPart + rightPart;
        }
    }
    return res;
}

console.log(distance([1, 3, 1, 1, 2]));
console.log(distance([0, 5, 3]));
console.log(distance([0, 5, 3, 1, 2, 8, 6, 6, 6]));
