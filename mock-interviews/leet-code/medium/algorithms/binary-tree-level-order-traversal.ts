/**
 * Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function levelOrder(root: TreeNode | null): number[][] {
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

    return res;
}

let root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(levelOrder(root));

root = createTree([1]);
console.log(levelOrder(root));

root = createTree([]);
console.log(levelOrder(root));
