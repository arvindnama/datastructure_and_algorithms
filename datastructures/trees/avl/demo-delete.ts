import { AvlTree } from '../../../models/avl-tree.models';

const avlTree = new AvlTree();
avlTree.insert(9);
avlTree.insert(5);
avlTree.insert(10);
avlTree.insert(0);
avlTree.insert(6);
avlTree.insert(11);
avlTree.insert(-1);
avlTree.insert(1);
avlTree.insert(2);

console.log('AVL Tree');
avlTree.print();

console.log('****** Deleting from AVL printTree******');

console.log('Delete 10 from root');
avlTree.delete(10);
avlTree.print();

console.log('Delete 9 from root');
avlTree.delete(9);
avlTree.print();
