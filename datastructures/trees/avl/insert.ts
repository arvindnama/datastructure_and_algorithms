import { insertIntoAvl } from '../../../models/avl-tree.models';
import { printTree } from '../../../models/tree.models';

console.log('AVL Tree insert operation');

console.log('insert 10');
let root = insertIntoAvl(null, 10);
printTree(root);

console.log('insert 20');
root = insertIntoAvl(root, 20);
printTree(root);

console.log('insert 30');
root = insertIntoAvl(root, 30);
printTree(root);

root = insertIntoAvl(root, 40);
console.log('insert 40');
printTree(root);

root = insertIntoAvl(root, 50);
console.log('insert 50');
printTree(root);

root = insertIntoAvl(root, 25);
console.log('insert 25');
printTree(root);
