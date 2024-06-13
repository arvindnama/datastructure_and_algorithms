function printNodesLessThanX(heap: number[], k: number): number[] {
    const res: number[] = [];
    const traverse = (idx: number) => {
        if (idx >= heap.length) return;

        if (heap[idx] < k) {
            res.push(heap[idx]);

            const l = 2 * idx + 1;
            const r = 2 * idx + 2;

            traverse(l);
            traverse(r);
        }
    };
    traverse(0);
    return res;
}

console.log(
    'values less than 15',
    [2, 3, 15, 5, 4, 45, 80, 6, 150, 77, 120],
    printNodesLessThanX([2, 3, 15, 5, 4, 45, 80, 6, 150, 77, 120], 15)
);

console.log(
    'values less than 80',
    [2, 3, 15, 5, 4, 45, 80, 6, 150, 77, 120],
    printNodesLessThanX([2, 3, 15, 5, 4, 45, 80, 6, 150, 77, 120], 80)
);
