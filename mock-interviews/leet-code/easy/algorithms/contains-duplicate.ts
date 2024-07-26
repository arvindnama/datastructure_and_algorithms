/**
 * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
 */

let containsDuplicate = (nums: number[]): boolean => {
    const map: { [k in number]: number } = {};

    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = map[nums[i]] || 0;
        if (map[nums[i]] >= 1) return true;
        map[nums[i]]++;
    }

    return false;
};

console.log(containsDuplicate([1, 2, 3, 1]));
console.log(containsDuplicate([1, 2, 3, 4]));
console.log(containsDuplicate([1, 1, 1, 3, 3]));

containsDuplicate = (nums: number[]): boolean => {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) return true;
    }
    return false;
};

console.log(containsDuplicate([1, 2, 3, 1]));
console.log(containsDuplicate([1, 2, 3, 4]));
console.log(containsDuplicate([1, 1, 1, 3, 3]));
