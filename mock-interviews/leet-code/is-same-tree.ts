/**
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 */

import { createTree, TreeNode } from '../../models/leet-code.models';

function isSameTree(p?: TreeNode | null, q?: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (p && !q) return false;
    if (!p && q) return false;

    if (p?.val !== q?.val) return false;

    if (!isSameTree(p?.left, q?.left)) return false;
    if (!isSameTree(p?.right, q?.right)) return false;

    return true;
}

let t1 = createTree([1, 2, 3, 4, 5]);
let t2 = createTree([1, 2, 3, 4, 5]);
console.log(isSameTree(t1, t2));

t1 = createTree([1, 2]);
t2 = createTree([1, null, 2]);
console.log(isSameTree(t1, t2));

t1 = createTree([1, 2, 1]);
t2 = createTree([1, 1, 2]);
console.log(isSameTree(t1, t2));
