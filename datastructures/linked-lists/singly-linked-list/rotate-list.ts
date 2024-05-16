/**
 * Given a singly linked list, The task is to rotate the linked list counter-clockwise by k nodes.
 */

import { ListNode, createList, printList } from "../../../models/linked-list.models";

function rotateList(head: Nullable<ListNode<number>>, k : number): Nullable<ListNode<number>>{
  if(!head) return head;

  let cur = head;
  let prv = null;
  let i = 1;
  while( i <= k && cur) {
    prv = cur;
    cur = cur.next as ListNode<number>;
    i++;
  }
  if(!cur) return null; // k is greater than length

  (prv as ListNode<number>).next = null; // nullify end 

  let ptr = cur;
  while(ptr.next){
    // move to end of list
    ptr = ptr.next;
  }
  ptr.next = head;
  return cur;
}


const head = createList([10,20,30,40,50,60]);
printList(head);
console.log('Rotate by 4');
printList(rotateList(head, 4));