/**
 * Given a pointer to the head node of a linked list, the task is to reverse the linked list. We need to reverse the list by changing the links between nodes.
 */

import {ListNode, printList, createList} from './helper/node';

function reverseListItr<T>(head: Nullable<ListNode<T>>): Nullable<ListNode<T>> {

  if(!head) return head;

  let cur: ListNode<T> = head;
  let nxt: Nullable<ListNode<T>> = head.next;


  while(nxt){
    const temp = nxt.next;
    nxt.next = cur;
    cur = nxt;
    nxt = temp;
  }

  // clear head's next 
  head.next = null;
  return cur;

}

function reverseListRec<T>(head: Nullable<ListNode<T>>): Nullable<ListNode<T>>{
  const reverseInt = (prv: Nullable<ListNode<T>>, head: Nullable<ListNode<T>>): Nullable<ListNode<T>> => {
    if(!head) return null;
    if(!head.next) {
      head.next = prv
      return head;
    }

    const temp = head.next;
    head.next = prv;
    prv = head;
    head = temp;
    return reverseInt(prv, head);
  }

  return reverseInt(null, head);
}

/**
 * Reverse list iterative.
 */

console.log('1. Reverse list Iterative - empty');
printList(null);
printList(reverseListItr(null));

console.log('1. Reverse list Iterative - multiple entries');
let head = createList([1,2,3,4,5,6,7,8])
printList(head);
printList(reverseListItr(head));

console.log('1. Reverse list Iterative - two entry');
head = createList([1,2])
printList(head);
printList(reverseListItr(head));


/**
 * Reverse list recursive.
 */

console.log('3. Reverse list Rec - empty');
printList(null);
printList(reverseListRec(null));

console.log('2. Reverse list Rec - multiple entries');
 head = createList([1,2,3,4,5,6,7,8])
printList(head);
printList(reverseListRec(head));

console.log('3. Reverse list Rec - two entry');
head = createList([1,2])
printList(head);
printList(reverseListRec(head));

