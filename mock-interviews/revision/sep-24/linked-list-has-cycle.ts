/**
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 */

import { createList, ListNode } from '../../../models/leet-code.models';

function hasCycle(head: ListNode | null): boolean {
    /*
       We can use the fast and slow pointer approach
       fast pointer jumps by 2 , slow ptr by 1
       if they both meet then there is a cycle
       in case of no cycle then end up null
    */

    let [fast, slow] = [head, head];

    while (fast && slow) {
        fast = fast.next?.next as ListNode;
        slow = slow.next;
        if (fast === slow) return true;
    }

    return false;
}

let head = createList([3, 2, 0, 4]);
console.log(hasCycle(head));

head = createList([3]);
console.log(hasCycle(head));

head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(4);
head.next.next.next.next = head;
console.log(hasCycle(head));

head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = head;
console.log(hasCycle(head));
