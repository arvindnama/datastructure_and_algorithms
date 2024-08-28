/**
 * Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return false;

    const isMirror = (
        r1: TreeNode | null | undefined,
        r2?: TreeNode | null | undefined
    ): boolean => {
        if (!r1 && !r2) return true;
        if (!r1 && r2) return false;
        if (r1 && !r2) return false;

        if (r1?.val === r2?.val) {
            return (
                isMirror(r1?.left, r2?.right) && isMirror(r1?.right, r2?.left)
            );
        }
        return false;
    };

    return isMirror(root.left, root.right);
}

let t1 = createTree([1, 2, 2, 3, 4, 4, 3]);
console.log(isSymmetric(t1));

t1 = createTree([1, 2, 2, 3, null, null, 3]);
console.log(isSymmetric(t1));
