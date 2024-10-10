/**
 * Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return true;

    const isMirror = (
        left: TreeNode | null,
        right: TreeNode | null
    ): boolean => {
        if (left && !right) return false;
        if (!left && right) return false;
        if (!left && !right) return true;

        return (
            left?.val === right?.val &&
            isMirror(left?.left as TreeNode, right?.right as TreeNode) &&
            isMirror(left?.right as TreeNode, right?.left as TreeNode)
        );
    };

    return isMirror(root.left, root.right);
}

let root = createTree([1, 2, 2, 3, 4, 4, 3]);
console.log(isSymmetric(root));

root = createTree([1, 2, 2, null, 3, null, 3]);
console.log(isSymmetric(root));
