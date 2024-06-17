import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

function checkIfHeightBalanced(root: Nullable<TreeNumNode>): boolean {
    if (!root) return false;
    const height = (root: Nullable<TreeNumNode>): number => {
        if (!root) return 0;
        if (!root.left && !root.right) return 1;
        return 1 + Math.max(height(root.left), height(root.right));
    };
    const diff = Math.abs(height(root.left) - height(root.right));
    return diff <= 1;
}

let root = createTree([1, 2, 3, 4, null, null, null, 5]) as TreeNumNode;
printTree(root);
console.log('checkIfHeightBalanced', checkIfHeightBalanced(root));

root = createTree([1, 2, 3, 4, 5]) as TreeNumNode;
printTree(root);
console.log('checkIfHeightBalanced', checkIfHeightBalanced(root));
