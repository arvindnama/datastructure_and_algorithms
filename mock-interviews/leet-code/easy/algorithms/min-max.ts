/**
 * You are given a 0-indexed integer array nums whose length is a power of 2.

Apply the following algorithm on nums:

Let n be the length of nums. If n == 1, end the process. Otherwise, create a new 0-indexed integer array newNums of length n / 2.
For every even index i where 0 <= i < n / 2, assign the value of newNums[i] as min(nums[2 * i], nums[2 * i + 1]).
For every odd index i where 0 <= i < n / 2, assign the value of newNums[i] as max(nums[2 * i], nums[2 * i + 1]).
Replace the array nums with newNums.
Repeat the entire process starting from step 1.
Return the last number that remains in nums after applying the algorithm.
 */

function minMaxGame(nums: number[]): number {
    if (!nums) return -1;
    if (nums.length === 1) return nums[0];

    const newArr = [];
    for (let i = 0; i < nums.length / 2; i++) {
        if (i % 2 === 0) {
            newArr.push(Math.min(nums[2 * i], nums[2 * i + 1]));
        } else {
            newArr.push(Math.max(nums[2 * i], nums[2 * i + 1]));
        }
    }
    return minMaxGame(newArr);
}

console.log(minMaxGame([1, 3, 5, 2, 4, 8, 2, 2]));
console.log(minMaxGame([3]));
