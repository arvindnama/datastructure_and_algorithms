/**
 * Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    let maxDepth = 0;

    const queue: Array<TreeNode & { level: number }> = [{ ...root, level: 1 }];

    while (queue.length) {
        const n = queue.shift() as TreeNode & { level: number };
        maxDepth = n.level;
        if (n.left) queue.push({ ...n.left, level: n.level + 1 });
        if (n.right) queue.push({ ...n.right, level: n.level + 1 });
    }

    return maxDepth;
}

let root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(maxDepth(root));

root = createTree([1, 2, null]);
console.log(maxDepth(root));

root = createTree([1, 2, -1, 3, null, null, null, 4]);
console.log(maxDepth(root));
