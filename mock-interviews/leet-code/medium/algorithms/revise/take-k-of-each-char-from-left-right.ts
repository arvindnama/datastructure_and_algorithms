/**
 * You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.
 */

function takeCharacters(s: string, k: number): number {
    /**
     * we can either take a char from left side or from a right side.
     * we need to find min time to remove k chars of a,b&c.
     *
     * one way to find no. of mins to remove a k chars of abc is
     * we start from either left-right or right-left and as we encounter a,bc,
     * we can increment the counter , once we satisfy all k chars property
     * that mean we might have `a` solution (not the best)
     * or we might reach the end (or the begining) without satisfying the k char properties
     * if so we can exit with -1
     *
     * now to find the best solution
     *
     * we can start from other end (left-right) and pick a char and try giving up
     * a char that was already picked on the other end.
     *  i.e by giving up k poperty should remain in tack , if so continue giving up
     * until the k property starts to break .
     * if not ignore and repeat the same by pick anotehr one from left-right.
     *
     * each time we pick * k property is satisfied we need to keep track of the min minutes
     * spend and update them accordingly
     *
     *      aabaaaacaabc    k = 2
     *     l            r , ka=0,kb=0,kc=0
     *     l           r  ,  ka=0,kb=0,kc=1
     *     l          r   ,  ka=0,kb=1,kc=1
     *     l         r    ,  ka=1,kb=1,kc=1
     *     l        r     ,  ka=2,kb=1,kc=1
     *     l       r      ,  ka=2,kb=1,kc=2
     *     l   r          ,  ka=6,kb=1,kc=2
     *     l  r           ,  ka=6,kb=2,kc=2 --> we have `a` solution minus = n - right
     *      l r           ,  ka=7,kb=2,kc=2  --> cannot move right cos b will break
     *       lr           ,  ka=8,kb=2,kc=2  --> cannot move right cos b will break
     *        lr          ,  ka=8,kb=3,kc=2  --> can move right cos kb  = 3 and giving up 2
     *        l r         ,  ka=8,kb=2,kc=2
     *        l    r      ,  ka=6,kb=2,kc=2 --> one n - right + left (12 - 6 + 2 = 8)
     */

    if (k === 0) return 0; // nothing to remove no time spent
    let min = Number.MAX_VALUE;
    const map: { [k in string]: number } = {
        a: 0,
        b: 0,
        c: 0,
    };

    const n = s.length;
    let right = n - 1;
    for (; right >= 0; right--) {
        map[s[right]]++; // taking char

        if (map.a >= k && map.b >= k && map.c >= k) {
            // a solution found.
            min = n - right;
            break;
        }
    }

    if (min === Number.MAX_VALUE) {
        // no solution exists
        return -1;
    }
    // trying moving from left to right and see if we can give up few on right for a better sol
    let left = 0;
    for (; left < n; left++) {
        map[s[left]]++;

        // try giving up right
        for (; right < n; right++) {
            if (map[s[right]] === k) {
                // this mean, we are on the edge by giving up we break the k property
                break;
            }
            // no we don't break the k property continue giving up right;
            map[s[right]]--;
            if (map.a >= k && map.b >= k && map.c >= k) {
                // update min
                min = Math.min(min, n - right + left);
            }
        }
    }

    return min;
}

console.log(takeCharacters('aabaaaacaabc', 2));
console.log(takeCharacters('a', 1));
console.log(takeCharacters('abcaa', 1));
