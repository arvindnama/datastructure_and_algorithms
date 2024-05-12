import { ListNode, createList, printList } from "../../models/linked-list.models";


function reverseItr(head: Nullable<ListNode<number>>) {
  if(!head) return head;

  let nxt = head.next;
  let cur = head;

  while(nxt) {
    const temp = nxt.next;
    nxt.next = cur;
    cur = nxt;
    nxt = temp;
  }

  head.next = null;
  return cur;
}


function reverseRec(head: Nullable<ListNode<number>>) {

  const reverseInt = (prv: Nullable<ListNode<number>>, head: Nullable<ListNode<number>>):  Nullable<ListNode<number>> => {
    if(!head) return head;
    if(!head.next) {
      head.next = prv;
      return head;
    }

    const temp = head.next;
    head.next = prv;
    prv = head;
    head = temp;
    return reverseInt(prv, head);
  };
  return reverseInt(null, head);
}

console.log('1. Reverse list Iterative - multiple entries');
let head = createList([1,2,3,4,5,6,7,8])
printList(head);
printList(reverseItr(head));

console.log('1. Reverse list Iterative - two entry');
head = createList([1,2])
printList(head);
printList(reverseItr(head));


console.log('3. Reverse list Rec - empty');
printList(null);
printList(reverseRec(null));

console.log('2. Reverse list Rec - multiple entries');
 head = createList([1,2,3,4,5,6,7,8])
printList(head);
printList(reverseRec(head));

console.log('3. Reverse list Rec - two entry');
head = createList([1,2])
printList(head);
printList(reverseRec(head));