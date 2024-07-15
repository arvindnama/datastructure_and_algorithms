/**
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.
 */

function singleNumber(nums: number[]): number {
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i = i + 2) {
        if (nums[i] === nums[i + 1]) {
            continue;
        }
        return nums[i];
    }
    return -1;
}

console.log(singleNumber([2, 2, 1]));
console.log(singleNumber([4, 1, 2, 1, 2]));
console.log(singleNumber([1]));
