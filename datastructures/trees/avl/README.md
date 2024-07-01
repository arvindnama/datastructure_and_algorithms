# AVL Trees

AVL Trees or self balancing binary search trees are binary search trees that keep the height of the tree as small as possible when inserting or deletion is performed on the tree.

- AVL tree, the diff between the height of left and right subtrees for any node cannot be more than one.

## Why AVL Tree

Most of the operations on BST is O(h), where h is the height of the tree, and it can become O(n) if the BST is skewed. Hence keeping the height to the minimum after every operation will ensure time complexity of O(log(n)) -> log(n) being the height of the tree.

## Insertion

Inserting into a AVL tree is same as BST insertion, in addition we will need to ensure balance is maintained.

Balance can be maintained by rotating (left or right) the node where balance is broken.

Balance factor of a node can help determine if the node is balanced or not.
balance factor of a node : BF(node):

``` javascript
BF(node) = Height(rightChild) - Height(leftChild).
```

if BF(node) is < -1 or >1 , then the node / subtree is unbalanced (cos in AVL tree the left & right subtree are of same height or differ by `1` )

``` javascript
BF(node) === -2  // means the left subtree is taller than right.
BF(node) === +2  // means the right subtree is taller than left.
```

### Balancing nodes

#### Left Left Case
 Z & Y are unbalanced. and z,y are unbalanced and x is less than y
 To fix this we will need to rotate Right

``` js
     (-2)z                                   y
        / \                                /   \
   (-2)y   T4   ==== Rotate Right ===>    x     z
      / \                                / \   /  \
  (1)x   T3                             T1 T2 T3 T4
    / \
(0)T1  T2
```

#### Left Right Case

 Z & Y are unbalanced on left subtree and x is on the right side of Y. Hence we need 2 rotation

- Rotate left (to covert to Left left case)
- Rotate Right

``` js
     (-2)z                                   z                                      y
        / \                                 /  \                                  /   \
   (-2)y   T4  ==== Rotate Left ===>       x    T3  ==== Rotate Right ===>      x     z
      / \                                 / \                                  / \   /  \
  (0)T1  x                               y   T3                                T1 T2 T3 T4
        / \                             / \                                               
       T2  T3                          T1  T2                                             
```

#### Right Right Case

Z Y & X are on right side of aligned with +2 BF hence we just need to rotate left to maintain balance

``` js
      (2)z                                       y
        / \                                    /   \
       T1   y(2)   ==== Rotate Left ===>      z     x
           /  \                              / \   /  \
         T2    x(1)                         T1 T2 T3  T4
              / \
             T3  T4
```

#### Right Left case

``` js
      (2)z                                        z                                      x
        / \                                      /  \                                  /   \
       T1   y(2)   ==== Rotate Right ===>      T1    x    ==== Rotate Left ===>       y     z
           /  \                                     / \                              / \   /  \
         x    T4                                   T2  y                            T1 T2 T3  T4
        / \                                           / \                                      
       T2  T3                                        T3  T4                                       
```
