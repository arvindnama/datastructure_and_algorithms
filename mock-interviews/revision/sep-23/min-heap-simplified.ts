/**
 * Write a simplified version of heap
 * that can be easily built for lead code problems
 * like kth largest or k smallest element.
 */

interface ISimpleHeap {
    insert(n: number): void;
    removeTop(): number;
    print(): void;
    size(): number;
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
    };
};

const heap = minHeap(3);
console.log('insert  3', heap.insert(3));
heap.print();
console.log('insert 10', heap.insert(10));
heap.print();
console.log('insert 12', heap.insert(12));
heap.print();

console.log('remove top', heap.removeTop());
heap.print();
console.log('insert  8', heap.insert(8));
heap.print();
console.log('remove top', heap.removeTop());
heap.print();
console.log('insert  2', heap.insert(2));
heap.print();
console.log('remove top', heap.removeTop());
heap.print();
console.log('insert 14', heap.insert(14));
heap.print();
