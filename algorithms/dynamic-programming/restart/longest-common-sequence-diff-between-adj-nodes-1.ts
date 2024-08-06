/**
 * Given an array of n size, the task is to find the longest subsequence such that difference between adjacent elements is one.
 * https://www.geeksforgeeks.org/longest-subsequence-such-that-difference-between-adjacents-is-one/?ref=lbp
 */

function longestSubsequence(arr: number[]): number {
    let seq: number[] = [];
    const updateSeq = (curSeq: number[]) => {
        // console.log(curSeq);
        seq = curSeq.length > seq.length ? curSeq : seq;
    };
    for (let i = 0; i < arr.length; i++) {
        const curSeq: number[] = [i];
        let prevIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (Math.abs(arr[prevIdx] - arr[j]) === 1) {
                curSeq.push(j);
                prevIdx = j;
            } else if (curSeq.length > 1) {
                let p = curSeq.length - 1;
                while (p >= 0 && Math.abs(arr[curSeq[p]] - arr[j]) !== 1) {
                    p--;
                }
                if (p > 0) {
                    // first update seq arr if cur seq is longer
                    updateSeq(curSeq);
                    prevIdx = curSeq[p];
                    curSeq.length = p + 1;
                    j = j - 1;
                }
            }
        }
        updateSeq(curSeq);
    }

    // console.log(
    //     'longest',
    //     seq.map((i) => arr[i])
    // );
    return seq.length;
}

console.log('Non DP');
console.log(longestSubsequence([10, 9, 4, 5, 4, 8, 6]));
console.log(longestSubsequence([4, 5, 4, 8, 6, 7, 8]));
console.log(longestSubsequence([10, 9, 4, 5, 4, 8, 6, 7]));
console.log(longestSubsequence([1, 2, 3, 2, 3, 7, 2, 1]));

function longestSubsequenceDP(arr: number[]): number {
    const map: { [k in string]: number } = {};
    const find = (idx: number, prevIdx: number): number => {
        if (idx === arr.length) return 0;
        const key = `${idx}_${prevIdx}`;
        if (map[key] >= 0) return map[key];
        const notTake = find(idx + 1, prevIdx);
        let take = 0;
        if (prevIdx == -1 || Math.abs(arr[idx] - arr[prevIdx]) === 1) {
            take = 1 + find(idx + 1, idx);
        }

        return (map[key] = Math.max(notTake, take));
    };

    return find(0, -1);
}

console.log('DP');
console.log(longestSubsequenceDP([10, 9, 4, 5, 4, 8, 6]));
console.log(longestSubsequenceDP([4, 5, 4, 8, 6, 7, 8]));
console.log(longestSubsequenceDP([10, 9, 4, 5, 4, 8, 6, 7]));
console.log(longestSubsequenceDP([1, 2, 3, 2, 3, 7, 2, 1]));
