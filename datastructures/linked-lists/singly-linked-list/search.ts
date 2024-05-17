/**
 * Search an element in a Linked List (Iterative and Recursive)
 *
 * Given a linked list and a key ‘X‘ in, the task is to check if X is present in the linked list or not.
 */

import {
    ListNode,
    createList,
    printList,
} from '../../models/linked-list.models';

function searchItr<T>(head: Nullable<ListNode<T>>, key: T): boolean {
    while (head && head.value !== key) {
        head = head.next;
    }

    return !!head;
}

function searchRecursive<T>(head: Nullable<ListNode<T>>, key: T): boolean {
    if (!head) return false;
    if (head.value === key) return true;

    return searchRecursive(head?.next, key);
}

/**
 * Search for a item iteratively
 */

console.log('Search list iterative - empty list');
printList(null);
console.log(searchItr(null, 2));

console.log('Search list iterative - key not found list');
let head = createList([1, 2, 3, 4]);
printList(head);
console.log(searchItr(head, 10));

console.log('Search list iterative - key not found');
head = createList([1, 2, 3, 4]);
printList(head);
console.log(searchItr(head, 4));

/**
 * Search for a item recursively
 */
console.log('Search list recursive - empty list');
printList(null);
console.log(searchRecursive(null, 2));

console.log('Search list recursive - key not found list');
head = createList([1, 2, 3, 4]);
printList(head);
console.log(searchRecursive(head, 10));

console.log('Search list recursive - key not found');
head = createList([1, 2, 3, 4]);
printList(head);
console.log(searchRecursive(head, 3));
