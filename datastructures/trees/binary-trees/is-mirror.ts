/**
 * Given two Binary Trees, write a function that returns true if two trees are mirror of each other, else false. For example, the function should return true for following input trees
 */

import { TreeNode, createTree } from '../../../models/tree.models';

function isMirror(
    root1: Nullable<TreeNode<number>>,
    root2: Nullable<TreeNode<number>>
): boolean {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;

    return (
        root1.value === root2.value &&
        isMirror(root1.left, root2.right) &&
        isMirror(root1.right, root2.left)
    );
}

const root1: TreeNode<number> = createTree([
    1,
    3,
    2,
    ,
    ,
    5,
    4,
]) as TreeNode<number>;
const root2: TreeNode<number> = createTree([1, 2, 3, 4, 5]);

console.log('isMirror', isMirror(root1, root2));
