/**
 * You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
 */

const solution = function (isBadVersion: (v: number) => boolean) {
    const getBad = (s: number, e: number): number => {
        const m = Math.floor((s + e) / 2);
        const [sR, mR] = [isBadVersion(s), isBadVersion(m)];

        if (sR) return s;
        if (!sR && mR) return getBad(s + 1, m);
        return getBad(m + 1, e);
    };
    return function (n: number): number {
        return getBad(1, n);
    };
};

console.log(solution((v) => v === 4)(5));
console.log(solution((v) => v === 1)(1));
console.log(solution((v) => v === 2)(2));
console.log(solution((v) => v === 10)(10));
console.log(solution((v) => v === 5)(10));
