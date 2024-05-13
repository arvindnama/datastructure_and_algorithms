import { NullableNumListNode } from "../../models/linked-list.models";


function sortList(head: NullableNumListNode): NullableNumListNode {
  if(!head) return head;

  let start = head;
  let prv: NullableNumListNode = null;
  let cur = head;
  let last = cur;
  
  // set up a pointer to end of list.
  while(last.next) {
    last = last.next;
  }

  while(true) {
    if(cur.value === 0) {
      // swap with start & move start by  .
    }else if(cur.value === 2) {
      // move to end
    } else {
      // done nothing 
    }
  }

}