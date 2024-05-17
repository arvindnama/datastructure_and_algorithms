import {
    ListNode,
    createList,
    printList,
} from '../../../models/linked-list.models';

function removeDuplicates(
    head: Nullable<ListNode<number>>
): Nullable<ListNode<number>> {
    if (!head) return head;
    let prv = head;
    let cur = head.next;

    while (cur) {
        if (cur.value === cur.next?.value) {
            // erase duplicate
            prv.next = cur.next;
        } else {
            prv = cur;
        }
        cur = cur.next;
    }

    if (head.value === head.next?.value) head = head.next;
    return head;
}

const head = createList([1, 2, 2, 2, 3, 4]);
printList(head);
console.log('remove duplicated');
printList(removeDuplicates(head));

const head2 = createList([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4]);
printList(head2);
console.log('remove duplicated');
printList(removeDuplicates(head2));
