/**
 * Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
    /**
     * We can perform a BFS and as well add node to queue we also record level & parent
     * of each node, this will allows us to check if x & y are cousins
     *  i.e. x & y should be same level but different parents.
     */

    if (!root) return false;
    const queue: { node: TreeNode; level: number; parent: number }[] = [
        { node: root, level: 0, parent: -1 },
    ];

    const map = {
        [x]: { level: -1, parent: -1, visited: false },
        [y]: { level: -1, parent: -1, visited: false },
    };
    while (queue.length) {
        const n = queue.shift() as {
            node: TreeNode;
            level: number;
            parent: number;
        };
        if (n.node.val == x || n.node.val == y) {
            map[n.node.val].level = n.level;
            map[n.node.val].parent = n.parent;
            map[n.node.val].visited = true;
        }
        if (map[x].visited && map[y].visited) break;

        // if both x & y are visited we can break'
        if (n.node.left)
            queue.push({
                node: n.node.left,
                level: n.level + 1,
                parent: n.node.val,
            });
        if (n.node.right)
            queue.push({
                node: n.node.right,
                level: n.level + 1,
                parent: n.node.val,
            });
    }
    // I have traversed all the tree.
    return map[x].level === map[y].level && map[x].parent !== map[y].parent;
}

let tree = createTree([1, 2, 3, 4]);
console.log(isCousins(tree, 4, 3));

tree = createTree([1, 2, 3, null, 4, null, 5]);
console.log(isCousins(tree, 4, 5));

tree = createTree([1, 2, 3, null, 4]);
console.log(isCousins(tree, 2, 3));
