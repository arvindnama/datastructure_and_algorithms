/**
 * A binary tree is uni-valued if every node in the tree has the same value.

Given the root of a binary tree, return true if the given tree is uni-valued, or false otherwise.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function isUnivalTree(root: TreeNode | null): boolean {
    if (!root) return false;

    const isUniValued = (root: TreeNode, val: number): boolean => {
        if (root.val !== val) return false;
        if (root.left) {
            const res = isUniValued(root.left, val);
            if (!res) return res;
        }

        if (root.right) {
            const res = isUniValued(root.right, val);
            if (!res) return res;
        }
        return true;
    };
    return isUniValued(root, root.val);
}

let root = createTree([1, 1, 1, 1, 1, null, 1]);
console.log(isUnivalTree(root));

root = createTree([1, 1, 1, 1, 1, 2, 1]);
console.log(isUnivalTree(root));
