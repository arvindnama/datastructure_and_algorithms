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
    /**
     * Find the path from root -> p && root->Q ,
     *  use 2 pointer to move the pointer on 2 paths until there is a mismatch in the path.
     * the pointer - 1 is the LCA
     */

    const findPath = (
        root: TreeNode | null,
        p: TreeNode,
        path: TreeNode[]
    ): TreeNode[] | null => {
        if (!root) return null;

        path = [...path, root];
        if (root.val === p.val) return path;

        const res = findPath(root.left, p, path);
        if (res) return res;
        return findPath(root.right, p, path);
    };

    const pathToP = findPath(root, p as TreeNode, []);
    const pathToQ = findPath(root, q as TreeNode, []);

    let i = 0;
    while (pathToP?.[i]?.val === pathToQ?.[i]?.val) {
        i++;
    }

    return pathToP?.[i - 1 || 0] ?? null;
}

const root = createTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
console.log(lowestCommonAncestor(root, root.left, root.right));
console.log(
    lowestCommonAncestor(root, root.left, root.left?.right?.right as TreeNode)
);
