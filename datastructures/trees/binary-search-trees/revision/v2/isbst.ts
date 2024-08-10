import { createTree, TreeNumNode } from '../../../../../models/tree.models';

const isBst = (root: Nullable<TreeNumNode>): boolean => {
    if (!root) return true;
    if (!root.left && !root.right) return true;

    if (
        root.left &&
        root.value > root.left.value &&
        root.right &&
        root.value < root.right.value
    ) {
        return isBst(root.left) && isBst(root.right);
    }
    return false;
};

let root = createTree([4, 2, 5, 1, 3]);
console.log('Is BST', isBst(root));

root = createTree([4, 6, 5, 1, 3]);
console.log('Is BST', isBst(root));
