/**
 * Given a binary tree, determine if it is
height-balanced
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function isBalanced(root: TreeNode | null): boolean {
    const traverse = (
        root: TreeNode | null
    ): { isBalanced: boolean; h: number } => {
        if (!root) return { isBalanced: true, h: 0 };
        if (!root.left && !root.right) return { isBalanced: true, h: 1 };

        const left = traverse(root.left);
        const right = traverse(root.right);
        if (left.isBalanced && right.isBalanced) {
            const h = 1 + Math.max(left.h, right.h);
            const isBalanced = Math.abs(left.h - right.h) <= 1;

            return { h, isBalanced };
        }
        return { isBalanced: false, h: -1 };
    };
    return traverse(root).isBalanced;
}

let t1 = createTree([3, 9, 20, null, null, 15, 7]);
console.log(isBalanced(t1));

t1 = createTree([1, 2, 2, 3, 3, null, null, 4, 4]);
console.log(isBalanced(t1));

t1 = createTree([
    1,
    2,
    2,
    3,
    null,
    null,
    3,
    4,
    null,
    null,
    null,
    null,
    null,
    null,
    4,
]);
console.log(isBalanced(t1));
t1 = createTree([1, 2]);
console.log(isBalanced(t1));
