/**
 * Given a Binary Tree, write a function to check whether the given Binary Tree is a perfect Binary Tree or not.
A Binary tree is Perfect Binary Tree in which all internal nodes have two children and all leaves are at same level.

* At any level l total nodes at that level is 2^l
 */

import { TreeNode, createTree, printTree } from '../../../models/tree.models';

type Node = { node: TreeNode<number>; level: number };
type DataStore = { [key in number]: number };

function isPerfectBinaryTree(root: TreeNode<number>): boolean {
    const queue: Node[] = [{ node: root, level: 0 }];
    const store: DataStore = {};

    while (queue.length) {
        const n = queue.shift() as Node;
        store[n.level] = (store[n.level] || 0) + 1;

        if (n.node.left) queue.push({ node: n.node.left, level: n.level + 1 });
        if (n.node.right)
            queue.push({ node: n.node.right, level: n.level + 1 });
    }

    return Object.values(store).reduce((acc, cur, idx) => {
        return acc && Math.pow(2, idx) === cur;
    }, true);
}

let root = createTree([1, 2, 3, 4, 5, 6, 7]);
printTree(root);
console.log('isTreePerfect::', isPerfectBinaryTree(root));

root = createTree([1, 2, 3, , 4, 5, 6]) as TreeNode<number>;
printTree(root);
console.log('isTreePerfect::', isPerfectBinaryTree(root));
