/**
 * Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function diameterOfBinaryTree(root: TreeNode | null): number {
    /**
     *  longest path Max of  height of left subtree + hight of right sub tree
     *  of all nodes
     *
     * so perform a DFS to get depth of each node, and for each calcuate the longest path for that node and compare with the master.
     */

    let longestPath = 0;
    const dfs = (root: TreeNode | null): number => {
        if (!root) return 0;
        const leftDepth = dfs(root.left);
        const rightDepth = dfs(root.right);
        const pathForNode = leftDepth + rightDepth;
        longestPath = Math.max(longestPath, pathForNode);
        // dept of current node 1 + max of left  , right
        return 1 + Math.max(leftDepth, rightDepth);
    };

    dfs(root);
    return longestPath;
}

let root = createTree([1, 2, 3, 4, 5]);
console.log(diameterOfBinaryTree(root));

root = createTree([1, 2]);
console.log(diameterOfBinaryTree(root));
