/**
 * 
 * Write a function that returns true if the given Binary Tree is SumTree else false. A SumTree is a Binary Tree where the value of a node is equal to the sum of the nodes present in its left subtree and right subtree. An empty tree is SumTree and the sum of an empty tree can be considered as 0. A leaf node is also considered as SumTree.
 */

import { TreeNode, createTree, printTree } from "../../../models/tree.models";


function isSumTree(root: Nullable<TreeNode<number>>): boolean {

  const isSumTreeInt = (root: Nullable<TreeNode<number >>) : {sum: number, isSumTree: boolean} => {
    if(!root) return {sum: 0, isSumTree:true};
    if(!root.left && !root.right) return {sum: root.value as number, isSumTree: true}

    const leftRes = isSumTreeInt(root.left);
    const rightRes = isSumTreeInt(root.right);

    const sumOfChildren = leftRes.sum + rightRes.sum;
    const isRootSumTree = sumOfChildren === root.value && leftRes.isSumTree && rightRes.isSumTree;

    return {sum: sumOfChildren + root.value as number, isSumTree: isRootSumTree}
  }

  return isSumTreeInt(root).isSumTree;
}


const root = createTree([26,10,3,4,6,,3]) as TreeNode<number>;
printTree(root);
console.log('Is Sum tree', isSumTree(root));
