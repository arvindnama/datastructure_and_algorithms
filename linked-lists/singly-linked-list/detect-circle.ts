import { Node, createList, printList } from "./helper/node";


function detectCircle<T>(start: Nullable<Node<T>>): boolean {


  let slowPtr = start;
  let fastPtr = start;

  do {
    slowPtr = slowPtr?.next;
    fastPtr = fastPtr?.next?.next;
  } while(fastPtr && fastPtr !== slowPtr)

  return fastPtr === slowPtr;
}

let start = createList([1,2,3,4,5,1]);
printList(start);
console.log('circle found', detectCircle(start));

const start2 = createList([1,2,3,4,5]);
printList(start2)
console.log('circle found', detectCircle(start2));