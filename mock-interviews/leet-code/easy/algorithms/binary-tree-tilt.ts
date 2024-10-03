/**
 * Given the root of a binary tree, return the sum of every tree node's tilt.

The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as 0. The rule is similar if the node does not have a right child.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function findTilt(root: TreeNode | null): number {
    /**
     * tilt(root) = | sum(root.left) - sum(root.right) |
     *  every node i need to find the sum of all its nodes.
     */

    let sumOfTilts = 0;
    const sum = (root: TreeNode | null): number => {
        if (!root) return 0;
        const left = sum(root.left);
        const right = sum(root.right);

        const tilt = Math.abs(left - right);
        sumOfTilts += tilt;
        return root.val + right + left;
    };

    sum(root);
    return sumOfTilts;
}

let root = createTree([1, 2, 3]);
console.log(findTilt(root));

root = createTree([4, 2, 9, 3, 5, null, 7]);
console.log(findTilt(root));
