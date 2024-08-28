/**
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function isSameTree(
    p: TreeNode | null | undefined,
    q: TreeNode | null | undefined
): boolean {
    if (!p && q) return false;
    if (p && !q) return false;
    if (!p && !q) return true;

    if (p?.val === q?.val) {
        return isSameTree(p?.left, q?.left) && isSameTree(p?.right, q?.right);
    }
    return false;
}

let [t1, t2] = [createTree([1, 2, 3]), createTree([1, 2, 3])];
console.log(isSameTree(t1, t2));

[t1, t2] = [createTree([1, 2, 3]), createTree([1, 3, 2])];
console.log(isSameTree(t1, t2));
