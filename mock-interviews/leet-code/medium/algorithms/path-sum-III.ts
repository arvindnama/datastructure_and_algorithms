/**
 * Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function pathSum(root: TreeNode | null, targetSum: number): number {
    /**
     * Find the no. of paths with target sum starting from root.
     * + pathSum for root->left & path sum for root -> right
     */

    let paths = 0;
    const traverse = (root: TreeNode | null, targetSum: number) => {
        if (!root) return;
        if (targetSum === root.val) {
            paths++;
            // Since node values are combination of negative &
            // positive integers , it is posssible to find another
            // solution even thought we already found a targetSum
            // instead of returning lets continue.
            // return;
        }

        targetSum -= root.val;
        traverse(root.left, targetSum);
        traverse(root.right, targetSum);
    };

    if (!root) return 0;
    traverse(root, targetSum);
    return (
        paths + pathSum(root.left, targetSum) + pathSum(root.right, targetSum)
    );
}

let root = createTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
console.log(pathSum(root, 8));

root = createTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
console.log(pathSum(root, 22));

root = createTree([1, -2, -3, 1, 3, -2, null, -1]);
console.log(pathSum(root, -1));
