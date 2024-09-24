interface ISimpleHeap {
    insert(n: number): void;
    removeTop(): number;
    print(): void;
    size(): number;
    top(): number;
}

export const minHeap = (size: number): ISimpleHeap => {
    const heap: number[] = [];

    const heapifyBottomUp = (n: number) => {
        const parent = Math.floor((n - 1) / 2);

        if (parent >= 0 && heap[parent] > heap[n]) {
            [heap[parent], heap[n]] = [heap[n], heap[parent]];
            heapifyBottomUp(parent);
        }
    };

    const heapifyTopDown = (n: number) => {
        const left = 2 * n + 1;
        const right = 2 * n + 2;

        let temp = n;
        if (left < heap.length && heap[temp] > heap[left]) temp = left;
        if (right < heap.length && heap[temp] > heap[right]) temp = right;

        if (temp !== n) {
            [heap[temp], heap[n]] = [heap[n], heap[temp]];
            heapifyTopDown(temp);
        }
    };

    return {
        insert: (n) => {
            if (heap.length === size) throw 'no space';
            heap.push(n);
            heapifyBottomUp(heap.length - 1);
        },
        removeTop: () => {
            const top = heap[0];
            heap[0] = heap[heap.length - 1];
            heap.length--;
            heapifyTopDown(0);
            return top;
        },
        print: () => console.log(heap),
        size: () => size,
        top: () => heap[0],
    };
};

function printKLargestMinHeap(arr: number[], k: number): number[] {
    /**
     * create a minheap of size k ,
     * as we iterate through arr, push the items into heap
     * if heap size === k .
     *  if cur element is > top then remove top of heap and replace it
     *  else ignore the element
     */

    const heap = minHeap(k);
    for (let i = 0; i < arr.length; i++) {
        if (i < k) {
            heap.insert(arr[i]);
            continue;
        }
        // size is k
        if (arr[i] > heap.top()) {
            // remove top and insert cur
            heap.removeTop();
            heap.insert(arr[i]);
        }
    }

    return new Array(k)
        .fill(0)
        .map(() => heap.removeTop())
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
