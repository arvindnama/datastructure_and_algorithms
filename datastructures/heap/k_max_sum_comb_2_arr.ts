import { MinHeap } from '../../models/heap.models';

function findMaxSumCombFrom2Arr(
    arr1: number[],
    arr2: number[],
    k: number
): number[] {
    const h = new MinHeap(k);

    for (let c = 0, i = 0; i <= arr1.length; i++) {
        for (let j = 0; j <= arr2.length; j++, c++) {
            const s = arr1[i] + arr2[j];
            if (c < k) {
                h.insert(s);
            } else if (s > (h.getTop() as number)) {
                h.removeTop();
                h.insert(s);
            }
        }
    }

    return Array(k)
        .fill(0)
        .map(() => h.removeTop() as number)
        .reverse();
}

console.log(
    'Max sum',
    [3, 2],
    [1, 4],
    2,
    findMaxSumCombFrom2Arr([3, 2], [1, 4], 2)
);

console.log(
    'Max sum',
    [4, 2, 5, 1],
    [8, 0, 3, 5],
    3,
    findMaxSumCombFrom2Arr([4, 2, 5, 1], [8, 0, 3, 5], 3)
);
