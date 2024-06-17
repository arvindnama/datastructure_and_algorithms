import { TreeNumNode, createTree } from '../../../models/tree.models';

function findMinInBst(root: TreeNumNode): number | null {
    if (!root) return null;
    if (!root.left) return root.value;
    return findMinInBst(root.left);
}

let root = createTree([22, 12, 30, 8, 20]);
console.log('Min in BST', findMinInBst(root));

root = createTree([40, 15, 55, 10, 20]);
console.log('Min in BST', findMinInBst(root));
