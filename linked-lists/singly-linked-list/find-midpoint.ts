import { ListNode, createList } from "../../models/linked-list.models"


function findMidpoint(start: Nullable<ListNode<number>>) {
  let slow = start as ListNode<number>;
  let fast = start;

  while(fast?.next) {
    slow = slow.next as ListNode<number>;
    fast = fast.next?.next;
  }
  return slow.value;
}

console.log('mid pointer', findMidpoint(createList([1,2,3,4,5])));
console.log('mid pointer', findMidpoint(createList([1,2,3,4])));