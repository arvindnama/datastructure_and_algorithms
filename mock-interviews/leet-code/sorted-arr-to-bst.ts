/**
 * Given an integer array nums where the elements are sorted in ascending order, convert it to a  height-balanced binary search tree.
 */

import { printTree, TreeNode } from '../../models/leet-code.models';

function sortedArrayToBST(nums: number[]): TreeNode | null {
    const toBst = (s: number, e: number): TreeNode | null => {
        if (s > e) return null;

        const m = Math.floor((s + e) / 2);
        const root = new TreeNode(nums[m]);
        root.left = toBst(s, m - 1);
        root.right = toBst(m + 1, e);

        return root;
    };

    return toBst(0, nums.length - 1);
}

let nums = [-10, -3, 0, 5, 9];
console.log(printTree(sortedArrayToBST(nums)));

nums = [1, 3];

console.log(printTree(sortedArrayToBST(nums)));
nums = [1, 2, 3, 4, 5, 6, 7];
console.log(printTree(sortedArrayToBST(nums)));
