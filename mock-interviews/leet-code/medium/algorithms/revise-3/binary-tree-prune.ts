/**
 * Given the root of a binary tree, return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

A subtree of a node node is node plus every node that is a descendant of node.
 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../../../models/leet-code.models';

function pruneTree(root: TreeNode | null): TreeNode | null {
    /**
     *  1
     *    0
     *   0  1
     * 0  0
     */

    if (!root) return null;

    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);

    if (!root.left && !root.right) {
        if (root.val === 0) return null;
        return root;
    }
    return root;
}

let root = createTree([1, null, 0, null, null, 0, 1]);
console.log(printTree(pruneTree(root)));

root = createTree([1, 0, 1, 0, 0, 0, 1]);
console.log(printTree(pruneTree(root)));

root = createTree([1, 1, 0, 1, 1, 0, 1, 0]);
console.log(printTree(pruneTree(root)));
