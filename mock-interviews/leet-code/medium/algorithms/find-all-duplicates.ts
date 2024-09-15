/**
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output
 */

function findDuplicates(nums: number[]): number[] {
    nums.sort((a, b) => a - b);

    const res = [];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            res.push(nums[i]);
            i++;
        }
    }

    return res;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDuplicates([1, 1, 2]));
console.log(findDuplicates([1]));
