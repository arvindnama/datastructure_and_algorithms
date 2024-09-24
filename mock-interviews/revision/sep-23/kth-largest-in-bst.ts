/**
 * Given a binary search tree, task is to find Kth largest element in the binary search tree.
 */

import { createTree, TreeNumNode } from '../../../models/tree.models';

const findKLargest = (
    root: Nullable<TreeNumNode>,
    k: number
): number | null => {
    /**
     * Ideas is to traverse to the largest
     * which can be found at to the right most of BST.
     * then traverse back to root and then to left sub tree
     * and reduce k , when counter is zero we have the kth lat
     */

    const traverse = (root: Nullable<TreeNumNode>): number | null => {
        if (!root) return null;
        const res = traverse(root.right);
        if (res !== null) return res;
        k--;
        if (k === 0) return root.value;
        return traverse(root.left);
    };
    return traverse(root);
};

const root = createTree([10, 4, 20, 2, null, 15, 40]) as TreeNumNode;
console.log(findKLargest(root, 5));
