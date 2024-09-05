/**
 * Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    let maxDepth = 0;
    const dfs = (root: TreeNode | null, depthCount: number) => {
        if (!root) return;
        if (!root.left && !root.right) {
            maxDepth = Math.max(maxDepth, depthCount);
        }
        depthCount++;
        dfs(root.left, depthCount);
        dfs(root.right, depthCount);
    };
    dfs(root, 1);
    return maxDepth;
}

let tree = createTree([3, 9, 20, null, null, 15, 7]);
console.log(maxDepth(tree));

tree = createTree([1, null, 2]);
console.log(maxDepth(tree));
