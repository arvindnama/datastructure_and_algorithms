/**
 * Deletion in Linked List
 */


import {Node, createList, printList} from './helper/node';

function deleteNodeAtPos<T>(head: Nullable<Node<T>>, pos: number): Nullable<Node<T>> {

  if(!head) return head;

  let prev: Nullable<Node<T>>;
  let cur: Nullable<Node<T>> = head;
  let i = 0;
  while(cur && i !== pos) {
    prev = cur;
    cur = cur.next;
    i++
  }

  if(!prev){ // same as i === 0
    head = head.next;
  } else if(i === pos) {
    prev.next = cur?.next;
  }

  return head;
}


/**
 * Testing
 */

let head = createList([1,2,3,4]);
console.log('1. Delete node at start');
printList(head);
printList(deleteNodeAtPos(head, 0));

console.log('2. Delete node at end');
head = createList([1,2,3,4]);
printList(head);
printList(deleteNodeAtPos(head, 3));

console.log('3. Delete node at pos 2');
head = createList([1,2,3,4]);
printList(head);
printList(deleteNodeAtPos(head, 2));