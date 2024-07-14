/**
 * Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

 */

function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map: { [k in number]: number } = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] =
            map[nums[i]] === undefined ? Number.MIN_SAFE_INTEGER : map[nums[i]];

        if (map[nums[i]] >= 0 && i - map[nums[i]] <= k) {
            return true;
        }
        map[nums[i]] = i;
    }
    return false;
}

console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1));
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));
