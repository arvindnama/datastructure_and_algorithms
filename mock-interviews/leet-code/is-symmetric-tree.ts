/**
 * Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
 */

import { createTree, TreeNode } from '../../models/leet-code.models';

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return true;

    const isMirror = (t1?: TreeNode | null, t2?: TreeNode | null): boolean => {
        if (!t1 && !t2) return true;
        if (t1?.val !== t2?.val) return false;

        return isMirror(t1?.left, t2?.right) && isMirror(t1?.right, t2?.left);
    };

    return isMirror(root.left, root.right);
}

let root = createTree([1, 2, 2, 3, 4, 4, 3]);
console.log(isSymmetric(root));

root = createTree([1, 2, 2, null, 3, null, 3]);
console.log(isSymmetric(root));

root = createTree([1, 2, 2, null, 3, 3]);
console.log(isSymmetric(root));
