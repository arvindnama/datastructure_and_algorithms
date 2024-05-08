/**
 * Given the binary Tree and the two nodes say ‘a’ and ‘b’, determine whether the two nodes are cousins of each other or not.
Two nodes are cousins of each other if they are at same level and have different parents.
 */

import { TreeNode, createTree } from "./helpers/node";


type Node = { node: TreeNode<number>, level: number, parent: Nullable<number>};
type DataStore = {[key in number]: Node};

function areNodesCousins(root: TreeNode<number> , n1: number, n2: number): boolean {

  const queue: Node[] = [{node: root, level: 1 , parent: null}];
  const map: DataStore = {};

  while(queue.length) {
    const node = queue.shift() as Node;
    map[node.node.value] = node;
    if(node.node.left) queue.push({node: node.node.left , level: node.level + 1, parent: node.node.value})

    if(node.node.right) queue.push({node: node.node.right , level: node.level + 1, parent: node.node.value})
  }

  const a = map[n1];
  const b = map[n2];

  return a.level == b.level && a.parent !== b.parent;

}

const root = createTree([6,3,5,7,8,1,3]);
console.log('Are nodes 7 & 1 cousins', areNodesCousins(root, 7,1))
console.log('Are nodes 3 & 5 cousins', areNodesCousins(root, 3,5))
console.log('Are nodes 7 & 5 cousins', areNodesCousins(root, 7,5))