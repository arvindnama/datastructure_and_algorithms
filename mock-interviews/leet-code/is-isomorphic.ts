/**
 * Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.
 */

function isIsomorphic(s: string, t: string): boolean {
    let randSeed = 'A'.charCodeAt(0);
    const generateRandom = () => String.fromCharCode(randSeed++);
    let [s1, t1] = ['', ''];
    const map: { [key in string]: string } = {};
    for (let i = 0; i < s.length; i++) {
        const rs = map[s[i]];
        const rt = map[t[i]];
        if (!rs && !rt) {
            // replace char not found for both , assign one to both
            const r = generateRandom();
            console.log(r);
            map[s[i]] = r;
            map[t[i]] = r;
        } else if (!rs) {
            map[s[i]] = rt;
        } else if (!rt) map[t[i]] = rs;
        s1 += `${map[s[i]]}`;
        t1 += `${map[t[i]]}`;
    }

    console.log(s, t);
    console.log(s1, t1);
    return s1 == t1;
}

console.log(isIsomorphic('add', 'egg'));
console.log(isIsomorphic('foo', 'bar'));
// console.log(isIsomorphic('paper', 'title'));

// console.log(isIsomorphic('bbbaaaba', 'aaabbbba'));
