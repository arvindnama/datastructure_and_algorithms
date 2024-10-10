/**
 *
Given a binary tree, determine if it is
height-balanced
.
 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function isBalanced(root: TreeNode | null): boolean {
    /**
     * we need 2 things
     *  1. height of left & right nodes
     *  2. if left is balanced & right is balanced;
     */

    const traverse = (
        root: TreeNode | null
    ): { isBalanced: boolean; height: number } => {
        if (!root) return { isBalanced: true, height: 0 };
        if (!root.left && !root.right) return { isBalanced: true, height: 1 };

        const left = traverse(root.left);
        if (!left.isBalanced) {
            return { height: -1, isBalanced: false };
        }
        const right = traverse(root.right);
        if (!right.isBalanced) {
            return { height: -1, isBalanced: false };
        }

        const bf = left.height - right.height;
        return {
            height: 1 + Math.max(left.height, right.height),
            isBalanced: bf >= -1 && bf <= 1,
        };
    };

    return traverse(root).isBalanced;
}

let root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(isBalanced(root));

root = createTree([1, 2, 2, 3, 3, null, null, 4, 4]);
console.log(isBalanced(root));
