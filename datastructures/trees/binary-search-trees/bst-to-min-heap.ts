/***
 * Given a binary search tree which is also a complete binary tree. The problem is to convert the given BST into a Min Heap with the condition that all the values in the left subtree of a node should be less than all the values in the right subtree of the node. This condition is applied to all the nodes, in the resultant converted Min Heap.
 */

import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

/**
 * Input is a complete BST.
 * Output is a Min Heap with all elements in left subtree < elements in right subtree
 * 1. In order traverse and store all elements into an array
 * 2. perform a pre-order traversal and when accessing the root replace teh value with top element in array (and remove element from array)
 */
function bstToMinHeap(root: TreeNumNode): TreeNumNode {
    const inOrder = (root: Nullable<TreeNumNode>, arr: number[]) => {
        if (!root) return;
        if (!root.left && !root.right) {
            arr.push(root.value);
            return;
        }
        inOrder(root.left, arr);
        arr.push(root.value);
        inOrder(root.right, arr);
    };

    const preOrderTraverse = (root: Nullable<TreeNumNode>, arr: number[]) => {
        if (!root) return;

        root.value = arr.shift() as number;
        preOrderTraverse(root.left, arr);
        preOrderTraverse(root.right, arr);
    };

    const arr: number[] = [];
    inOrder(root, arr);
    preOrderTraverse(root, arr);
    return root;
}

const root = createTree([4, 2, 6, 1, 3, 5, 7]);
console.log('Complete BST to Min Heap');
console.log('Complete BST ::');
printTree(root);

console.log('Min Heap ::');
printTree(bstToMinHeap(root));
