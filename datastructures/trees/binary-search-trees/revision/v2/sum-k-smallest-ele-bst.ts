/**
 * Given Binary Search Tree. The task is to find sum of all elements smaller than and equal to Kth smallest element.
 */

import { createTree, TreeNumNode } from '../../../../../models/tree.models';

const findSumKSmallest = (root: Nullable<TreeNumNode>, k: number): number => {
    let c = 0;
    let sum: number = 0;
    const inOrder = (root: Nullable<TreeNumNode>) => {
        if (!root) return;
        inOrder(root.left);
        c++;
        if (c <= k) {
            sum += root.value;
        }
        inOrder(root.right);
    };
    inOrder(root);
    return sum;
};

let root = createTree([8, 7, 10, 2, null, 9, 13]) as TreeNumNode;
console.log(findSumKSmallest(root, 3));
root = createTree([8, 5, 11, 2, 7, null, null, null, 3]) as TreeNumNode;
console.log(findSumKSmallest(root, 5));
