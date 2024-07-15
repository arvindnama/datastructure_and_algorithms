/**
 * Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.
 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function binaryTreePaths(root: TreeNode | null): string[] {
    if (!root) return [];

    const paths: string[] = [];

    const queue: { node: TreeNode; path: string }[] = [
        { node: root, path: `${root.val}` },
    ];

    while (queue.length) {
        const { node, path } = queue.shift() as {
            node: TreeNode;
            path: string;
        };
        if (!node.left && !node.right) {
            // leaf node.
            paths.push(path);
        }

        if (node.left)
            queue.push({ node: node.left, path: `${path}->${node.left.val}` });
        if (node.right)
            queue.push({
                node: node.right,
                path: `${path}->${node.right.val}`,
            });
    }

    return paths;
}

let root = createTree([1, 2, 3, null, 5]);
console.log(binaryTreePaths(root));

root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(binaryTreePaths(root));

root = createTree([1]);
console.log(binaryTreePaths(root));
