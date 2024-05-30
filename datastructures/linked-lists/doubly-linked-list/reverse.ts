import {
    DoublyListNode,
    createDoublyLinkedList,
    printDoublyLinkedList,
} from '../../../models/linked-list.models';

function reverseList(
    head: Nullable<DoublyListNode<number>>
): Nullable<DoublyListNode<number>> {
    if (!head) return null;

    let cur: Nullable<DoublyListNode<number>> = head;

    while (cur.next) {
        const prev = cur.prev;
        const next = cur.next as DoublyListNode<number>;

        cur.next = prev;
        cur.prev = next;

        cur = next;
    }

    cur.next = cur.prev;
    cur.prev = undefined;

    return cur;
}

let head: Nullable<DoublyListNode<number>> = createDoublyLinkedList([1, 2, 3]);
printDoublyLinkedList(head);
console.log('Reverse doubly linked list');
head = reverseList(head);
printDoublyLinkedList(head);
