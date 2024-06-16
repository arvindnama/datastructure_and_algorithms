import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

function search(root: Nullable<TreeNumNode>, k: number): boolean {
    if (!root) return false;

    if (root.value === k) return true;

    return k < root.value ? search(root.left, k) : search(root.right, k);
}

const root = createTree([10, 5, 11, 4, 6, null, 12]) as TreeNumNode;
printTree(root);
console.log('search for 5 i n tree', search(root, 5));
console.log('search for 11 i n tree', search(root, 11));
console.log('search for 12 i n tree', search(root, 12));
console.log('search for 6 i n tree', search(root, 6));
console.log('search for 1 i n tree', search(root, 1));
