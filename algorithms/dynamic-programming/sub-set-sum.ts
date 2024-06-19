/**
 * Given a set of non-negative integers and a value sum, the task is to check if there is a subset of the given set whose sum is equal to the given sum.
 */

/**
 * Start from last element,
 *  there are 2 possibilities ,
 *  1. last element can be present in the subset Or
 *  2. last element can be absent in the subset.
 *
 * now repeat the process by reducing the subset size by 1 and end when
 * sum is zero (i.e. subset found) or lastIdx < 0 (set is empty)
 *
 * isSubset(set , sum - lIdx, lIdx - 1) ||  // last Element present
 * isSubset(set , sum , lIdx - 1) // last Element absent
 */
const isSubsetSum = (set: number[], sum: number): boolean => {
    const map: { [key in string]: boolean } = {};
    const isSubsetSumInternal = (sum: number, lastIdx: number): boolean => {
        if (sum === 0) return true;

        if (lastIdx < 0) return false; // we sum is not zero but we ran out numbers in set.

        // check if we have cached the result
        const key = `${sum}_${lastIdx}`;
        if (typeof map[key] === 'boolean') return map[key];
        /**
         * Check if we find a subset with last element present or removed
         * last element present: then sum will reduce by last element
         * last element absent: then sum will remain same
         */
        const withLastElPresent = (map[`${sum - set[lastIdx]}-${lastIdx - 1}`] =
            isSubsetSumInternal(sum - set[lastIdx], lastIdx - 1));
        const withLastElAbsent = (map[`${sum}-${lastIdx - 1}`] =
            isSubsetSumInternal(sum, lastIdx - 1));
        return withLastElPresent || withLastElAbsent;
    };

    return isSubsetSumInternal(sum, set.length - 1);
};

console.log(
    'Is there a subset with sum',
    [3, 34, 4, 12, 5, 2],
    9,
    isSubsetSum([3, 34, 4, 12, 5, 2], 9)
);

console.log(
    'Is there a subset with sum',
    [3, 34, 4, 12, 5, 2],
    30,
    isSubsetSum([3, 34, 4, 12, 5, 2], 30)
);
