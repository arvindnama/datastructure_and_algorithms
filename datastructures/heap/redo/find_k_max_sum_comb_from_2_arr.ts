/**
 * Given two equally sized arrays (A, B) and N (size of both arrays).
A sum combination is made by adding one element from array A and another element of array B. Display the maximum K valid sum combinations from all the possible sum combinations.
 */

import { MinHeap } from '../../../models/heap.models';

function findKMaxSumCombinationsFrom2Arrays(
    a: number[],
    b: number[],
    k: number
): number[] {
    const heap = new MinHeap(k);

    for (let c = 0, i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++, c++) {
            const sum = a[i] + b[j];
            if (c < k) {
                heap.insert(sum);
            } else if (c > k && sum > (heap.getTop() as number)) {
                heap.removeTop();
                heap.insert(sum);
            }
        }
    }

    return Array(k)
        .fill(0)
        .map(() => heap.removeTop() as number)
        .reverse();
}

console.log(
    'Max sum',
    [3, 2],
    [1, 4],
    2,
    findKMaxSumCombinationsFrom2Arrays([3, 2], [1, 4], 2)
);

console.log(
    'Max sum',
    [4, 2, 5, 1],
    [8, 0, 3, 5],
    3,
    findKMaxSumCombinationsFrom2Arrays([4, 2, 5, 1], [8, 0, 3, 5], 3)
);
