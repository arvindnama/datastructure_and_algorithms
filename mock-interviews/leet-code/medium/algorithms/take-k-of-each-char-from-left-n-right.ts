/**
 * You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.
 */

function takeCharacters(s: string, k: number): number {
    /**
     * 2 pointer & map approach,
     * first pick a side (right to left)
     * travel up to an index such that all k chars are picked.
     *        - either we will reach a index r > 0 (where are ks are picked)
     *        - or n === 0 where we dont have enough chars to pick (return -1)
     * travel from other side (left to right)
     *      for each char on left side , see if we can move R and picked chars count still > k , if some continue moving r.
     * we need to do this until we reach end
     * on every char traversal , if k char are met we need to update min count.
     *
     *
     *  aabaaaacaabc, k=2
     * l            r   ka=0, kb=0, kc=0
     * l           r    ka=0, kb=1, kc=1
     * l         r      ka=1, kb=1, kc=1
     * l        r       ka=2, kb=1, kc=1
     * l   r            ka=6, kb=1, kc=2
     * l  r             ka=6, kb=2, kc=2
     * Now start moving l --> r
     *  l r             ka=7, kb=2, kc=2   --> if moving R we will break pick k so stop
     *   lr             ka=8, kb=2, kc=2   --> if moving R we will break pick k so stop
     *    lr            ka=8, kb=2, kc=2   --> moving R to right will not break k
     *    l   r         ka=5, kb=2, kc=2   --> moving R to right will not break k
     *    l    r        ka=5, kb=2, kc=2   --> moving R to right will break k hence stop
     *
     *
     * we will continue left to right
     * above is the best solution which is store in min.
     */

    if (k == 0) return 0;
    const map: { [k in string]: number } = {
        a: 0,
        b: 0,
        c: 0,
    };

    const n = s.length;
    let [left, right] = [0, n - 1, s.length];
    let min = Number.MAX_VALUE;

    for (; right >= 0; right--) {
        map[s[right]]++;

        if (map.a >= k && map.b >= k && map.c >= k) {
            min = n - right;
            // from right --> left we found a index where all chars are picked
            break;
        }
    }
    if (min === Number.MAX_VALUE) {
        // we never found `a` solution
        return -1;
    }

    // not navigate from left, and see if we can move Right pointer to right & still
    // keep the k count satisfied.

    for (; left < n; left++) {
        map[s[left]]++;

        for (; right < n; right++) {
            if (map[s[right]] <= k) {
                break; // by moving right by one we will not satisfy k property of s[right]
            }
            map[s[right]]--;
            if (map.a >= k && map.b >= k && map.c >= k) {
                min = Math.min(min, n - right + left);
            }
        }
    }
    return min;
}

console.log(takeCharacters('aabaaaacaabc', 2));
console.log(takeCharacters('a', 0));
console.log(takeCharacters('bcca', 1));
