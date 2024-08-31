/**
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 */

function rotate(nums: number[], k: number): void {
    /**
     * give k we will first need to find the new start & end point
     * in the existing array .
     *  end is always start - 1 .
     */
    const n = nums.length;
    k = k % n; // to eliminate zero move rotations.

    /**
     * start = (n - 1) - k
     * end = start - 1
     *
     * reverse from 0 to end
     * reverse from start to n-1
     * reverse from 0 to n - 1
     * 0, 1, 2, 3, 4, 5, 6
     * 1, 2, 3, 4, 5, 6, 7
     *          e  s
     * 4, 3, 2, 1, 5, 6, 7
     * 4, 3, 2, 1, 7, 6, 5
     * 5, 6, 7, 1, 2, 3, 4
     */

    const reverse = (s: number, e: number) => {
        while (s < e) {
            [nums[s], nums[e]] = [nums[e], nums[s]];
            s++;
            e--;
        }
    };

    const start = n - k;
    const end = start - 1;
    reverse(0, end);
    reverse(start, n - 1);
    reverse(0, n - 1);
}

let arr = [1, 2, 3, 4, 5, 6, 7];
rotate(arr, 3);
console.log(arr);

arr = [-1, -100, 3, 99];
rotate(arr, 2);
console.log(arr);
