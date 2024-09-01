/**
 * ou are given the root of a binary tree.

A ZigZag path for a binary tree is defined as follow:

Choose any node in the binary tree and a direction (right or left).
If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
Change the direction from right to left or from left to right.
Repeat the second and third steps until you can't move in the tree.
Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

Return the longest ZigZag path contained in that tree
 */

import { TreeNode } from '../../../../models/leet-code.models';

function longestZigZag(root: TreeNode | null): number {
    /**
     * zig zag path is traversing in alternate direction down the tree. (dfs)
     * to get the longest path.
     *  we need to keep track of the previous direction.
     * dfs takes root, direction & lenOfPath.
     * for every node , if prev direction was left we move right and update length by 1
     * additionally we also start a new path from cur node in left direction with len 1
     * (this will cover the case if parent path is not longest)
     * Do the same for direction === right.
     *
     * at every step we keep updating the  longest path.
     */

    let longestPath = 0;
    const dfs = (
        root: TreeNode | null,
        direction: 'right' | 'left',
        len: number
    ) => {
        if (!root) return;
        longestPath = Math.max(longestPath, len);

        if (direction === 'right') {
            dfs(root.left, 'left', len + 1);
            dfs(root.right, 'right', 1);
        } else {
            dfs(root.right, 'right', len + 1);
            dfs(root.left, 'left', 1);
        }
    };
    if (!root) return 0;
    dfs(root.left, 'left', 1);
    dfs(root.right, 'right', 1);
    return longestPath;
}

let root = new TreeNode(1);
root.right = new TreeNode(1);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(1);
root.right.right.right = new TreeNode(1);
root.right.right.left = new TreeNode(1);
root.right.right.left.right = new TreeNode(1);
root.right.right.left.right.right = new TreeNode(1);
root.right.right.left.right.right.right = new TreeNode(1);
console.log(longestZigZag(root));

root = new TreeNode(1);
root.right = new TreeNode(1);
root.left = new TreeNode(1);
root.left.right = new TreeNode(1);
root.left.right = new TreeNode(1);
root.left.right.right = new TreeNode(1);
root.left.right.left = new TreeNode(1);
root.left.right.left.right = new TreeNode(1);

console.log(longestZigZag(root));
