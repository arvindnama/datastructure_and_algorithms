/**
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output
 */

function findDuplicates(nums: number[]): number[] {
    /**
     *  0  1  2  3  4  5  6  7
     * [4, 3, 2, 7, 8, 2, 3, 1]
     *  i
     * [7, 3, 2, 4, 8, 2, 3, 1]
     *  i
     * [3, 3, 2, 4, 8, 2, 7, 1]
     *  i
     * [2, 3, 3, 4, 8, 2, 7, 1]
     *  i
     * [3, 2, 3, 4, 8, 2, 7, 1]
     *  i
     * [-1, 2, 3, 4, 8, 2, 7, 1]  res=[3]
     *               i
     * [-1, 2, 3, 4, 1, 2, 7, 8]  res=[3]
     *               i
     * [1, 2, 3, 4, -1, 2, 7, 8]  res=[3]
     *               i
     * [1, 2, 3, 4, -1, -1, 7, 8]  res=[3, 2]
     *                  i
     * [1, 2, 3, 4, -1, -1, 7, 8]  res=[3, 2]
     *                        i
     */
    const res = [];

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === -1) continue;
        if (nums[i] === i + 1) continue; // num in proper position.
        const idx = nums[i] - 1;
        if (nums[idx] === nums[i]) {
            res.push(nums[i]);
            nums[i] = -1;
            continue;
        }
        [nums[idx], nums[i]] = [nums[i], nums[idx]];
        i--; // so i will retain same spot in next iteration
    }
    return res;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDuplicates([1, 1, 2]));
console.log(findDuplicates([1]));
