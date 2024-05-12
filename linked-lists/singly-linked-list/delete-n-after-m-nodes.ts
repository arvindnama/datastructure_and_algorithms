import { ListNode, createList, printList } from "../../models/linked-list.models";

function deleteNAfterMNodes(head: Nullable<ListNode<number>>, m: number, n: number): Nullable<ListNode<number>> {

  if(!head) return head;
  let cur = head;
  let i = 1;
  while(cur) {
    let mPtr = cur ;
    while(i < m && mPtr) {
      mPtr = mPtr.next as ListNode<number>;
      i++;
    }
    if(!mPtr) break;

    i = 1;
    let nPtr = mPtr.next;
    while(i < n && nPtr) {
      nPtr = nPtr.next;
      i++;
    }
    mPtr.next = nPtr?.next; 
    i = 1;
    cur = nPtr?.next as ListNode<number>;
  }
  return head;
}

let head = createList([1,2,3,4,5,6,7,8]);
printList(head);
console.log('Delete 2 nodes after 2')
printList(deleteNAfterMNodes(head, 2,2))

head = createList([1,2,3,4,5,6,7,8,9,10]);
printList(head);
console.log('Delete 2 nodes after 3')
printList(deleteNAfterMNodes(head, 3,2))

head = createList([1,2,3,4,5,6,7,8,9,10]);
printList(head);
console.log('Delete 1 nodes after 1')
printList(deleteNAfterMNodes(head, 1,1))