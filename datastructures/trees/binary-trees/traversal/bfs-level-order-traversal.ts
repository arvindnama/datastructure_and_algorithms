/**
 * Level Order Traversal technique is defined as a method to traverse a Tree such that all nodes present in the same level are traversed completely before traversing the next level.
 */

import { TreeNode, createTree } from "../../../../models/tree.models";


function levelOrderTraversal<T>(root: TreeNode<T>) {
  const queue = [root];
  const order = [];
  while(queue.length) {
    const node = queue.shift() as TreeNode<T>;
    order.push(node.value);
    if(node.left) queue.push(node.left)
    if(node.right) queue.push(node.right)
  }

  console.log(order.join(','));
}


const root = createTree([1,2,3,4,5,,,6,7]);
levelOrderTraversal(root);  