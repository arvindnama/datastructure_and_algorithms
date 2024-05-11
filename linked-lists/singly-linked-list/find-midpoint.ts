import { Node, createList } from "./helper/node"


function findMidpoint(start: Nullable<Node<number>>) {
  let slow = start as Node<number>;
  let fast = start;

  while(fast?.next) {
    slow = slow.next as Node<number>;
    fast = fast.next?.next;
  }
  return slow.value;
}

console.log('mid pointer', findMidpoint(createList([1,2,3,4,5])));
console.log('mid pointer', findMidpoint(createList([1,2,3,4])));