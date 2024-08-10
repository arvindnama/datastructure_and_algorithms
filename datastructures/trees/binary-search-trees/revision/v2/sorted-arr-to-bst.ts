/**
 * Given a sorted array. Write a function that creates a Balanced Binary Search Tree using array elements.
 */

import { printTree, TreeNumNode } from '../../../../../models/tree.models';

const sortedArrayToBST = (arr: number[]): Nullable<TreeNumNode> => {
    if (!arr?.length) return null;
    const convert = (s: number, e: number): Nullable<TreeNumNode> => {
        if (s > e) return null;
        if (s === e) return { value: arr[e] };
        const m = Math.floor((s + e) / 2);
        const root: TreeNumNode = { value: arr[m] };
        root.left = convert(s, m - 1);
        root.right = convert(m + 1, e);
        return root;
    };
    return convert(0, arr.length - 1);
};

const root = sortedArrayToBST([1, 2, 3, 4, 5]);
printTree(root);
