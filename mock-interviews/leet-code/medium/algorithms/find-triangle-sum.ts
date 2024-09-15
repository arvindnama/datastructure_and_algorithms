/**
 * You are given a 0-indexed integer array nums, where nums[i] is a digit between 0 and 9 (inclusive).

The triangular sum of nums is the value of the only element present in nums after the following process terminates:

Let nums comprise of n elements. If n == 1, end the process. Otherwise, create a new 0-indexed integer array newNums of length n - 1.
For each index i, where 0 <= i < n - 1, assign the value of newNums[i] as (nums[i] + nums[i+1]) % 10, where % denotes modulo operator.
Replace the array nums with newNums.
Repeat the entire process starting from step 1.
 */

function triangularSum(nums: number[]): number {
    /**
     * every iteration the nums array reduces by 1 in size
     * res[i] = nums[i-1] + nums[i]
     *
     * recurse (res) until res.length === 1
     */

    if (nums.length === 1) return nums[0];

    for (let i = 1; i < nums.length; i++) {
        const sum = nums[i - 1] + nums[i];
        nums[i - 1] = sum % 10;
    }
    nums.length -= 1;
    return triangularSum(nums);
}

console.log(triangularSum([1, 2, 3, 4, 5]));
