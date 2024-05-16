/**
 * Given a binary tree, print boundary nodes of the binary tree Anti-Clockwise starting from the root
 */

import { TreeNode, createTree, printTree } from "../../../../models/tree.models";


function boundaryTraversal<T>(root: TreeNode<T>) {

  /**
   * 1. traverse all left nodes from root
   * 2. traverse all leaf nodes 
   * 3. traverse right nodes from root.
   */

  const traverseBoundary = (root: Nullable<TreeNode<T>>, mode: 'left' | 'right', nodes: T[] = []) => {
    if(!root) return  // return if we are at end (not needed )
    if(!root.left && !root.right) return // return if its a leaf node.

    nodes.push(root.value);
    const childNode = mode === 'left' ? root.left : root.right;
    traverseBoundary(childNode, mode, nodes);
  }


  const traverseLeafNodes = (root: Nullable<TreeNode<T>>, nodes: T[] = []) => {
    if(!root) return;
    if(!root.left && !root.right) {
      // leaf node. record it
      nodes.push(root.value);
      return
    }

    traverseLeafNodes(root.left, nodes);
    traverseLeafNodes(root.right, nodes);
  }


  const traversedNodes: Array<T> = [root.value];

  traverseBoundary(root.left, 'left', traversedNodes);
  traverseLeafNodes(root, traversedNodes);
  const rightNodes:Array<T> = [];
  traverseBoundary(root.right, 'right', rightNodes);
  
  console.log([...traversedNodes, ...rightNodes.reverse()].join());

}

const root = createTree([20,8,22,4,12,,25,,,10,14]);
printTree(root);

boundaryTraversal(root);