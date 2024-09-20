/**
 * You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function getDirections(
    root: TreeNode | null,
    startValue: number,
    destValue: number
): string {
    /**
     * find the path from root -> s & root -> t
     *
     * from both paths find Least common ancestor
     */

    if (!root) return '';
    type Path = { val: number; direction: string }[];

    const findPath = (
        root: TreeNode | null,
        dest: number,
        path: Path,
        direction: string
    ): Path | null => {
        if (!root) return null;

        const lPath = [...path, { val: root.val, direction }];

        if (root.val === dest) return lPath;

        const res = findPath(root.left, dest, lPath, 'L');
        if (res) return res;
        return findPath(root.right, dest, lPath, 'R');
    };

    const pathToS = findPath(root, startValue, [], '') || [];
    const pathToD = findPath(root, destValue, [], '') || [];

    let i = 0;
    while (pathToS[i]?.val === pathToD[i]?.val) {
        i++;
    }

    return (
        pathToS
            .filter((_, idx) => idx >= i)
            .map(() => 'U')
            .join('') +
        pathToD
            .filter((_, idx) => idx >= i)
            .map((path) => path.direction)
            .join('')
    );
}

let root = createTree([5, 1, 2, 3, null, 6, 4]);
console.log(getDirections(root, 3, 6));

root = createTree([5, 1, 2, 3, null, 6, 4]);
console.log(getDirections(root, 6, 4));
root = createTree([2, 1]);
console.log(getDirections(root, 2, 1));
