/**
 * You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.
 */

function takeCharacters(s: string, k: number): number {
    /**
     * every min(step) we can either move either left or right
     * we need to find the minimum step to by moving left or right to meet k rule.
     *
     * if i move from one of the sides and stop when kth rule is met we have one solution
     * i.e move right pointer from rightmost to left and stop at a pos where kth rule is met
     * the n - right pointer is no. of step to move to satisfy the kth rule (but this is not the best solution)
     *
     * with min (worst case) available,
     * if i can figure out how many steps i can move from left side and while i move i also
     * move the right pointer while satisfying the kth rule , I will have another solution.
     * and we need to continue this until left crossers right pointer
     * and the min of all solutions so far we will get out best min
     *
     *         aabaaaacaabc
     *        l            r  a=0,b=0,c=0
     *        l           r   a=0,b=0,c=1
     *        l        r      a=2,b=1,c=1
     *        l       r       a=2,b=1,c=2
     *        l   r           a=6,b=1,c=2
     *        l  r            a=6,b=2,c=2 kth rule met , stop sol-1 = n - r
     *         l r            a=9,b=2,c=2
     *          lr            a=10,b=2,c=2
     *           lr           a=10,b=2,c=2 s-2
     *           l    r       a=8,b=2,c=2  s-3,4,5,6
     *            l   r       a=9,b=2,c=2  s-3,4,5,6
     *             l  r       a=10,b=2,c=2  s-3,4,5,6
     *
     *       l > r or l > n then min of all s
     */

    if (k == 0) return 0;
    const map: { [k in string]: number } = {
        a: 0,
        b: 0,
        c: 0,
    };
    const n = s.length;
    let [l, r] = [0, n - 1];

    for (; r >= 0; r--) {
        map[s[r]]++;

        if (map.a >= k && map.b >= k && map.c >= k) {
            break; // found a worst case solution
        }
    }

    if (r < 0) return -1;
    let min = n - r;

    for (; l < n; l++) {
        map[s[l]]++;
        // can i move my r ptr and not break solution
        for (; r < n; r++) {
            if (map[s[r]] === k) {
                // I cannot move as by moving any more as k rule
                break;
            }
            map[s[r]]--;
            if (map.a >= k && map.b >= k && map.c >= k) {
                min = Math.min(min, l + n - r);
            }
        }
    }
    return min;
}

console.log(takeCharacters('aabaaaacaabc', 2));
console.log(takeCharacters('a', 1));
console.log(takeCharacters('abcaa', 1));
