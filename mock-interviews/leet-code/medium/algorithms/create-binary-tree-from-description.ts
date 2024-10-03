/**
 * You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi in a binary tree of unique values. Furthermore,

If isLefti == 1, then childi is the left child of parenti.
If isLefti == 0, then childi is the right child of parenti.
Construct the binary tree described by descriptions and return its root.

The test cases will be generated such that the binary tree is valid.
 */

import { printTree, TreeNode } from '../../../../models/leet-code.models';

function createBinaryTree(descriptions: number[][]): TreeNode | null {
    const map: { [k in number]: TreeNode } = {};
    const nodeWithParents = new Set();
    descriptions.forEach(([parent, child, isLeft]) => {
        map[parent] = map[parent] || new TreeNode(parent);
        map[child] = map[child] || new TreeNode(child);
        nodeWithParents.add(child);
        const childKind = isLeft === 1 ? 'left' : 'right';
        map[parent][childKind] = map[child];
    });

    const nodes = Object.keys(map);

    for (const node of nodes) {
        if (!nodeWithParents.has(+node)) {
            return map[+node];
        }
    }
    return null;
}

const descriptions = [
    [20, 15, 1],
    [20, 17, 0],
    [50, 20, 1],
    [50, 80, 0],
    [80, 19, 1],
];

console.log(printTree(createBinaryTree(descriptions)));
