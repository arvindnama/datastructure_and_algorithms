import { MinHeap } from '../../models/heap.models';

function heapSort(arr: number[]): number[] {
    const heap = new MinHeap(arr.length);

    for (let i = 0; i < arr.length; i++) {
        heap.insert(arr[i]);
    }
    let top;
    const res = [];
    while ((top = heap.removeTop()) !== null) {
        res.push(top as number);
    }
    return res;
}

console.log(
    'Heap Sort',
    '[10 20 15 17 9 21]',
    heapSort([10, 20, 15, 17, 9, 21])
);
console.log(
    'Heap Sort',
    '[12 11 13 5 6 7 15 5 19]',
    heapSort([12, 11, 13, 5, 6, 7, 15, 5, 19])
);
