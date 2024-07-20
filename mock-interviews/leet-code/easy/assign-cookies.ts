/**
 * Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.
 */

function findContentChildren(g: number[], s: number[]): number {
    g.sort((a, b) => b - a);
    s.sort((a, b) => b - a);

    let assignedCookies = 0;
    let [cIdx, kIdx] = [0, 0];

    while (kIdx < g.length && cIdx < s.length) {
        if (s[cIdx] >= g[kIdx]) {
            // current cookies satisfies this kid
            assignedCookies++;
            kIdx++;
            cIdx++;
        } else {
            // kid cannot be satisfied.
            // move to next kid
            kIdx++;
        }
    }

    return assignedCookies;
}

console.log(findContentChildren([1, 2, 3], [1, 1]));
console.log(findContentChildren([1, 2], [1, 2, 3]));
console.log(findContentChildren([4, 1, 3, 2], [4, 1, 2, 3]));
