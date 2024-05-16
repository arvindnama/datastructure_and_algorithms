import { ListNode, NullableNumListNode, NumListNode, createList, printList } from "../../../models/linked-list.models";


function insertAtBeginning(head: NullableNumListNode, num: number): NullableNumListNode {
  const node: ListNode<number>  = {
    value: num
  };

  if(!head)  {
    node.next = node;
    return node;
  }

  let end = head as NumListNode;

  do {
    end = end.next as NumListNode;
  } while(end.next !== head);

  node.next = head;
  end.next = node;

  return node;
}

function insertAtEnd(head: NullableNumListNode, num: number): NullableNumListNode {
  const node: NumListNode = {
    value: num,
  };

  if(!head) {
    node.next = node;
    return node;
  }

  let end = head as NumListNode;

  do {
    end = end.next as NumListNode;
  } while(end.next !== head);

  if(end) {
    end.next = node;
  }else {
    // only one node
    head.next = node;
  }
  node.next = head;

  return head;
}



let head = createList([1,2,3,4,5,6,1], true);
console.log('Insert 0 at beginning');
printList(head, true);
printList(insertAtBeginning(head, 0), true);

console.log('Insert 0 at beginning');
head = createList([1,1], true);
printList(head, true);
printList(insertAtBeginning(head, 0), true);


console.log('insert 6 at end');
head = createList([1,1], true);
printList(head, true);
printList(insertAtEnd(head, 6), true);


console.log('insert 6 at end');
head = createList([1,2,3,4,5,1], true);
printList(head, true);
printList(insertAtEnd(head, 6), true);