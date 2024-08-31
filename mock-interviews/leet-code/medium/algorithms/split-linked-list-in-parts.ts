/**
 * Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

Return an array of the k parts.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function splitListToParts(
    head: ListNode | null,
    k: number
): Array<ListNode | null> {
    /**
     * first get the length of the list (n)
     *
     * if n < k , then we just need to distribute 1 in each part with few null
     * if n > k;
     * per-part = n/k
     * r (remaining) = n % k;
     *
     * r will always be < k
     *
     * for first r parts we will need to fill one more
     */

    let [n, temp] = [0, head];
    while (temp) {
        temp = temp.next;
        n++;
    }

    let [perPart, r] = [0, 0];

    perPart = Math.floor(n / k);
    r = n % k;
    let cur = head;
    let prev!: ListNode | null;

    const parts: Array<ListNode | null> = new Array(k)
        .fill(null)
        .map(() => null);

    for (let part = 0; part < k && cur; part++) {
        const nodes = perPart + (part < r ? 1 : 0);
        let temp = cur;
        parts[part] = cur;
        for (let i = 0; i < nodes && cur; i++) {
            prev = temp;
            temp = temp.next as ListNode;
        }
        if (prev) prev.next = null;
        cur = temp;
    }

    return parts;
}

let head = createList([1, 2, 3]);
let arr = splitListToParts(head, 5);
arr.forEach((part) => {
    console.log(printList(part));
});

head = createList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
arr = splitListToParts(head, 3);
arr.forEach((part) => {
    console.log(printList(part));
});

head = createList([1, 2, 3, 4]);
arr = splitListToParts(head, 3);
arr.forEach((part) => {
    console.log(printList(part));
});
