/**
 * Given a two strings S and T,
 * find the count of distinct occurrences of T in S as a subsequence
 *
 *
 *  if T is of length 0, then there is 1 subsequence , empty str is sub seq for any str
 *  if S is of length 0, then there is no subsequence.
 *
 * if s[0] !== t[0] then strip s[0] & recurse
 * if s[0] === t[0] then there are 2 possibilities
 *    1. there is a subsequence with s[0] included &
 *     2. there is a subsequence without s[0]
 *    count both (addthem)
 */

const countDistinctSubSeq = (s: string, t: string): number => {
    if (s.length === 0) return 0;
    if (t.length === 0) return 1;

    if (s[0] !== t[0]) return countDistinctSubSeq(s.substring(1), t);

    return (
        countDistinctSubSeq(s.substring(1), t) +
        countDistinctSubSeq(s.substring(1), t.substring(1))
    );
};

let [s, t] = ['banana', 'ban'];
console.log('Count No. of distinct sub seq', s, t, countDistinctSubSeq(s, t));

[s, t] = ['geeksforgeeks', 'ge'];
console.log('Count No. of distinct sub seq', s, t, countDistinctSubSeq(s, t));
