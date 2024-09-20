/**
 * Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../../../models/leet-code.models';

function convertBST(root: TreeNode | null): TreeNode | null {
    /*
       right most child has the greatest value in BST
       we should visit tha node first and pass update it parent and then update left sub tree.
    */

    const reverseInOrder = (root: TreeNode | null, val: number): number => {
        if (!root) return val;
        if (!root.left && !root.right) {
            root.val += val;
            return root.val;
        }

        root.val += reverseInOrder(root.right, val);
        return reverseInOrder(root.left, root.val);
    };

    reverseInOrder(root, 0);
    return root;
}

const root = createTree([
    4,
    1,
    6,
    0,
    2,
    5,
    7,
    null,
    null,
    null,
    3,
    null,
    null,
    null,
    8,
]);

console.log(printTree(convertBST(root)));

/*
            4 30
        1 36       6 21
     0 36    2 35   5 26  7 15
             3 33        8 8
*/
