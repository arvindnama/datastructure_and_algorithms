import { NullableNumListNode, createList, printList } from "../../../models/linked-list.models";


function countFrequencyOfNum(head: NullableNumListNode, num: number): number {
  let count = 0;

  let cur = head;
  while(cur) {
    if(cur.value === num) count++;
    cur = cur.next;
  }
  return count;
}


const head = createList([1,2,1,3,4]);
printList(head);
console.log('frequency of 1', countFrequencyOfNum(head, 1))