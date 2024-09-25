/**
 * Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.


 */

import {
    createList,
    ListNode,
    printList,
} from '../../../models/leet-code.models';

function removeElements(head: ListNode | null, val: number): ListNode | null {
    /*
      have 2 ptr cur & prev
      cur starts with head , prev
      if cur value is val the delete it by prev.next = cur.next

      it is possible very first node has val , so create a dummy node who's next is head.
    */

    const dummy = new ListNode(-1, head);
    let [prev, cur] = [dummy, head];
    while (cur) {
        if (cur.val === val) {
            prev.next = cur.next;
            cur = cur.next;
            continue;
        }
        prev = prev.next!;
        cur = cur.next;
    }
    return dummy.next;
}

let head = createList([6, 1, 2, 6, 3, 4, 5, 6]);
console.log(printList(removeElements(head, 6)));

head = createList([7, 7, 7, 7]);
console.log(printList(removeElements(head, 7)));
