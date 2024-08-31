/**
 * Given an array arr[] of size N, find the prefix sum of the array. A prefix sum array is another array prefixSum[] of the same size, such that the value of prefixSum[i] is arr[0] + arr[1] + arr[2] . . . arr[i].
 */

function prefixSum(arr: number[]): number[] {
    /**
     * iterate over arr,
     * prefixSum[i] = prefixSum?.[i-1] + arr[i]
     */

    const prefixSum: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        prefixSum[i] = (prefixSum?.[i - 1] ?? 0) + arr[i];
    }

    return prefixSum;
}

console.log(prefixSum([10, 20, 10, 5, 15]));
