/**
 * You are given a string s and a character c. Return the total number of
substrings
 of s that start and end with c.
 */

function countSubstrings(s: string, c: string): number {
    /**
     * str: xyz
     * cnt: 0
     * str: xyza
     * cnt: 1 (a)
     * str: xyzaa
     * cnt: 1+2 ( a, a ,aa)
     * str: xyzaaa
     * cnt: 1+2+3 ( a, a ,a, aaa,aa,aa)
     *
     * This follow a prefix sum pattern.
     *
     * 1st find the no. of occurrences of  c in s == count.
     *
     * for total no. of substring
     *  1 + 2 + 3 + ...count => Prefix sum
     */

    let [count, subs] = [0, 0];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === c) count++;
    }

    for (let i = 1; i <= count; i++) {
        subs += i;
    }

    return subs;
}

console.log(countSubstrings('abada', 'a'));
console.log(countSubstrings('zzz', 'z'));
