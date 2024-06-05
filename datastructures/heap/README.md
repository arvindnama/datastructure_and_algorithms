# Heap

Heap Data is a complete binary tree , i.e. all the levels of the tree are completely filled except the lowest level, which are filled from left as possible

Heap are of 2 types

## Max Heap

A max heap is a complete binary tree, where each node is alway greater than or equal to its children

## Min Heap

A min heap is a complete binary tree, where each node is less than or equal to its children.


## Operations 

_Heapify_ 

Rearrange the element inside a heap to restore the Heap properties (Min / Max)
This is needed when a heap is mutated , i.e insert or remove element from heap.
Max heap: balance the heap such that a nodes value is alway greater than or equal to its child node
Min heap: balance the heap such that a nodes value is alway less than or equal to its child node

time complexity: O(logN)

_Insert_

Inserting an element into heap

Process:

- start by adding element to the leaf node (i.e. first available spot), as expected this would distort the heap property.

- heapify the tree i.e. starting from leaf node compare with its parent node and swap if needed to balance the tree.


```
      8
    /   \
   4    5
  / \  
 1   2

step1: Insert
      8
    /   \
   4     5
  / \   /
 1   2  10

step2: Heapify
      10
    /   \
   4     8
  / \   /
 1   2  5
```


_Get Min/Max From Heap_

Min Heap: Get the min element from the heap
Max Heap: Get the max element from the heap

in short get the root element from the tree. O(1)  time complexity

_Remove Min/Max From Heap_

Min Heap: Delete the min element from the heap and heapify
Max Heap: Delete the max element from the heap and heapify


## Representation

It is easy to represent heap as an array with follow equations to reach a child or parent node.

```javascript
leftChild(i) = 2i + 1
rightChild(i) = 2i + 2

parentOf(leftChild) = (leftChild - 1) / 2
parentOf(rightChild) = (rightChild - 2) / 2
```

