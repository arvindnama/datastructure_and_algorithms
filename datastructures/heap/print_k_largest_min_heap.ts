import { MinHeap } from '../../models/heap.models';

/**
 * Print the k largest elements in an unsorted array
 *
 * Logic:
 *      Maintain a Min Heap of size k ,
 *      iterate through the array
 *      insert into min heap if heap size is not yet maxed (k)
 *      if heap is reached the max size , remove at top & insert the new element
 *      if and only if cur element is greater than the min element on heap.
 * @param arr unsorted array
 * @param k no. of largest elements to be returned
 * @returns k largest elements in array
 */
function printKLargestMinHeap(arr: number[], k: number): number[] {
    const h = new MinHeap(k);

    for (let i = 0; i < arr.length; i++) {
        if (i < k) h.insert(arr[i]);
        else if (i > k && arr[i] > (h.getTop() as number)) {
            h.removeTop();
            h.insert(arr[i]);
        }
    }
    return Array(k)
        .fill(0)
        .map(() => h.removeTop() as number)
        .reverse();
}

console.log(
    'Top 3 elements',
    [1, 23, 12, 9, 30, 2, 50],
    printKLargestMinHeap([1, 23, 12, 9, 30, 2, 50], 3)
);

console.log(
    'Top 2 elements',
    [11, 5, 12, 9, 44, 17, 2],
    printKLargestMinHeap([11, 5, 12, 9, 44, 17, 2], 2)
);
