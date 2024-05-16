/**
 * Given a Linked List, the task is to insert a new node in this given Linked List at the following positions: 

At the front of the linked list  
After a given node. 
At the end of the linked list.
 */

import { ListNode, printList, createList } from "../../../models/linked-list.models";


function insertAtFront<T>(node: Nullable<ListNode<T>>, newVal: T): ListNode<T> {

  const newNode: ListNode<T> = {
    value: newVal
  }

  if(node) {
    newNode.next = node;
  }

  return newNode;

}

function insertAfterGivenNode<T>(head: Nullable<ListNode<T>>, node: ListNode<T>, newVal: T): ListNode<T> {
  let prevPtr: Nullable<ListNode<T>>;
  let ptr = head;
  while(ptr && ptr.value !== node.value) {
    prevPtr = ptr; // store previous pointer
    ptr = ptr.next;
  }
  const newNode: ListNode<T> = {value: newVal};
  if(ptr) {
    // found the insertion point
    const tmpNode = ptr.next;
    ptr.next = newNode;
    newNode.next = tmpNode;
  }
  // either we did not find the requested node or head is null
  // if we cannot find the requested node , we will skip (if not add to end of list)
  else if(!head) {
    // head itself is null
    head = newNode;
  } else {
    // request node not found add to newNode to end of the list.
    (prevPtr as ListNode<T>).next = newNode;
  }

  return head as ListNode<T>;
}

function insertAtEnd<T>(head: Nullable<ListNode<T>>, newVal: T): ListNode<T> {
  const newNode: ListNode<T> = {
    value: newVal
  };

  if(!head) {
    return newNode;
  }

  let ptr: ListNode<T> = head;
  while(ptr.next){
    ptr = ptr.next;
  }

  ptr.next = newNode;

  return head;
}

// Testing 


/**
 * Insert at front
 */

console.log("1. InsertAtFront: head empty");
printList(insertAtFront(null, '3'));

console.log("1. InsertAtFront: head not empty");
printList(insertAtFront(createList(['1','2','4']), '3'));


/**
 * Insert after a node
 */

console.log("1. InsertAfterNode: empty list");
printList(insertAfterGivenNode(null, {value: '1'}, 'n'));

console.log("2. InsertAfterNode: after node: node found - 1 ");
printList(insertAfterGivenNode(createList(['1','2','3']), {value: '1'}, 'n'));
console.log("2. InsertAfterNode: after node - node found - 2 ");
printList(insertAfterGivenNode(createList(['1','2']), {value: '1'}, 'n'));
console.log("2. InsertAfterNode: after node - node found - 3 ");
printList(insertAfterGivenNode(createList(['1','2']), {value: '2'}, 'n'));
console.log("2. InsertAfterNode: after node - node not found ");
printList(insertAfterGivenNode(createList(['1','2']), {value: '3'}, 'n'));


/**
 * Insert At end
 */

console.log('3. Insert At end: empty list');
printList(insertAtEnd(null,  'n'));

console.log('3. Insert At end: list full');
printList(insertAtEnd(createList(['1','2','3','4']),  'n'));
