/**
 * Given the root of a binary tree, return the leftmost value in the last row of the tree.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function findBottomLeftValue(root: TreeNode | null): number | null {
    type Node = { n: TreeNode; level: number };

    if (!root) return null;

    const queue: Node[] = [{ n: root, level: 0 }];
    let [maxLevel, firstValInLevel] = [0, root.val];
    while (queue.length) {
        const temp = queue.shift()!;
        if (temp.level > maxLevel) {
            maxLevel = temp.level;
            firstValInLevel = temp.n.val;
        }
        if (temp.n.left) queue.push({ n: temp.n.left, level: temp.level + 1 });
        if (temp.n.right)
            queue.push({ n: temp.n.right, level: temp.level + 1 });
    }
    return firstValInLevel;
}

let t1 = createTree([2, 1, 3]);
console.log(findBottomLeftValue(t1));

t1 = createTree([
    1,
    2,
    3,
    4,
    null,
    5,
    6,
    null,
    null,
    null,
    null,
    null,
    null,
    7,
]);
console.log(findBottomLeftValue(t1));
