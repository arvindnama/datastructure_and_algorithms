import { TreeNode, createTree } from "../helpers/node";

function preorderTraversal<T>(root: Nullable<TreeNode<T>>) {
  if(!root) return

  console.log(root.value);
  preorderTraversal(root.left);
  preorderTraversal(root.right);
}

const root = createTree([1,2,3,4,5,6,7])
console.log('Preorder Traversal')
preorderTraversal(root);