/**
 * Write a function to determine if two trees are identical or not:
 */

import { TreeNode, createTree, printTree } from "../../../models/tree.models";

function areIdentical(r1: Nullable<TreeNode<number>>, r2: Nullable<TreeNode<number>>): boolean {
  if(!r1 && !r2) return true
  if(!r1 || !r2) return false

  return r1.value == r2.value &&
    areIdentical(r1.left, r2.left) &&
    areIdentical(r1.right, r2.right)
}

let r = createTree([1,2,3,4]);
printTree(r);
printTree(r);
console.log('are Identical', areIdentical(r,r));

r = createTree([1,2,3,,4]) as TreeNode<number>;
let r2 = createTree([1,5,3,4]);
printTree(r);
printTree(r2);
console.log('are Identical', areIdentical(r,r2));