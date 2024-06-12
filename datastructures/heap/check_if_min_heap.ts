function checkIfMinHeap(heap: number[]): boolean {
    const isNodeSafe = (idx: number): boolean => {
        const l = 2 * idx + 1;
        const r = 2 * idx + 2;

        // leaf node, hence it is safe
        if (l >= heap.length && r >= heap.length) return true;

        let isSafe = true;
        isSafe &&=
            l < heap.length
                ? heap[idx] <= heap[l]
                    ? isNodeSafe(l)
                    : false
                : true;
        isSafe &&=
            isSafe && r < heap.length
                ? heap[idx] <= heap[r]
                    ? isNodeSafe(r)
                    : false
                : true;

        return isSafe;
    };

    return isNodeSafe(0);
}

console.log('is min heap', [1, 2, 3], checkIfMinHeap([1, 2, 3]));
console.log(
    'is min heap',
    [90, 15, 10, 7, 12, 2],
    checkIfMinHeap([90, 15, 10, 7, 12, 2])
);
console.log(
    'is min heap',
    [9, 15, 10, 17, 16, 11],
    checkIfMinHeap([9, 15, 10, 17, 16, 11])
);
