/**
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 */

import { TreeNode, createTree } from '../../models/leet-code.models';

function inorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const res: number[] = [];
    const queue: TreeNode[] = [root];
    while (queue.length) {
        const node = queue.shift() as TreeNode;
        res.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return res;
}

const root = createTree([1, null as any, 2, 3]);
console.log(inorderTraversal(root));
