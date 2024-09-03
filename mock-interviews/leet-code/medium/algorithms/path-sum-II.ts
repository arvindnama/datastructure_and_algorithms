/**
 * Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.

A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const paths: number[][] = [];

    const traverse = (
        root: TreeNode | null,
        targetSum: number,
        path: number[]
    ) => {
        if (!root) return;
        if (!root.left && !root.right) {
            // leaf node ,
            if (targetSum === root.val) paths.push([...path, root.val]);
            return;
        }

        targetSum -= root.val;

        traverse(root.left, targetSum, [...path, root.val]);
        traverse(root.right, targetSum, [...path, root.val]);
    };

    if (!root) return [];
    traverse(root, targetSum, []);
    return paths;
}

const root = createTree([
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
    5,
    1,
]);
console.log(pathSum(root, 22));
