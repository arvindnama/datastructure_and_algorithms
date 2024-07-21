/**
 * Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.
 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../models/leet-code.models';

function getMinimumDifference(root: TreeNode | null): number {
    if (!root) return 0;
    const sortedArr: number[] = [];

    const traverse = (root: TreeNode | null): void => {
        if (!root) return;

        traverse(root.left);
        sortedArr.push(root.val);

        traverse(root.right);
    };

    traverse(root);
    let minDiff = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < sortedArr.length; i++) {
        minDiff = Math.min(minDiff, Math.abs(sortedArr[i] - sortedArr[i - 1]));
    }
    return minDiff;
}

let root = createTree([4, 2, 6, 1, 3]);
printTree(root);
console.log(getMinimumDifference(root));

root = createTree([1, 0, 48, null, null, 12, 49]);
printTree(root);
console.log(getMinimumDifference(root));

root = createTree([4, 3, 6, 1, 3]);
printTree(root);
console.log(getMinimumDifference(root));

root = createTree([1, null, 5, null, null, 3]);
printTree(root);
console.log(getMinimumDifference(root));

root = createTree([236, 104, 701, null, 227, null, 911]);
printTree(root);
console.log(getMinimumDifference(root));

root = createTree([1, null, 2]);
printTree(root);
console.log(getMinimumDifference(root));
