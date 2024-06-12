function isMaxHeap(heap: number[]): boolean {
    const isNodeSafe = (idx: number): boolean => {
        if (idx >= heap.length) return true;

        const l = 2 * idx + 1;
        const r = 2 * idx + 2;

        // leaf node
        if (l >= heap.length && r >= heap.length) {
            return true;
        }

        let isSafe = true;
        if (l < heap.length) {
            isSafe &&= heap[idx] >= heap[l] ? isNodeSafe(l) : false;
        }
        if (isSafe && r < heap.length) {
            isSafe &&= heap[idx] >= heap[r] ? isNodeSafe(r) : false;
        }
        return isSafe;
    };
    return isNodeSafe(0);
}

console.log('is heap max heap', [3, 2, 1], isMaxHeap([3, 2, 1]));
console.log(
    'is heap max heap',
    [90, 15, 10, 7, 12, 2],
    isMaxHeap([90, 15, 10, 7, 12, 2])
);
console.log(
    'is heap max heap',
    [9, 15, 10, 7, 12, 11],
    isMaxHeap([9, 15, 10, 7, 12, 11])
);
