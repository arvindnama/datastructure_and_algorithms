/**
 * Given an array of integers nums and an integer target, return indices of the two
 * numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
 */

function twoSum(nums: number[], target: number): number[] {
    const map: { [key in number]: number } = {};

    for (let i = 0; i < nums.length; i++) {
        const residue = target - nums[i];
        map[residue] = i;
    }

    for (let i = 0; i < nums.length; i++) {
        if (map.hasOwnProperty(nums[i]) && map[nums[i]] != i) {
            return [i, map[nums[i]]];
        }
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
console.log(twoSum([-3, -3, 1, 2], -2));
