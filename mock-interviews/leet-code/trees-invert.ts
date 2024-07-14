/**
 * Given the root of a binary tree, invert the tree, and return its root.
 */

import { createTree, printTree, TreeNode } from '../../models/leet-code.models';

function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;

    const temp = root.right;
    root.right = invertTree(root.left);
    root.left = invertTree(temp);
    return root;
}

let root = createTree([4, 2, 7, 1, 3, 6, 9]);
console.log(printTree(invertTree(root)));

root = createTree([2, 1, 3]);
console.log(printTree(invertTree(root)));
