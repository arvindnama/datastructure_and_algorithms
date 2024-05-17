/**
 * Given a binary tree and a key, insert the key into the binary tree at the first position available in level order
 */

import {
    TreeNode,
    createTree,
    createTreeNode,
    printTree,
} from '../../../models/tree.models';

function insert<T>(root: TreeNode<T>, key: T): TreeNode<T> {
    const queue = [root];
    while (queue.length) {
        const node = queue.shift() as TreeNode<T>;
        if (!node.left) {
            node.left = createTreeNode(key);
            break;
        }
        if (!node.right) {
            node.right = createTreeNode(key);
            break;
        }

        queue.push(node.right);
        queue.push(node.left);
    }

    return root;
}

console.log('insert-1 ');
const root = createTree([10, 11, 9, 7, null, 15, 8]);
printTree(root);
printTree(insert(root, 12));
