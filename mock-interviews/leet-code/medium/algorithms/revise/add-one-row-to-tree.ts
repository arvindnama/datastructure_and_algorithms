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
} from '../../../../../models/leet-code.models';

function addOneRow(
    root: TreeNode | null,
    val: number,
    depth: number
): TreeNode | null {
    /**
     * perform a level order traversal
     * as you push the node to queue , keep track of its level.
     * when level + 1 === depth then
     *  node.left = new node(val) , new Node(val).left = node.left
     *  node.right = new node(val) , new Node(val).right = node.right
     *
     * if depth === 1 i.e we need to insert at root
     *
     */

    if (depth == 1) {
        return new TreeNode(val, root);
    }
    if (!root) return null;

    const queue: { node: TreeNode; level: number }[] = [
        { node: root, level: 1 },
    ];

    while (queue.length) {
        const temp = queue.shift()!;
        if (temp.level + 1 === depth) {
            temp.node.left = new TreeNode(val, temp.node.left);
            temp.node.right = new TreeNode(val, null, temp.node.right);
            continue;
        }
        if (temp.node.left)
            queue.push({ node: temp.node.left, level: temp.level + 1 });
        if (temp.node.right)
            queue.push({ node: temp.node.right, level: temp.level + 1 });
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
