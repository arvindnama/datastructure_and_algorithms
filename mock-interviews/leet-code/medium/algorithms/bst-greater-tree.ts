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
} from '../../../../models/leet-code.models';

function convertBST(root: TreeNode | null): TreeNode | null {
    /**
     *  reverse inorder traversal , i.e. right , root , left
     */

    const reverseInOrder = (root: TreeNode | null, sum: number): number => {
        if (!root) return sum;
        if (!root.left && !root.right) {
            root.val += sum;
            return root.val;
        }

        sum = reverseInOrder(root.right, sum);
        root.val += sum;
        sum = root.val;
        sum = reverseInOrder(root.left, sum);
        return sum;
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
