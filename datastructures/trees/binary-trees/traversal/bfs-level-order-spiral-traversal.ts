/**
 * Given a Binary Tree, the task is to print the Level order traversal of the Binary Tree in spiral form i.e, alternate order.
 */

import { TreeNode, createTree, printTree } from "../../../../models/tree.models";


type NodeWithLevel<T> = {node: TreeNode<T>, level: number};
type Data<T> = {[K in string] : Array<T>};

function levelOrderSpiralTraversal<T>(root: TreeNode<T>) {
  const queue = [{node: root, level: 1} as NodeWithLevel<T>];
  const data:Data<T> = {};

  while(queue.length) {
    const n = queue.shift() as NodeWithLevel<T>;
    data[`${n.level}`] = data[`${n.level}`] || [];

    //if odd use stack . i.e insert at top
    if(n.level % 2 !== 0) data[`${n.level}`].unshift(n.node.value);
    //if even use queue . i.e insert at end
    if(n.level % 2 === 0) data[`${n.level}`].push(n.node.value);

    const nextLevel = n.level + 1;

    if(n.node.left) queue.push({node: n.node.left, level : nextLevel})
    if(n.node.right) queue.push({node: n.node.right, level : nextLevel})
  }

  const result = Object.values(data).flatMap((d) => d);
  console.log(result);
}

const root = createTree([1,2,3,7,6,5,4,8,9,10,11,,12]);
printTree(root);

console.log('level order spiral traversal');

levelOrderSpiralTraversal(root);