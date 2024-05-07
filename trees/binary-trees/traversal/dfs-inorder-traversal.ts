import { TreeNode, createTree, printTree } from "../helpers/node";


function inorderTraversal<T>(root: Nullable<TreeNode<T>>) {
  if(!root) return;

  inorderTraversal(root.left);
  console.log(root.value)
  inorderTraversal(root.right);
}

const root = createTree([1,2,3,4,5,6,7]);
printTree(root);

console.log('Inorder Traversal::');
inorderTraversal(root);