/**
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output
 */

function findDuplicates(nums: number[]): number[] {
    /*
         1  2  3  4  5  6  7  8
        [4, 3, 2, 7, 8, 2, 3, 1]
        [7, 3, 2, 4, 8, 2, 3, 1]
        [3, 3, 2, 4, 8, 2, 7, 1]
        [2, 3, 3, 4, 8, 2, 7, 1]
        [3, 2, 3, 4, 8, 2, 7, 1]   res = []
        [-1, 2, 3, 4, 8, 2, 7, 1]  res = [3]
        [-1, 2, 3, 4, 1, 2, 7, 8]  res = [3]
        [1, 2, 3, 4, -1, -1, 7,8]  res = [3]

        [1, 1, 2]
        [1, -1, 2]  res = [1]
        [1, 2, -1]  res = [1]
    */

    const res: number[] = [];
    let i = 0;
    while (i < nums.length) {
        const pos = nums[i] - 1;
        if (pos === i || nums[i] === -1) {
            // it is in its rite place
            i++;
            continue;
        }
        if (nums[i] === nums[pos]) {
            // if same number is present in the destination. its a duplicate
            res.push(nums[i]);
            nums[i] = -1;
            i++;
            continue;
        }
        [nums[i], nums[pos]] = [nums[pos], nums[i]];
    }
    return res;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDuplicates([1, 1, 2]));
console.log(findDuplicates([1]));

/**
 *   0  1  2  3  4  5  6  7
 *  [4, 3, 2, 7, 8, 2, 3, 1]  i = 0
 *  [7, 3, 2, 4, 8, 2, 3, 1]  i = 0
 *  [3, 3, 2, 4, 8, 2, 7, 1]  i = 0
 *  [3, 3, 2, 4, 8, 2, 7, 1]  i = 0
 *  [2, 3, 3, 4, 8, 2, 7, 1]  i = 0
 *  [-1, 2, 3, 4, 8, 2, 7, 1] i = 1,2,3,4  res=[3]
 *  [-1, 2, 3, 4, 1, 2, 7, 8] i = 4  res=[3]
 *  [1, 2, 3, 4, -1, 2, 7, 8] i = 4  res=[3]
 *  [1, 2, 3, 4, -1, -1, 7, 8] i = 5  res=[3,2]
 *  [1, 2, 3, 4, -1, -1, 7, 8] i = 6  res=[3,2]
 *
 */
