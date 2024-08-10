/**
 * Given a binary search tree, task is to find Kth largest element in the binary search tree.
 */

import { createTree, TreeNumNode } from '../../../../../models/tree.models';

const findKLargest = (
    root: Nullable<TreeNumNode>,
    k: number
): number | null => {
    let c = 0;
    const find = (root: Nullable<TreeNumNode>): number | null => {
        if (!root) return null;
        const res = find(root.right);
        if (res !== null) return res;
        c++;
        if (k === c) return root.value;
        return find(root.left);
    };
    return find(root);
};

const root = createTree([10, 4, 20, 2, null, 15, 40]) as TreeNumNode;
console.log(findKLargest(root, 5));
