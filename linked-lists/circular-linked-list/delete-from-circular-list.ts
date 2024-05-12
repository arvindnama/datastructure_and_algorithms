import { ListNode, NullableNumListNode, NumListNode, createList, printList } from "../../models/linked-list.models";


function deleteFromCircularList(head: NullableNumListNode, k: number){
  if(!head) return head;
  
  let cur = head.next;
  let prv = head;

  do {
    if(cur?.value === k) {
      prv.next = cur.next;
      break;
    }
    prv = cur as NumListNode;
    cur = cur?.next;
  } while(cur !== head) 
  
  return cur;
}

let head = createList([2,5,7,8,10],true);
console.log('delete from circular linked list');
printList(head,true);
printList(deleteFromCircularList(head,5), true)

head = createList([2,5,7,8,10],true);
console.log('delete from circular linked list');
printList(head,true);
printList(deleteFromCircularList(head, 7), true)