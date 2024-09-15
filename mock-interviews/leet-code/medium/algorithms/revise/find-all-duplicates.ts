/**
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output
 */

function findDuplicates(nums: number[]): number[] {
    /**
     *  0, 1, 2, 3, 4, 5, 6, 7
     * [4, 3, 2, 7, 8, 2, 3, 1] res = []
     *  i
     * [7, 3, 2, 4, 8, 2, 3, 1] res = []
     *  i
     * [3, 3, 2, 4, 8, 2, 7, 1] res = []
     *  i
     * [2, 3, 3, 4, 8, 2, 7, 1] res = []
     *  i
     * [3, 2, 3, 4, 8, 2, 7, 1] res = []
     *  i
     * [-1, 2, 3, 4, 8, 2, 7, 1] res = [3]
     *  i -->
     * [-1, 2, 3, 4, 8, 2, 7, 1] res = [3]
     *               i
     * [-1, 2, 3, 4, 1, 2, 7, 8] res = [3]
     *               i
     * [1, 2, 3, 4, -1, 2, 7, 8] res = [3]
     *               i-->
     * [1, 2, 3, 4, -1, -1, 7, 8] res = [3,2]
     *                  i -->
     * [1, 2, 3, 4, -1, -1, 7, 8] res = [3,2]
     *                           i
     */

    let i = 0;
    const res = [];

    while (i < nums.length) {
        if (nums[i] - 1 === i || nums[i] === -1) {
            // it is in the proper position
            i++;
            continue;
        }
        const pos = nums[i] - 1;
        if (nums[i] === nums[pos]) {
            // we found a duplicate.
            res.push(nums[i]);
            nums[i] = -1; // mark duplicate as -1
            i++;
            continue;
        }
        // not i correct position.
        // swap to i-1th place
        [nums[i], nums[pos]] = [nums[pos], nums[i]];
    }
    return res;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDuplicates([1, 1, 2]));
console.log(findDuplicates([1]));
