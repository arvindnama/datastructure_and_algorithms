/**
 * Write a function to get Nth node in a Linked List
 */

import { ListNode, printList, createList } from './helper/node';

function printNthNode<T>(head: Nullable<ListNode<T>>, n: number): Nullable<T> {
  if(!head) return null;

  let i = 0 ;
  while(head && i !== n){
    head = head.next;
    i++;
  }
  return head?.value ?? null;
}

function printNthNodeRec<T>(head: Nullable<ListNode<T>>, n: number): Nullable<T> {
  if(n < 0 ) return null;
  if(n === 0 || !head) return head?.value ?? null;
  return printNthNodeRec(head.next, n - 1);
}


/**
 * Testing
 */

let head = createList([1,2,3,4,5]);
console.log('1. find nth element - itr : index out of bound');
printList(head, printNthNode(head, 5));
printList(head, printNthNodeRec(head, -1));


console.log('1. find nth element - itr : at 2');
printList(head, printNthNode(head, 2));


console.log('2. find nth element - rec : index out of bound');
printList(head, printNthNodeRec(head, 5));
printList(head, printNthNodeRec(head, -1));


console.log('2. find nth element - rec : at 2');
printList(head, printNthNodeRec(head, 2));