/**
 * Reverse level order traversal:
 * The idea is to print the last level first, then the second last level, and so on. Like Level order traversal, every level is printed from left to right.
 */

import { TreeNode, createTree, printTree } from "../helpers/node";


function reverseLevelOrderTraversal<T>(root: TreeNode<T>) {

  const queue = [root];
  const stack = [];

  while(queue.length) {
    const node = queue.shift() as TreeNode<T>;
    stack.unshift(node.value);
    if(node.right) queue.push(node.right)
    if(node.left) queue.push(node.left)
  }
  console.log(stack.join())
}


const root = createTree([1,2,3,4,,5,6]);
printTree(root);
console.log('Reverse level order traversal');
reverseLevelOrderTraversal(root);