/**
 * Merge a linked list into another linked list at alternate positions
 */

import { ListNode, createList, printList } from "./helper/node";

function merge(
  head1: Nullable<ListNode<number>>, 
  head2: Nullable<ListNode<number>>
): [Nullable<ListNode<number>>,Nullable<ListNode<number>>] {

  if(!head1 || !head2) return [head1, head2];

  let cur1 = head1;
  let cur2 = head2;

  while(cur1) {
      const newNode = cur2;
      cur2 = cur2.next as ListNode<number>;

      const temp = cur1.next;
      cur1.next = newNode;
      newNode.next = temp;
      cur1 = temp as ListNode<number>;; 

  }
  return [head1, cur2];
}

let head1 = createList([5,7,17,13,11])
let head2 = createList([12,10,2,4,6]);
printList(head1);
printList(head2);
console.log('Merge::');
let [h1, h2] = merge(head1, head2);
printList(h1);
printList(h2);


head1 = createList([1,2,3])
head2 = createList([4,5,6,7,8]);
printList(head1);
printList(head2);
console.log('Merge::');
[h1, h2] = merge(head1, head2);
printList(h1);
printList(h2);