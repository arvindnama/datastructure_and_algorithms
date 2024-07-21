/**
 * Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

If the tree has more than one mode, return them in any order.

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
Both the left and right subtrees must also be binary search trees.

 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function findMode(root: TreeNode | null): number[] {
    if (!root) return [];
    const map: { [k in number]: number } = {};

    const dfs = (root: TreeNode | null) => {
        if (!root) return;
        map[root.val] = map[root.val] || 0;
        map[root.val]++;
        dfs(root.left);
        dfs(root.right);
    };

    dfs(root);

    const mode = Math.max(...Object.values(map));
    return Object.keys(map)
        .map((k) => parseInt(k))
        .sort((a, b) => map[b] - map[a])
        .filter((k) => map[k] === mode);
}

let root = createTree([1, 1, 2, 1, null, 2, 2]);
console.log(findMode(root));

root = createTree([0]);
console.log(findMode(root));
