import {
    NullableNumListNode,
    createList,
    printList,
} from '../../../models/linked-list.models';

function removeEveryKNode(head: NullableNumListNode, k: number) {
    if (k === 1) return null; // all nodes are to be removed.

    let i = 1;
    let prev: NullableNumListNode = null;
    let cur = head;

    while (cur) {
        if (i === k && prev) {
            prev.next = cur.next;
            i = 1;
        } else {
            i++;
        }
        prev = cur;
        cur = cur.next;
    }
    return head;
}

let head = createList([1, 2, 3, 4, 5, 6, 7, 8]);
printList(head);
console.log('remove every 3rd element from list');
printList(removeEveryKNode(head, 3));

head = createList([1, 2, 3, 4, 5, 6, 7, 8]);
printList(head);
console.log('remove every 2nd element from list');
printList(removeEveryKNode(head, 2));
