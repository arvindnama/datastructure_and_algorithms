/**
 * Given a set of non-negative integers and a value sum, the task is to check if there is a subset of the given set whose sum is equal to the given sum.
 * https://www.geeksforgeeks.org/subset-sum-problem-dp-25/?ref=lbp
 */

function subsetSum(set: number[], sum: number): boolean {
    const map: { [k in string]: boolean } = {};
    const check = (idx: number, sum: number): boolean => {
        const key = `${idx}_${sum}`;
        if (sum === 0) return true;
        if (sum < 0 || idx >= set.length) return false;
        if (typeof map[key] === 'boolean') return map[key];
        return (map[key] =
            check(idx + 1, sum - set[idx]) || check(idx + 1, sum));
    };

    return check(0, sum);
}

console.log(subsetSum([3, 34, 4, 12, 5, 2], 9));
console.log(subsetSum([3, 34, 4, 12, 5, 2], 30));
