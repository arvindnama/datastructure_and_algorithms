/**
 * Given a Binary Search Tree (BST), modify it so that all greater values in the given BST are added to every node. For example, consider the following BST.
 */

import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../../models/tree.models';

const addAllGraterValue = (root: TreeNumNode): TreeNumNode => {
    const reverseIn = (root: Nullable<TreeNumNode>, sum: number): number => {
        if (!root) return sum;
        const value = reverseIn(root.right, sum);
        root.value += value;
        return reverseIn(root.left, root.value);
    };

    reverseIn(root, 0);
    return root;
};

const root = createTree([50, 30, 70, 20, 40, 60, 80]) as TreeNumNode;
console.log(printTree(addAllGraterValue(root)));
