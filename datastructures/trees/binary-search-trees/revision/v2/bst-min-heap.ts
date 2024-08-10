/***
 * Given a binary search tree which is also a complete binary tree. The problem is to convert the given BST into a Min Heap with the condition that all the values in the left subtree of a node should be less than all the values in the right subtree of the node. This condition is applied to all the nodes, in the resultant converted Min Heap.
 */

import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../../models/tree.models';

const bstToMinHeap = (root: Nullable<TreeNumNode>): Nullable<TreeNumNode> => {
    if (!root) return root;

    const inOrderTraverse = (root: Nullable<TreeNumNode>, arr: number[]) => {
        if (!root) return;
        inOrderTraverse(root.left, arr);
        arr.push(root.value);
        inOrderTraverse(root.right, arr);
    };

    const preOrderTraverseNReplace = (
        root: Nullable<TreeNumNode>,
        arr: number[]
    ) => {
        if (!root) return;
        root.value = arr.shift() as number;
        preOrderTraverseNReplace(root.left, arr);
        preOrderTraverseNReplace(root.right, arr);
    };
    const arr: number[] = [];
    inOrderTraverse(root, arr);
    preOrderTraverseNReplace(root, arr);
    return root;
};

const root = createTree([4, 2, 6, 1, 3, 5, 7]);
console.log('Complete BST to Min Heap');
console.log('Complete BST ::');
printTree(root);

console.log('Min Heap ::');
printTree(bstToMinHeap(root));
