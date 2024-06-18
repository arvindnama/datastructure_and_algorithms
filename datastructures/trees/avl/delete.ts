import {
    AvlNumTreeNode,
    deleteFromAvl,
    insertIntoAvl,
} from '../../../models/avl-tree.models';
import { printTree } from '../../../models/tree.models';

let root = insertIntoAvl(null, 9);
root = insertIntoAvl(root, 5);
root = insertIntoAvl(root, 10);
root = insertIntoAvl(root, 0);
root = insertIntoAvl(root, 6);
root = insertIntoAvl(root, 11);
root = insertIntoAvl(root, -1);
root = insertIntoAvl(root, 1);
root = insertIntoAvl(root, 2);

console.log('AVL Tree');
printTree(root);

console.log('****** Deleting from AVL printTree******');

console.log('Delete 10 from root');
root = deleteFromAvl(root, 10) as AvlNumTreeNode;
printTree(root);

console.log('Delete 9 from root');
root = deleteFromAvl(root, 9) as AvlNumTreeNode;
printTree(root);
