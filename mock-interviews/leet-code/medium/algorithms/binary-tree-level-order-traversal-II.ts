/**
 * Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function levelOrderBottom(root: TreeNode | null): number[][] {
    /**
     * perform a BFS travesal , record the level ,
     * push nodes to level array.
     * reverse the main array at end
     */

    if (!root) return [];

    const queue: Array<{ node: TreeNode; level: number }> = [
        { node: root, level: 0 },
    ];
    const res: Array<number[]> = [];

    while (queue.length) {
        const n = queue.shift() as { node: TreeNode; level: number };
        res[n.level] = res[n.level] || [];
        res[n.level].push(n.node.val);
        if (n.node.left) queue.push({ node: n.node.left, level: n.level + 1 });
        if (n.node.right)
            queue.push({ node: n.node.right, level: n.level + 1 });
    }

    const levels = res.length - 1;
    return res.map((_, level) => res[levels - level]); // reversing
}

const root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(levelOrderBottom(root));
