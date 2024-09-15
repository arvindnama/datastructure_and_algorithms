/**
 * You are given a 0-indexed integer array nums. There exists an array arr of length nums.length, where arr[i] is the sum of |i - j| over all j such that nums[j] == nums[i] and j != i. If there is no such j, set arr[i] to be 0.

Return the array arr.
 */

function distance(nums: number[]): number[] {
    /**
     * [1,3,1,1,2]  map = {}
     * map = {
     *  1 : [0,2,3]
     *  3 : [1]
     *  2 : [4]
     * }
     *
     */

    const map: { [k in number]: number[] } = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = map[nums[i]] || [];
        map[nums[i]].push(i);
    }

    const res: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        const diff = map[nums[i]]
            .filter((idx) => idx !== i)
            .reduce((acc, cur) => {
                return acc + Math.abs(i - cur);
            }, 0);
        res[i] = diff;
    }

    return res;
}

console.log(distance([1, 3, 1, 1, 2]));
console.log(distance([0, 5, 3]));
