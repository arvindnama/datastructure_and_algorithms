import { NullableNumListNode, createList, printList } from "../../../models/linked-list.models";


function convertToCircular(head: NullableNumListNode): NullableNumListNode {
  if(!head) return null;

  let end = head;
  while(end.next) {
    end = end.next;
  }

  end.next = head;
  return head;
}

const head = createList([1,2,3,4,5]);
printList(head);
console.log('convert to circular', printList(convertToCircular(head), true))

