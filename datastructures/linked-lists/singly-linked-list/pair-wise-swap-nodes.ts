import {
    NullableNumListNode,
    NumListNode,
    createList,
    printList,
} from '../../../models/linked-list.models';

function pairWiseSwap(head: NullableNumListNode): NullableNumListNode {
    if (!head) return null;
    if (!head.next) return head;

    let prev: NullableNumListNode = null;

    let cur: NullableNumListNode = head;
    let next: NullableNumListNode = head.next;
    const newHead = head.next;

    while (cur && next) {
        const temp = next.next as NumListNode;
        next.next = cur;
        cur.next = temp;
        if (prev) prev.next = next;
        prev = cur;
        cur = temp;
        next = cur?.next;
    }

    return newHead;
}

let head = createList([1, 2, 3, 4, 5, 6]);
printList(head);
console.log('pairwise swap of list');
printList(pairWiseSwap(head));

head = createList([1, 2, 3, 4, 5]);
printList(head);
console.log('pairwise swap of list');
printList(pairWiseSwap(head));

head = createList([1]);
printList(head);
console.log('pairwise swap of list');
printList(pairWiseSwap(head));
