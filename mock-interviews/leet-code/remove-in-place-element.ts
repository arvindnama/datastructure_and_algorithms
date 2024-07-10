/**
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
Return k.
 */

function removeElement(nums: number[], val: number): number {
    if (!nums || !nums.length) return 0;

    let [i, j] = [0, nums.length - 1];

    while (i <= j) {
        if (nums[i] === val) {
            // const n = nums[i];

            let k = i;
            for (; k < j; k++) {
                nums[k] = nums[k + 1];
            }
            nums[k] = -1;
            j--;
            continue;
        }
        i++;
    }
    return i;
}

let nums = [3, 2, 2, 3];
console.log([3, 2, 2, 3], removeElement(nums, 3), nums);

nums = [0, 1, 2, 2, 3, 0, 4, 2];
console.log([0, 1, 2, 2, 3, 0, 4, 2], removeElement(nums, 2), nums);
