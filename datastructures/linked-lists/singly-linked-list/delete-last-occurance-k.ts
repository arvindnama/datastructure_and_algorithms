import { ListNode, createList, printList } from "../../../models/linked-list.models";


function deleteLastOccurrence(
  head:Nullable<ListNode<number>>, k: number
): Nullable<ListNode<number>> {

  if(!head) return head;

  let prevOfK = null;
  let nextOfK = null;
  let cur: Nullable<ListNode<number>> = head;
  let prv: Nullable<ListNode<number>> = null;

  while(cur) {
    if(cur.value === k) {
      prevOfK = prv;
      nextOfK = cur.next;
    }
    prv = cur;
    cur = cur.next;
  }

  if(prevOfK) {
    prevOfK.next = nextOfK;
  }

  return head;
}

let head = createList([1,2,3,4,5,4,4]);
printList(head);
console.log('Delete Last occurrence of 4');
printList(deleteLastOccurrence(head, 4))


head = createList([1,2,3,5,2,10]);
printList(head);
console.log('Delete Last occurrence of 2');
printList(deleteLastOccurrence(head, 2))