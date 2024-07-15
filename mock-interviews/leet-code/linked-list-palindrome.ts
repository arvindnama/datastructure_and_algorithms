/**
 * Given the head of a singly linked list, return true if it is a
palindrome or false otherwise.
 */

import { createList, ListNode } from '../../models/leet-code.models';

function isPalindrome(head: ListNode | null): boolean {
    if (!head) return false;

    /**
     * constrain: O(n) time & O(1) space complexity.
     * since we cannot store any additional data, we cannot
     * Store the reverse list in array or string O(n)
     *
     * but we can split the list into 2
     * start --> mid - 1
     * mid --> end
     *
     * reverse the second half of list and compare both the list
     */

    const reverse = (
        prev: ListNode | null,
        cur: ListNode | null
    ): ListNode | null => {
        if (!cur) return prev;
        const temp = cur.next;
        cur.next = prev;
        return reverse(cur, temp);
    };

    let [midPrev, midPtr, ptr]: [ListNode | null, ListNode, ListNode] = [
        null,
        head,
        head,
    ];

    // find the mid pointer
    while (ptr?.next) {
        midPrev = midPtr as ListNode;
        midPtr = midPtr.next as ListNode;
        ptr = ptr.next.next as ListNode;
    }

    // cut off the first half
    if (midPrev) midPrev.next = null;

    let rHead = reverse(null, midPtr);

    while (rHead && head) {
        if (rHead.val !== head.val) return false;
        rHead = rHead.next;
        head = head.next;
    }

    // it is possible that second half of the list is 1 more than first half
    //  --> when list is of odd size,
    //  --> head will be null and rHead will have 1 more node

    return !!(!head && !rHead) || !!(!head && rHead && !rHead.next);
}

let head = createList([1, 1, 2, 1]);
console.log(isPalindrome(head));

head = createList([1, 2]);
console.log(isPalindrome(head));

head = createList([1, 2, 2, 1]);
console.log(isPalindrome(head));

head = createList([1, 1]);
console.log(isPalindrome(head));

head = createList([1, 2, 3, 4, 3, 2, 1]);
console.log(isPalindrome(head));
