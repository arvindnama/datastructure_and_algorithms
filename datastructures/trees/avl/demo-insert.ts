import { AvlTree } from '../../../models/avl-tree.models';

console.log('AVL Tree insert operation');

const avlTree = new AvlTree();
console.log('insert 10');
avlTree.insert(10);
avlTree.print();

console.log('insert 20');
avlTree.insert(20);
avlTree.print();

console.log('insert 30');
avlTree.insert(30);
avlTree.print();

console.log('insert 40');
avlTree.insert(40);
avlTree.print();

console.log('insert 50');
avlTree.insert(50);
avlTree.print();

console.log('insert 25');
avlTree.insert(25);
avlTree.print();
