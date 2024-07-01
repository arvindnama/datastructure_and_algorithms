import { TreeNode, printTree } from "../../../../../models/tree.models";

interface AvlTreeNode<T> extends TreeNode<T> {
    height: number;
}

const get = <T>(node: Nullable<AvlTreeNode<T>> | Nullable<TreeNode<T>>): AvlTreeNode<T> => node as AvlTreeNode<T>;
const height = <T> (node: Nullable<AvlTreeNode<T>> | Nullable<TreeNode<T>> ): number => get(node)?.height ?? 0;
const balancingFactor = <T> (node: Nullable<AvlTreeNode<T>>): number => {
    if(!node) return 0;
    return height(node.right) - height(node.left)
}
const recalculateHeight = <T> (node: Nullable<AvlTreeNode<T>>) : void => {
    if(!node) return;
    node.height = 1 + Math.max(height(node.left), height(node.right))
}

const inorderSuccessor = <T> (z: AvlTreeNode<T> ): AvlTreeNode<T> => {
    let n = z.right;
    while(n?.left) {
        n = n.left;
    }
    return get(n);
}

const rotateLeft = <T> (z: AvlTreeNode<T> ): AvlTreeNode<T> => {
    //      z
    //     / \
    //    t1  y
    //       / \
    //      t2  t3
    //
    //       To
    //
    //      Y
    //     / \
    //    z  t3
    //   / \
    //  t1 t2

    const y = get(z.right)
    const t2 = y.left;
    y.left = z;
    z.right = t2;

    recalculateHeight(z);
    recalculateHeight(y);

    return y;
}

const rotateRight = <T> (z: AvlTreeNode<T> ): AvlTreeNode<T> => {
    //      z
    //     / \
    //    y   t4
    //   / \
    //  x  t3
    //
    //     To
    //
    //      y
    //     / \
    //    x  z
    //       / \
    //      t3  t4

    const y = get(z.left);
    const t3 = y.right;
    y.right = z;
    get(z).left = t3;

    recalculateHeight(z);
    recalculateHeight(y);
    return get(y);
}


