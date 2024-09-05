/**
 * You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start.

Each minute, a node becomes infected if:

The node is currently uninfected.
The node is adjacent to an infected node.
Return the number of minutes needed for the entire tree to be infected
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function amountOfTime(root: TreeNode | null, start: number): number {
    /**
     * Convert the tree to an undirected graph [][] , BFS from start node a
     * and max distance to cover all nodes is the time to infect.
     */

    const graph: { [k in number]: number[] } = {};
    const traverse = (root: TreeNode | null) => {
        if (!root) return;

        graph[root.val] = graph[root.val] || [];
        if (root.left) {
            graph[root.val].push(root.left.val);
            graph[root.left.val] = graph[root.left.val] || [];
            graph[root.left.val].push(root.val);
            traverse(root.left);
        }

        if (root.right) {
            graph[root.val].push(root.right.val);
            graph[root.right.val] = graph[root.right.val] || [];
            graph[root.right.val].push(root.val);
            traverse(root.right);
        }
    };
    traverse(root);

    const queue: { n: number; time: number }[] = [{ n: start, time: 0 }];
    const visited: { [k in number]: boolean } = {};

    let maxTimeToInfect = 0;
    while (queue.length) {
        const node = queue.shift() as { n: number; time: number };
        visited[node.n] = true;
        maxTimeToInfect = Math.max(maxTimeToInfect, node.time);
        const adjNodes = graph[node.n];
        adjNodes.forEach((n) => {
            if (!visited[n]) queue.push({ n, time: node.time + 1 });
        });
    }
    return maxTimeToInfect;
}

let root = createTree([1, 5, 3, null, 4, 10, 6, null, null, 9, 2]);
console.log(amountOfTime(root, 3));

root = createTree([1]);
console.log(amountOfTime(root, 1));
