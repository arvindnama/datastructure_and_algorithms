import { TreeNumNode, createTree } from '../../../models/tree.models';

function isBst(root: Nullable<TreeNumNode>): boolean {
    if (!root) return true;

    const isLeftValid = root.left
        ? root.value >= root.left.value && isBst(root.left)
        : true;
    const isRightValid = root.right
        ? root.value < root.right.value && isBst(root.right)
        : true;
    return isLeftValid && isRightValid;
}

let root = createTree([4, 2, 5, 1, 3]);
console.log('Is BST', isBst(root));

root = createTree([4, 6, 5, 1, 3]);
console.log('Is BST', isBst(root));