class AvlTree<T> {
    #root : Nullable<AvlTreeNode<T>> = null;
    public get root() : Nullable<AvlTreeNode<T>> {return this.#root}
    public insert(k: T) {
        // step-1 : insert into Avl tree as another binary search tree
        // step-2 : recalculate height of the tree at each affected node
        // step-3: each node check the balancing factor of the node if they are imbalance we will need to rotate nodes
        // accordingly to re-balance tree.
        //    Steps to balance a tree
        //      1. get the balancing factor of a node.
        //          For a  AVL tree its balancing factor of the node should be either -1 0 +1,
        //              0 -> heights of both child sub trees are same
        //              -1 -> left sub-tree is tall by 1 level
        //              +1 -> right sub-tree is tall by 1 level .
        //          Anything beyond this is imbalance
        //          So if bf is -2 or 2 we need to take action and rotate the trees
        //          We will need to determine z,y,x nodes to figure out what rotations are needed.
        //          z is alway the node where the imbalance happens.
        //          y & x node are determined as follows:
        //
        //          bf = -2 -> left subtree is taller than right by 2 level
        //              - y is always the left child of z (as left subtree will be taller than z's right)
        //              - x depends on subtree where k is added to ::
        //                  if k < y.value , then x is left child of y
        //                      In this case we all 3 nodes z,y & x are left skewed , we just need one rotation :
        //                          - Rotate to right at root z
        //                  if k > y.value , then x is right child of y
        //                      In this case  y is lc of z and x is rc of y , we will 2 rotations::
        //                           - Rotate to left with root at y  (to make zyx left skewed)
        //                           - Rotate to right with root at z
        //
        //          bf = 2--> right subtree is taller than left by 2 levels
        //              - y is right child of z
        //              - x can be either left child or right child of y depends on where k is added to
        //              if k > y.value , then k is found on right subtree , x is rc of y
        //                  here z,y &z are all right skewed tree , here we need 1 rotation
        //                      - Rotate to left with root at z
        //              if k < y.value, then k is found on the left subtree, x is lc of y
        //                    here y is rc of z , x is lc of y , we need 2 rotations
        //                      - Rotate to right with root at y (to make it right skewed)
        //                      - Rotate to left with root at z
        this.#root = this.#insertIntoAvlTree(this.#root, k);

    }

    public remove(k: T) {

        /**
         * Step-1: remove like any other from BST.
         *      if k < r.val , remove from left subtree
         *      if k > r.val , remove from right
         *      if k == r.val, we have reached the node to remove
         *          `r` can be leaf node, if so return null
         *          `r` can be node with one child , return the only remaining child
         *          `r` has both children
         *              find in-order successor of r i.e. small element in the right sub tree
         *              replace r with ios
         *              delete ios node from right subtree.
         *  Step-2: we need to recalculate the height of the root
         *  Step-3: check for balancing factor
         *      bf === -2 , left sub tree is taller , (deleting happened somewhere on right sub tree)
         *          z = root, y is lc of z (cos left subtree is taller than right)
         *          x will the taller subtree of y.
         *          if bf of y is < 0 i.e lc of y is taller => x will be lc of y => z,y,x are left skewed => rotate once i.e. to right (z)
         *          if bf of y is > 0 i.e rc of y is taller => x will be rc of y => z, y are on left and x is on right of y => 2 rotates once to left (y) and then right (z)
         *          if bf of y == 0, pick lc of y as x (just so we only have to rotate once)
         *      bf == 2 , right sub tree is taller, (deletion happened somewhere on right)
         *          z = root, y is rc of z (cos rc is taller)
         *          x will a child of y that is taller.
         *          if bf of y is < 0, x is rc of y ==> z,y&x are all on right ==> rotate it once to left
         *          if bf of y is > 0, x is lc of y ==> z,y are  on right & x is left of y ==> rotate twice once to right (y) and then left (z)
         *          if bf of y == 0, pick rc of y as x (just so we only have to rotate once)
        */

        this.#root = this.#deleteFromAvlTree(this.#root, k);
    }

    public print() {
        printTree(this.#root)
    }


    #deleteFromAvlTree(root: Nullable<AvlTreeNode<T>>, k: T) : Nullable<AvlTreeNode<T>> {

        if (!root) return null

        if (k < root.value) {
            root.left = this.#deleteFromAvlTree(get(root.left), k);
        } else if( k > root.value){
            root.right = this.#deleteFromAvlTree(get(root.right), k);
        } else {
            if(!root.left && !root.right) root = null;
            else if (!root.left) root = get(root.right);
            else if (!root.right) root = get(root.left);
            else {
                const ios = inorderSuccessor(root);
                root.value = ios.value;
                root.right = this.#deleteFromAvlTree(get(root.right), ios.value)
            }
        }

        if(!root) return null;

        recalculateHeight(root)

        const bf = balancingFactor(root)

        if(bf < -1) {
            // z is root
            // y is lc of z
            const y = get(root.left);
            if(balancingFactor(y) <= 0) {
                // x is lc of y
                //only 1 rotation i.e to right
                root = rotateRight(root)
            }else {
                // x is rc of y
                // 2 rotations
                root.left = rotateLeft(y);
                root = rotateRight(root)
            }
        } else if (bf > 1) {
            // z is root
            // y is rc of z
            const y = get(root.right);
            if (balancingFactor(y) >= 0) {
                // x is rc of y , one rotation
                root = rotateLeft(root)
            } else {
                // x is lc of y , 2 rotations
                root.right = rotateRight(y);
                root = rotateLeft(root)
            }
        }
        return root;
    }

    #insertIntoAvlTree(root: Nullable<AvlTreeNode<T>>, k: T) : AvlTreeNode<T> {
        const node: AvlTreeNode<T> = {
            value: k,
            height: 1
        };

        // Step-1
        if(!root) {
            return node;
        }

        if(k < root.value) {
            root.left = this.#insertIntoAvlTree(root.left as Nullable<AvlTreeNode<T>>, k);
        }else if (k > root.value) {
            root.right = this.#insertIntoAvlTree(root.right as Nullable<AvlTreeNode<T>>, k)
        }else return root; // key already present , no need to reinsert duplicate keys

        // Step-2
        recalculateHeight(root);
        const bf = balancingFactor(root);

        if(bf < -1) {
            // z is root
            // y is lc of root
            const y = root.left as AvlTreeNode<T>
            // x ??
            if(k < y.value) {
                // k is found of left side of subtree
                // const x = y.left as AvlTreeNode<T>
                // rotate right with root at z.
                root = rotateRight(root)
            } else {
                // k is found on right side of subtree
                // const x = y.right as AvlTreeNode<T>
                root.left = rotateLeft(root.left  as AvlTreeNode<T>);
                root = rotateRight(root)
            }
        } else if (bf > 1) {
            // z is root
            // y is rc of z
            const y = root.right as AvlTreeNode<T>;
            // x?
            if(k > y.value) {
                // x is rc of y
                // 1 rotation left of root z
                root = rotateLeft(root)
            } else {
                // x is lc of y
                // 2 rotations right at y & left at z
                root.right = rotateRight(root.right as AvlTreeNode<T>)
                root = rotateLeft(root)
            }
        }

        return root;
    }


}


console.log('******Demo Avl Insert*******');
const avlTree = new AvlTree<number>();
console.log('insert 10');
avlTree.insert(10);
avlTree.print();

console.log('insert 20');
avlTree.insert(20);
avlTree.print();

console.log('insert 30');
avlTree.insert(30);
avlTree.print();

console.log('insert 40');
avlTree.insert(40);
avlTree.print();

console.log('insert 50');
avlTree.insert(50);
avlTree.print();

console.log('insert 25');
avlTree.insert(25);
avlTree.print();


console.log('****** Deleting from AVL printTree******');

console.log('Delete 30 from root');
avlTree.remove(30);
avlTree.print();

console.log('Delete 50 from root');
avlTree.remove(50);
avlTree.print();

console.log('Delete 10 from root');
avlTree.remove(10);
avlTree.print();
