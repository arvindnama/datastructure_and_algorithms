/**
 * We have a binary search tree and a number N. Our task is to find the greatest number in the binary search tree that is less than or equal to N. Print the value of the element if it exists otherwise print -1.
 */

import { createTree, TreeNumNode } from '../../../../../models/tree.models';

const find = (root: Nullable<TreeNumNode>, n: number): number => {
    if (!root) return -1;
    if (root.value === n) return n;

    if (root.value < n) {
        const res = find(root.right, n);
        if (res === -1 && root.value < n) return root.value;
        return res;
    }
    return find(root.left, n);
};

const root = createTree([
    5,
    2,
    12,
    1,
    3,
    9,
    21,
    null,
    null,
    null,
    null,
    null,
    null,
    19,
    25,
]) as TreeNumNode;

console.log(find(root, 24));
console.log(find(root, 4));
console.log(find(root, 10));
console.log(find(root, 20));
