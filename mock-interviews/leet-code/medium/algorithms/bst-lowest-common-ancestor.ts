/**
 * Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode,
    q: TreeNode
): TreeNode | null {
    /**
     * find the path from root --> p & root --> q
     * then use 2 pointer mechanism to remove all common nodes in the path
     * first no common path is the LCA
     */

    if (!root) return null;

    const findPath = (
        root: TreeNode,
        t: TreeNode,
        path: TreeNode[]
    ): TreeNode[] => {
        // if (!root) return null;
        path = [...path, root];
        if (root.val === t.val) return path;

        return root.val > t.val
            ? findPath(root.left as TreeNode, t, path)
            : findPath(root.right as TreeNode, t, path);
    };

    const pathToP = findPath(root, p, []);
    const pathToQ = findPath(root, q, []);
    let i = 0;
    while (pathToP[i]?.val === pathToQ[i]?.val) {
        i++;
    }
    return pathToP[i - 1 || 0];
}

let root = createTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
console.log(
    lowestCommonAncestor(root, root.left as TreeNode, root.right as TreeNode)
);

root = createTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
console.log(
    lowestCommonAncestor(
        root,
        root.left as TreeNode,
        root.left?.right as TreeNode
    )
);
