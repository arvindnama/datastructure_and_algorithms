/**
 * Given the root of a binary tree, flatten the tree into a "linked list":

The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree
 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../../models/leet-code.models';

function flatten(root: TreeNode | null): void {
    /*
          1
        2   3

        toList(left 2 ): leaf node
        toList(right 3 ) : leaf node
        1 -> 2 -> 3
     */

    const toList = (root: TreeNode | null): TreeNode | null => {
        if (!root) return null;

        if (!root.left && !root.right) return root;
        const [left, right] = [root.left, root.right];
        const leftLeaf = toList(left);
        const rightLeaf = toList(right);
        root.left = null;
        if (leftLeaf) {
            root.right = left;
            leftLeaf.right = right;
        }
        return rightLeaf || leftLeaf;
    };
    toList(root);
}

const root = createTree([1, 2, 5, 3, 4, null, 6]);
flatten(root);
console.log(printTree(root));
