/**

You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.


nums1.length == m + n
nums2.length == n
0 <= m, n <= 200
1 <= m + n <= 200
-109 <= nums1[i], nums2[j] <= 109

 */

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    if (n === 0) return;
    let [i, j] = [0, 0];

    while (j < n) {
        if (m === 0) {
            nums1[i++] = nums2[j++];
        } else if (nums1[i] < nums2[j]) {
            i++;
            m--;
        } else {
            // insert nums2[j] into nums1 at i
            for (let k = nums1.length - 1; k > i; k--) {
                nums1[k] = nums1[k - 1];
            }
            nums1[i] = nums2[j];
            j++;
            i++;
        }
    }
}

let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
merge(nums1, 3, nums2, 3);
console.log(nums1);

nums1 = [1];
nums2 = [];
merge(nums1, 1, nums2, 0);
console.log(nums1);

nums1 = [0];
nums2 = [1];
merge(nums1, 0, nums2, 1);
console.log(nums1);

nums1 = [1, 2, 4, 8, 9, 0, 0];
nums2 = [1, 10];
merge(nums1, 5, nums2, 2);
console.log(nums1);
