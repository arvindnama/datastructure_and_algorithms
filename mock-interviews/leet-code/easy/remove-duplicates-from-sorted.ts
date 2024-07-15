/**
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
Return k.
 */

function removeDuplicates(nums: number[]): number {
    if (!nums || !nums.length) return 0;

    let [i, j] = [0, nums.length - 1];

    while (i < j) {
        if (nums[i] === nums[i + 1]) {
            // put i+1 to end
            const n = nums[i + 1];

            // nums.splice(i + 1, 1);
            // nums.push(n);

            // move i+1 to j
            let k = i + 1;
            for (; k < j; k++) {
                nums[k] = nums[k + 1];
            }
            nums[k] = n;
            j--;
            continue;
        }
        i++;
    }
    return i + 1; // i is zero based , hence + 1
}

let nums = [1, 1, 2];
console.log([1, 1, 2], removeDuplicates(nums), nums);
nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log([0, 0, 1, 1, 1, 2, 2, 3, 3, 4], removeDuplicates(nums), nums);
