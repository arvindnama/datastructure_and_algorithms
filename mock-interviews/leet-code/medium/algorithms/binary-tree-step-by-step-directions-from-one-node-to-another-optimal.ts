/**
 * You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function getDirections(
    root: TreeNode | null,
    startValue: number,
    destValue: number
): string {
    /**
     * s -> t , always goes the Least common ancestor
     *
     * we can find the path from root -> s & root -> t
     * and find the LCA from 2 paths. LCA -> & LCA -> t
     * we need to reverse s -> LCA + LCA->t is the result.
     */

    if (!root) return '';

    const findPath = (
        root: TreeNode | null,
        target: number,
        path: { n: number; r?: 'L' | 'R' | 'U' }[],
        r?: 'L' | 'R'
    ): { n: number; r?: 'L' | 'R' | 'U' }[] | null => {
        if (!root) return null;
        path = [...path, { n: root.val, r }];
        if (root.val === target) {
            return path;
        }
        const res = findPath(root.left, target, path, 'L');
        if (res) return res;
        return findPath(root.right, target, path, 'R');
    };

    const rootToSPath = findPath(root, startValue, []) || [];
    const rootToTPath = findPath(root, destValue, []) || [];

    /**
     * Find the LCA , 2 pointer mechanism
     *  p1 -> start of rootToSPath
     *  p2 -> start of rootToTPath
     *  while p1.n === p2.n , move by one of shift the array content
     */

    let p1 = rootToSPath[0];
    let p2 = rootToTPath[0];
    let i = 0;
    while (p1?.n === p2?.n) {
        i++;
        p1 = rootToSPath[i];
        p2 = rootToTPath[i];
    }
    /**
     * Reverse LCA->s + LCA->T
     */

    return (
        'U'.repeat(rootToSPath.filter((_, idx) => idx >= i).length) +
        rootToTPath
            .filter((_, idx) => idx >= i)
            .map(({ r }) => r)
            .join('')
    );
}

let root = createTree([5, 1, 2, 3, null, 6, 4]);
console.log(getDirections(root, 3, 6));

root = createTree([5, 1, 2, 3, null, 6, 4]);
console.log(getDirections(root, 6, 4));
root = createTree([2, 1]);
console.log(getDirections(root, 2, 1));
