/**
 * Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.
 */

function thirdMax(nums: number[]): number {
    nums.sort((a, b) => b - a);
    if (nums.length < 3) return nums[0];
    const nums2: number[] = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums2[nums2.length - 1]) {
            nums2.push(nums[i]);
        }
    }
    return nums2[nums2.length < 3 ? 0 : 2];
}

console.log(thirdMax([3, 2, 1]));
console.log(thirdMax([1, 2]));
console.log(thirdMax([2, 2, 3, 1]));
console.log(thirdMax([2, 2, 2, 1]));
