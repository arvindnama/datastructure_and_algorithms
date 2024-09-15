/**
 * You are given a 0-indexed integer array nums. There exists an array arr of length nums.length, where arr[i] is the sum of |i - j| over all j such that nums[j] == nums[i] and j != i. If there is no such j, set arr[i] to be 0.

Return the array arr.
 */

function distance(nums: number[]): number[] {
    /**
     *  0,1,2,3,4,5
     * [1,3,1,1,1,2]  map = {}
     * map = {
     *  1 : [0,2,3,4]
     *  3 : [1]
     *  2 : [5]
     * }
     *
     *
     *  indicies:   [0, 2, 3, 4]
     *  prefixsum:  [0, 2, 5, 9]
     *
     *  let's calculate for [3]
     *
     *     3 - 0 + 3 - 2 + |3 - 4|
     *     3 - 0 + 3 - 2 +  4 - 3
     *     3 - 0 + 3 - 2      +       4 - 3
     *     3 * 2 - (0 + 2)    +       (4) - 3 * 1
     *     3 [index] * 2 [count to left] - (0 + 2) [prefix sum to left]    +
     *     (4)[prefixsum of last element - prefix sum at index] - 3[index] * 1 (c to right)
     */

    const map: { [k in number]: number[] } = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = map[nums[i]] || [];
        map[nums[i]].push(i);
    }

    const res: number[] = new Array(nums.length).fill(0);

    const indicies = Object.values(map);

    for (const arr of indicies) {
        if (arr.length === 1) continue;
        const prefixSum = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
            prefixSum[i] = prefixSum[i - 1] + arr[i];
        }

        console.log(prefixSum);
        for (let i = 0; i < arr.length; i++) {
            const index = arr[i];
            const countToLeft = i;
            const sumToLeft = prefixSum?.[i - 1] ?? 0;
            const leftPart = index * countToLeft - sumToLeft;

            const lastIdx = arr.length - 1;
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
