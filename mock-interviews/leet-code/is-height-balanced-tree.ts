/**
 * Given a binary tree, determine if it is
height-balanced
.
 */

import { createTree, TreeNode } from '../../models/leet-code.models';

function isBalanced(root: TreeNode | null): boolean {
    if (!root) return true;

    const getMetrics = (
        root: TreeNode | null
    ): { h: number; bf: number; notBalanced: boolean } => {
        if (!root) return { h: 0, bf: 0, notBalanced: false };
        if (!root.left && !root.right)
            return { h: 1, bf: 0, notBalanced: false };

        const hl = getMetrics(root.left);
        const hr = getMetrics(root.right);
        const h = 1 + Math.max(hl.h, hr.h);
        const bf = Math.abs(hl.h - hr.h);
        return {
            h,
            bf,
            notBalanced: hl.notBalanced || hr.notBalanced || bf > 1,
        };
    };

    const { notBalanced } = getMetrics(root);
    return !notBalanced;
}

let root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(isBalanced(root));

root = createTree([1, 2, 2, 3, 3, null, null, 4, 4]);
console.log(isBalanced(root));

root = createTree([1, 2, 2, 3, null, null, null, 4, null]);
console.log(isBalanced(root));

root = createTree([
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
    4,
]);
console.log(isBalanced(root));
