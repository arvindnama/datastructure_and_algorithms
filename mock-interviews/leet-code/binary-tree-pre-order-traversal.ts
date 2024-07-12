/**
 * Binary Tree Preorder Traversal
 */

import { TreeNode, createTree } from '../../models/leet-code.models';

function preorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const stack: TreeNode[] = [root];

    const res: number[] = [];
    while (stack.length) {
        const n = stack.pop() as TreeNode;
        res.push(n.val);
        if (n.right) stack.push(n.right);
        if (n.left) stack.push(n.left);
    }
    return res;
}

let root = createTree([1, null, 2, null, null, 3]);
console.log(preorderTraversal(root));

root = createTree([]);
console.log(preorderTraversal(root));

root = createTree([1]);
console.log(preorderTraversal(root));

root = createTree([1, 4, 3, 2]);
console.log(preorderTraversal(root));
