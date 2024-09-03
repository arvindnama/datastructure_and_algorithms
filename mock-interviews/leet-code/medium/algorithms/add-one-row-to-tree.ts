/**
 * Given the root of a binary tree and two integers val and depth, add a row of nodes with value val at the given depth depth.

Note that the root node is at depth 1.

The adding rule is:

Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree nodes with value val as cur's left subtree root and right subtree root.
cur's original left subtree should be the left subtree of the new left subtree root.
cur's original right subtree should be the right subtree of the new right subtree root.
If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val as the new root of the whole original tree, and the original tree is the new root's left subtree.

 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../../models/leet-code.models';

function addOneRow(
    root: TreeNode | null,
    val: number,
    depth: number
): TreeNode | null {
    if (!root) return root;

    if (depth === 1) {
        const temp = root;
        root = new TreeNode(val);
        root.left = temp;
        return root;
    }

    const queue: { node: TreeNode; depth: number }[] = [
        { node: root, depth: 1 },
    ];

    while (queue.length) {
        const entry = queue.shift() as { node: TreeNode; depth: number };
        if (entry.depth > depth) {
            // i am only interested in up to depth
            continue;
        }
        if (entry.depth === depth - 1) {
            const left = entry.node.left;
            entry.node.left = new TreeNode(val, left);
            // I can actually stop adding to queue since I have achieved my depth

            const right = entry.node.right;
            entry.node.right = new TreeNode(val, undefined, right);
            // I can actually stop adding to queue since I have achieved my depth
            continue;
        }
        // for node.depths  < depth
        if (entry.node.left)
            queue.push({ node: entry.node.left, depth: entry.depth + 1 });
        if (entry.node.right)
            queue.push({ node: entry.node.right, depth: entry.depth + 1 });
    }

    return root;
}

let root = createTree([4, 2, 6, 3, 1, 5]);
console.log(printTree(addOneRow(root, 1, 2)));

root = createTree([4, 2, null, 3, 1]);
console.log(printTree(addOneRow(root, 1, 3)));

root = createTree([1, 2, 3, 4]);
console.log(printTree(addOneRow(root, 5, 4)));

root = createTree([1, 2, 3, 4]);
console.log(printTree(addOneRow(root, 5, 4)));
