/**
 * Given an array arr[] of size N, the task is to find the length of the Longest Increasing Subsequence (LIS) i.e., the longest possible subsequence in which the elements of the subsequence are sorted in increasing order.
https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/?ref=lbp

 */

function findLengthOfLongestIncSeq(arr: number[]): number {
    let seq: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        const cur: number[] = [];
        cur.push(arr[i]);
        let prevIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[prevIdx]) {
                prevIdx = j;
                cur.push(arr[j]);
            }
        }
        seq = seq.length < cur.length ? cur : seq;
    }
    // console.log(seq);
    return seq.length;
}

function findLengthOfLongestIncSeqDP(arr: number[]): number {
    /**
     * starting from zero Idx (with prev as -1)
     * there are possibilities
     *  1. not take the cur element at Idx , in that case move idx by 1
     *  2. take cur element if cur elm > prevElem or prevElem is -1 (cur is first
     *     elem) i.e
     *  Max of take , notTake is the length of longest subsequence with element at
     *  cur index at idx
     */

    const map: { [k in string]: number } = {};
    const find = (idx: number, prevIdx: number): number => {
        if (idx == arr.length) return 0; // reached the end.

        const key = `${idx}_${prevIdx}`;
        if (map[key] >= 0) return map[key];
        const notTake = find(idx + 1, prevIdx);
        let take = 0;
        if (prevIdx == -1 || arr[idx] > arr[prevIdx]) {
            take = 1 + find(idx + 1, idx);
        }

        return (map[key] = Math.max(take, notTake));
    };

    return find(0, -1);
}

console.log('NonDP');
console.log(findLengthOfLongestIncSeq([3, 10, 2, 1, 20]));
console.log(findLengthOfLongestIncSeq([50, 3, 10, 7, 40, 80]));
console.log(findLengthOfLongestIncSeq([30, 20, 10]));
console.log(findLengthOfLongestIncSeq([10, 20, 35, 80]));

console.log('DP');
console.log(findLengthOfLongestIncSeqDP([3, 10, 2, 1, 20]));
console.log(findLengthOfLongestIncSeqDP([50, 3, 10, 7, 40, 80]));
console.log(findLengthOfLongestIncSeqDP([30, 20, 10]));
console.log(findLengthOfLongestIncSeqDP([10, 20, 35, 80]));
