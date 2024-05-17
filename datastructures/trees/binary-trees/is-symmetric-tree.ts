/**
 * Given a binary tree, check whether it is a mirror of itself
 */

import { TreeNode, createTree, printTree } from '../../../models/tree.models';

function isSymmetric(r: TreeNode<number>): boolean {
    const isMirror = (
        r1: Nullable<TreeNode<number>>,
        r2: Nullable<TreeNode<number>>
    ): boolean => {
        if (!r1 && !r2) return true;
        if (!r1 || !r2) return false;

        return (
            r1.value == r2.value &&
            isMirror(r1.left, r2.right) &&
            isMirror(r1.right, r2.left)
        );
    };
    return isMirror(r.left, r.right);
}

let r = createTree([1, 2, 2, 3, 4, 4, 3]);
printTree(r);
console.log('is Symmetric', isSymmetric(r));

r = createTree([1, 2, 2, , 3, , 3]) as TreeNode<number>;
printTree(r);
console.log('is Symmetric', isSymmetric(r));
