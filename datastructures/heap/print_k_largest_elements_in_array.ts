import { MaxHeap } from '../../models/heap.models';

function printKLargestHeapSort(arr: number[], k: number): number[] {
    const heap = new MaxHeap(k + 1);
    for (let i = 0; i < arr.length; i++) {
        if (i > k) heap.removeAtIdx(k - 1);
        heap.insert(arr[i]);
    }
    return Array(k)
        .fill(null)
        .map(() => heap.removeTop() as number);
}

console.log(
    'Top 3 elements',
    [1, 23, 12, 9, 30, 2, 50],
    printKLargestHeapSort([1, 23, 12, 9, 30, 2, 50], 3)
);

console.log(
    'Top 2 elements',
    [11, 5, 12, 9, 44, 17, 2],
    printKLargestHeapSort([11, 5, 12, 9, 44, 17, 2], 2)
);
