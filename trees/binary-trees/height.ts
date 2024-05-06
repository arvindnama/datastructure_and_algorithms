/**
 * Find the Maximum Depth or Height of given Binary Tree
 */

import { TreeNode, createTree, printTree } from "./helpers/node";


function height<T>(root?: Nullable<TreeNode<T>>): number {
  if(!root) return 0;
  if(!root.left && !root.right) return 1;

  return Math.max(height(root.left) , height(root.right)) + 1;
}


console.log('height of 3 level tree', height(createTree([1,2,3,4,5])))
console.log('height of 4 level', height(createTree([1,2,3,4,5,6,7,8])))
console.log('height of empty tree', height(null))
console.log('height of empty tree', height(createTree([1])))