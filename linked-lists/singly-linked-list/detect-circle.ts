import { ListNode, createList, printList } from "../../models/linked-list.models";


function detectCircle<T>(start: Nullable<ListNode<T>>): boolean {


  let slowPtr = start;
  let fastPtr = start;

  do {
    slowPtr = slowPtr?.next;
    fastPtr = fastPtr?.next?.next;
  } while(fastPtr && fastPtr !== slowPtr)

  return fastPtr === slowPtr;
}

let start = createList([1,2,3,4,5,1], true);
printList(start, true);
console.log('circle found', detectCircle(start));

const start2 = createList([1,2,3,4,5], true);
printList(start2, true)
console.log('circle found', detectCircle(start2));