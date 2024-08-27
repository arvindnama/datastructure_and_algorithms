/**
 * You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
 */

const solution = function (isBadVersion: (v: number) => boolean) {
    const findFirstBadVersion = (s: number, e: number): number => {
        if (s > e) return -1;
        if (s === e) return s;
        const m = Math.floor((s + e) / 2);
        return isBadVersion(m)
            ? findFirstBadVersion(s, m)
            : findFirstBadVersion(m + 1, e);
    };
    return (n: number): number => findFirstBadVersion(1, n);
};

console.log(solution((v) => v >= 4)(5));
console.log(solution((v) => v >= 1)(1));
console.log(solution((v) => v >= 2)(2));
console.log(solution((v) => v >= 10)(10));
console.log(solution((v) => v >= 2)(7));
