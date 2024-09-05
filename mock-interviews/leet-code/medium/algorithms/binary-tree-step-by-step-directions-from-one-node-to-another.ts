/**
 * You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function getDirections(
    root: TreeNode | null,
    startValue: number,
    destValue: number
): string {
    /**
     * Convert the tree to undirected graph and start traversing
     * there is always going to be one path (and that is the shortest path)
     */

    const graph: { [k in number]: { n: number; r: 'L' | 'R' | 'U' }[] } = {};

    const traverse = (root: TreeNode | null) => {
        if (!root) return;
        graph[root.val] = graph[root.val] || [];
        if (root.left) {
            graph[root.val].push({ n: root.left.val, r: 'L' });
            graph[root.left.val] = graph[root.left.val] || [];
            graph[root.left.val].push({ n: root.val, r: 'U' });
            traverse(root.left);
        }
        if (root.right) {
            graph[root.val].push({ n: root.right.val, r: 'R' });
            graph[root.right.val] = graph[root.right.val] || [];
            graph[root.right.val].push({ n: root.val, r: 'U' });
            traverse(root.right);
        }
    };

    traverse(root);
    const queue: { n: number; path: string[] }[] = [
        { n: startValue, path: [] },
    ];
    const visited: { [k in number]: boolean } = {};
    let finalPath = '';
    while (queue.length) {
        const node = queue.shift() as { n: number; path: [] };
        visited[node.n] = true;
        if (node.n === destValue) {
            finalPath = node.path.join('');
            break;
        }
        graph[node.n]
            .filter((n) => !visited[n.n])
            .forEach((n) => {
                queue.push({ n: n.n, path: [...node.path, n.r] });
            });
    }
    return finalPath;
}

let root = createTree([5, 1, 2, 3, null, 6, 4]);
console.log(getDirections(root, 3, 6));
root = createTree([2, 1]);
console.log(getDirections(root, 2, 1));
