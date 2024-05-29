import {
    DoublyListNode,
    createDoublyLinkedList,
    printDoublyLinkedList,
} from '../../../models/linked-list.models';

function deleteNodeAtPos(
    head: Nullable<DoublyListNode<number>>,
    pos: number
): Nullable<DoublyListNode<number>> {
    if (!head) return null;

    let cur: Nullable<DoublyListNode<number>> = head;
    let i = 1;
    while (cur) {
        if (i === pos) {
            const prev = cur.prev;
            const next = cur.next;
            if (prev) {
                prev.next = next;
            } else {
                // head is being removed.
                head = next;
            }
            if (next) next.prev = prev;
            break;
        }
        i++;
        cur = cur.next;
    }

    return head;
}

let head = createDoublyLinkedList([2, 45, 3, 1]);
printDoublyLinkedList(head);
console.log('delete node at pos 1');
printDoublyLinkedList(deleteNodeAtPos(head, 1));

head = createDoublyLinkedList([2, 45, 3, 1]);
printDoublyLinkedList(head);
console.log('delete node at pos 2');
printDoublyLinkedList(deleteNodeAtPos(head, 2));

head = createDoublyLinkedList([2, 45, 3, 1]);
printDoublyLinkedList(head);
console.log('delete node at pos 4');
printDoublyLinkedList(deleteNodeAtPos(head, 4));
