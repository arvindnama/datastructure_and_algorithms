import { MinHeap } from '../../../models/heap.models';

function printKLargestElementsInArray(arr: number[], k: number): number[] {
    const h = new MinHeap(k);
    for (let i = 0; i < arr.length; i++) {
        if (i < k) {
            h.insert(arr[i]);
        } else if (i >= k && arr[i] > (h.getTop() as number)) {
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
    printKLargestElementsInArray([1, 23, 12, 9, 30, 2, 50], 3)
);

console.log(
    'Top 2 elements',
    [11, 5, 12, 9, 44, 17, 2],
    printKLargestElementsInArray([11, 5, 12, 9, 44, 17, 2], 2)
);
