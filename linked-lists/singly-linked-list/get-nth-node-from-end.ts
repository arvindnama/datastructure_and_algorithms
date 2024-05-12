/**
 * Program for Nth node from the end of a Linked List
 */


import { ListNode, createList, printList } from '../../models/linked-list.models';


function getNthNodeFromEnd<T>(head: Nullable<ListNode<T>>, n: number) : Nullable<T> {
  if (!head) return null;

  let i = 0;
  let nthPtr: Nullable<ListNode<T>> = head;

  // move nthPtr to nth from start.
  while(i < n && nthPtr) {
    i++;
    nthPtr = nthPtr.next;
  }
  if(i !== n) {
    // index out of bound
    return null;
  }

  // move head till nthPth Reaches end.
  while(nthPtr) {
    head = head?.next;
    nthPtr = nthPtr.next;
  }

  return head?.value;

}

let head = createList([1,2,3,4,5]);

console.log('Print 6th from last');
printList(head, getNthNodeFromEnd(head, 6));

for(let i = 5 ; i >= 1; i--) {
  console.log(`Print ${i} from last`);
  printList(head, getNthNodeFromEnd(head, i));
}
