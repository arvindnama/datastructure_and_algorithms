/**
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 */
//[observations]: missed a lot of boundary cases
function searchInsert(nums: number[], target: number): number {
    const searchInt = (s: number, e: number): number => {
        if (s === e) {
            // target not found
            return target > nums[s] ? s + 1 : s;
        }

        const m = Math.floor((s + e) / 2);
        if (nums[m] === target) return m;
        if (target > nums[m]) return searchInt(m + 1, e);
        return searchInt(s, Math.max(m - 1, s));
    };

    return searchInt(0, nums.length - 1);
}

console.log(searchInsert([1, 3, 5, 6], 5));
console.log(searchInsert([1, 3, 5, 6], 2));
console.log(searchInsert([1, 3, 5, 6], 7));
console.log(searchInsert([1, 3, 5, 6], 0));
console.log(searchInsert([1, 3], 0));
console.log(searchInsert([1, 3], 4));
console.log(searchInsert([1, 3], 2));
console.log(searchInsert([3, 5, 7, 9, 10], 8));
console.log(searchInsert([2, 7, 8, 9, 10], 9));
