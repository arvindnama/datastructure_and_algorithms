/**
 * Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.
 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function sumOfLeftLeaves(root: TreeNode | null): number {
    const computeSum = (
        root: TreeNode | null,
        isLeftChild: boolean
    ): number => {
        if (!root) return 0;
        if (!root.left && !root.right) {
            return isLeftChild ? root.val : 0;
        }

        return computeSum(root.left, true) + computeSum(root.right, false);
    };
    return computeSum(root, false);
}

let root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(sumOfLeftLeaves(root));

root = createTree([1]);
console.log(sumOfLeftLeaves(root));

console.log(sumOfLeftLeaves(null));
