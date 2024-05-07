# Traversal

Traversing a tree means visiting each and every node in the tree.

There are 2 types of traversals

1. BFS - Breadth First Search.
2. DFS - Depth First Search.


## BFS

In this algorithm we start from root node explore all its neighbors and move to nodes in next depth or level.

Pseudo code:

1. add root to queue.
2. while the queue is not empty : 
  a. dequeue a node from queue.
  b. print the node
  c. enqueue all the child nodes (left , right) into the queue.



## DFS

In this algorithm backtracking is used, we start from the deepest node and backtrack to its parent.

There are 3 type of DFS traversals

1. Inorder traversal
2. Preorder traversal
3. Postorder traversal


**Inorder traversal**

  a. traverse the left subtree
  b. visit the root
  c. traverse the right subtree

**Preorder traversal***

  a. visit the node
  b. traverse the left subtree
  c. traverse the right subtree


**Postorder traversal**

  a. traverse the left subtree
  b. traverse the right subtree
  c. visit the root