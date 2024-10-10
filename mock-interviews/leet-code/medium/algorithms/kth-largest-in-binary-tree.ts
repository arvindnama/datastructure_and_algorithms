/**
 * You are given the root of a binary tree and a positive integer k.

The level sum in the tree is the sum of the values of the nodes that are on the same level.

Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.

Note that two nodes are on the same level if they have the same distance from the root.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function kthLargestLevelSum(root: TreeNode | null, k: number): number {
    if (!root) return -1;
    const queue = [root];
    const levelSum: number[] = [];

    while (queue.length) {
        // read all nodes in level i and get some .

        const nodesInLevelCount = queue.length;

        levelSum.push(queue.reduce((levelSum, cur) => levelSum + cur.val, 0));
        for (let i = 0; i < nodesInLevelCount; i++) {
            const node = queue.shift()!;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    levelSum.sort((a, b) => b - a);

    if (levelSum.length < k) return -1;
    return levelSum[k - 1];
}

let root = createTree([5, 8, 9, 2, 1, 3, 7, 4, 6]);
console.log(kthLargestLevelSum(root, 2));

root = createTree([1, 2, null, 3]);
console.log(kthLargestLevelSum(root, 1));

root = createTree([5, 8, 9, 2, 1, 3, 7]);
console.log(kthLargestLevelSum(root, 4));
