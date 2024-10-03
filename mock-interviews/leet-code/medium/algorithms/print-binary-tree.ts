/**
 * Given the root of a binary tree, construct a 0-indexed m x n string matrix res that represents a formatted layout of the tree. The formatted layout matrix should be constructed using the following rules:

The height of the tree is height and the number of rows m should be equal to height + 1.
The number of columns n should be equal to 2height+1 - 1.
Place the root node in the middle of the top row (more formally, at location res[0][(n-1)/2]).
For each node that has been placed in the matrix at position res[r][c], place its left child at res[r+1][c-2height-r-1] and its right child at res[r+1][c+2height-r-1].
Continue this process until all the nodes in the tree have been placed.
Any empty cells should contain the empty string "".
Return the constructed matrix res.


 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function printTree(root: TreeNode | null): string[][] {
    const getHeight = (root: TreeNode | null): number => {
        if (!root) return -1;
        return 1 + Math.max(getHeight(root.left), getHeight(root.right));
    };

    const height = getHeight(root);
    const [m, n] = [height + 1, 2 ** (height + 1) - 1];
    const matrix: string[][] = new Array(m)
        .fill(null)
        .map(() => new Array(n).fill(''));

    const [r, c] = [0, Math.floor((n - 1) / 2)];
    const traverse = (root: TreeNode | null, [r, c]: [number, number]) => {
        if (!root) return;
        matrix[r][c] = root.val.toString();
        traverse(root.left, [r + 1, c - 2 ** (height - r - 1)]);
        traverse(root.right, [r + 1, c + 2 ** (height - r - 1)]);
    };

    traverse(root, [r, c]);
    return matrix;
}

let root = createTree([1, 2]);
console.log(printTree(root));

root = createTree([1, 2, 3, null, 4]);
console.log(printTree(root));
