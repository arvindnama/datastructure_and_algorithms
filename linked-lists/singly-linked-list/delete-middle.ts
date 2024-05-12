import { ListNode, createList, printList } from "../../models/linked-list.models";

function deleteMiddle(head: Nullable<ListNode<number>>): Nullable<ListNode<number>> {
  if(!head) return head;

  let prv = null;
  let slowPtr = head;
  let fstPtr = head.next;

  while(fstPtr) {
    prv = slowPtr;
    slowPtr = slowPtr.next as ListNode<number>;
    fstPtr = fstPtr.next?.next;
  }

  // fst is at end i.e. slowPtr is at middle;
  (prv as ListNode<number>).next = slowPtr.next;
  return head;
}

const head = createList([1,2,3,4,5]);
printList(head);
console.log('delete middle');
printList(deleteMiddle(head));