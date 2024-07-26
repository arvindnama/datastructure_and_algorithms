/**
 * The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.
 */

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const map: { [k in number]: number } = {};

    // for (let i = 0; i < nums2.length; i++) {
    //     map[nums2[i]] = i;
    // }

    // return nums1.map((n) => {
    //     const idx = map[n];
    //     let nextGreatest = -1;
    //     for (let i = idx + 1; i < nums2.length; i++) {
    //         if (nums2[i] > n) {
    //             nextGreatest = nums2[i];
    //             break;
    //         }
    //     }
    //     return nextGreatest;
    // });

    map[nums2[nums2.length - 1]] = -1;
    const stack: number[] = [];
    for (let i = nums2.length - 2; i >= 0; i--) {
        if (nums2[i + 1] > nums2[i]) {
            map[nums2[i]] = nums2[i + 1];
            stack.unshift(nums2[i + 1]);
        } else {
            let next = -1;
            while (stack.length) {
                if (stack[0] > nums2[i]) {
                    next = stack[0];
                    break;
                } else stack.shift();
            }
            map[nums2[i]] = next;
        }
    }
    return nums1.map((n) => map[n]);
}

// console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));
// console.log(nextGreaterElement([2, 4], [1, 2, 3, 4]));
// console.log(nextGreaterElement([2, 4], [0, 2, 1, 4]));
console.log(nextGreaterElement([2], [1, 2, 5, 3, 4, 0, 8]));
console.log(nextGreaterElement([2, 8, 1], [1, 2, 4, 5, 3, 6, 0, 7, 8]));
