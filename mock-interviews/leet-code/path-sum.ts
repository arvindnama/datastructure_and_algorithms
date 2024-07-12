/**
 * Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.
 */

import { createTree, TreeNode } from '../../models/leet-code.models';

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root && targetSum === 0) return false;
    if (!root?.left && !root?.right) {
        return root?.val === targetSum;
    }
    if (!root && targetSum !== 0) return false;
    if (root && targetSum <= 0) return false;

    targetSum -= root?.val ?? 0;
    return (
        hasPathSum(root?.left as TreeNode, targetSum) ||
        hasPathSum(root?.right as TreeNode, targetSum)
    );
}

let root = createTree([
    5,
    4,
    8,
    11,
    null,
    13,
    4,
    7,
    2,
    null,
    null,
    null,
    null,
    null,
    1,
]);

console.log(hasPathSum(root, 22));

root = createTree([1, 2, 3]);
console.log(hasPathSum(root, 5));

root = createTree([1, null, 3, null, null, null, 1]);
console.log(hasPathSum(root, 5));

root = createTree([]);
console.log(hasPathSum(root, 0));

root = createTree([1, 2]);
console.log(hasPathSum(root, 1));
