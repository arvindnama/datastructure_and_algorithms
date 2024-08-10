import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../../models/tree.models';

const insertBst = (root: Nullable<TreeNumNode>, value: number): TreeNumNode => {
    if (!root) return { value };

    if (root.value > value) root.left = insertBst(root.left, value);
    else root.right = insertBst(root.right, value);

    return root;
};

let root = createTree([10, 9, 11, 7]);
root = insertBst(root, 5);
printTree(root);

root = insertBst(root, 12);
printTree(root);

root = insertBst(root, 8);
printTree(root);
