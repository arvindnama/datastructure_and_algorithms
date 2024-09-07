/**
 * Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”


 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
): TreeNode | null {
    if (root == null || root?.val === p?.val || root?.val === q?.val) {
        return root;
    }

    const left = lowestCommonAncestor(root?.left as TreeNode, p, q);
    const right = lowestCommonAncestor(root?.right as TreeNode, p, q);
    if (left && right) {
        // both p & q are in opposite subtrees
        // hence LCA will be root
        return root;
    }

    return !left ? right : left;
}

const root = createTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
console.log(lowestCommonAncestor(root, root.left, root.right));
console.log(
    lowestCommonAncestor(root, root.left, root.left?.right?.right as TreeNode)
);
