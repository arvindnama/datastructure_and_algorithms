/**
 * You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.
 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../../models/leet-code.models';

function recoverTree(root: TreeNode | null): void {
    /**
     * in case of BST , inorder traversal will be sorted array
     *
     *   1
     *  3
     *    2
     *
     * inorder = 3 2 1
     * we need to now make this array sorted
     * we need to find 2 element that needs to be swapped
     * first element we can find
     *   navigate from left to right  ==> first i such [i] > [i+1] [breaks the sort]
     *   navigate from right to left  ==> first i such [i-1] > [i] [breaks the sort]
     *
     */

    const inOrder: TreeNode[] = [];
    const traverse = (root: TreeNode | null) => {
        if (!root) return;
        traverse(root.left);
        inOrder.push(root);
        traverse(root.right);
    };

    traverse(root);
    let first!: TreeNode;
    let second!: TreeNode;

    for (let i = 0; i < inOrder.length - 1; i++) {
        if (inOrder[i].val > inOrder[i + 1].val) {
            first = inOrder[i];
            break;
        }
    }

    for (let i = inOrder.length - 1; i > 0; i--) {
        if (inOrder[i - 1].val > inOrder[i].val) {
            second = inOrder[i];
            break;
        }
    }

    [first.val, second.val] = [second.val, first.val];
}

let root = createTree([1, 3, null, null, 2]);

recoverTree(root);
console.log(printTree(root));

root = createTree([3, 1, 4, null, null, 2]);

recoverTree(root);
console.log(printTree(root));
