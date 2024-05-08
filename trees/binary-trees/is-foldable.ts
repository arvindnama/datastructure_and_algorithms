import { TreeNode, createTree, printTree } from "./helpers/node";


function isFoldableTree(root: TreeNode<number>): boolean {

  const isMirror = (r1: Nullable<TreeNode<number>> , r2: Nullable<TreeNode<number>>): boolean => {
    if(!r1 && !r2) return true
    if(!r1 || !r2) return false

    return r1 && r2 && // just check of symmetry & not value
      isMirror(r1.left, r2.right) &&
      isMirror(r1.right, r2.left)
  }

  return isMirror(root.left, root.right)
}

let r = createTree([10,7,15,,9,11]) as TreeNode<number>;
printTree(r);
console.log('isFoldable', isFoldableTree(r))

r = createTree([10,7,15,5,,11]) as TreeNode<number>;
printTree(r);
console.log('isFoldable', isFoldableTree(r))