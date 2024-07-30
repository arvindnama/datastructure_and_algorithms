/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.
 */

function threeSum(nums: number[]): number[][] {
    // O(n2)
    // const map: { [key in number]: Array<number[]> } = {};
    // for (let i = 0; i < nums.length; i++) {
    //     for (let j = i; j < nums.length; j++) {
    //         if (i !== j) {
    //             const sum = nums[i] + nums[j];
    //             const key = 0 - sum;
    //             map[key] = map[key] || [];
    //             map[key].push([i, j]);
    //         }
    //     }
    // }
    // let res: Array<number[]> = [];
    // for (let k = 0; k < nums.length; k++) {
    //     if (!map[nums[k]]) continue;
    //     res = map[nums[k]]
    //         .filter(([i, j]) => k > i && k > j)
    //         .reduce((acc, [i, j]) => {
    //             const triplet = [nums[i], nums[j], nums[k]].sort();
    //             if (
    //                 acc.find(
    //                     ([a, b, c]) =>
    //                         a === triplet[0] &&
    //                         b === triplet[1] &&
    //                         c === triplet[2]
    //                 )?.length
    //             )
    //                 return acc;
    //             return [...acc, triplet];
    //         }, res);
    // }
    // return res;
    // O(n)
    /**
     * We can can use 3 pointer system.
     * i,j,k
     *  We fix i at a position and j = i+i and k = end
     *  sum = [i] + [j] + [k]
     *   sum == 0 -> pick
     *   sum < 0 -> we need a bigger number to get to zero , but we donno where
     *           the bigger number is (i.e to the right of i or to the left of j)
     *           but if the array is {sorted} bigger number can be found by moving
     *           j to right
     *  sum > 0 --> (note : array needs to be sorted) we need a small no. and that
     *          can be found by moving k to left
     *
     * repeat the same for next i fixed.
     */

    const res: Array<number[]> = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) {
        // in case cur num is same as previous it will yield
        // duplicate result hence skip.
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let [j, k] = [i + 1, nums.length - 1];
        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k];
            if (sum === 0) {
                res.push([nums[i], nums[j], nums[k]]);
                j++;
                // if there cur j is same as prev j
                // it will also yield same result hence skip them
                while (nums[j] === nums[j - 1] && j < k) {
                    j++;
                }
            } else if (sum > 0) k--;
            else j++;
        }
    }
    return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([0, 1, 1]));
console.log(threeSum([0, 0, 0]));
console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));
