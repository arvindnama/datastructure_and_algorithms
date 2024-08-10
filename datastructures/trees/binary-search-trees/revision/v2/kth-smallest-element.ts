/**
 * Given the root of a binary search tree and K as input, find Kth smallest element in BST.
 */

import { createTree, TreeNumNode } from '../../../../../models/tree.models';

const findKSmallest = (
    root: Nullable<TreeNumNode>,
    k: number
): number | null => {
    let c = 0;
    const find = (root: Nullable<TreeNumNode>): number | null => {
        if (!root) return null;
        const res = find(root.left);
        if (res !== null) return res;
        c++;
        if (c === k) return root.value;
        return find(root.right);
    };
    return find(root);
};

const root = createTree([
    20,
    8,
    22,
    4,
    12,
    null,
    null,
    null,
    null,
    10,
    14,
]) as TreeNumNode;
console.log(findKSmallest(root, 5));
