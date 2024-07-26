/**
 * Given a string s, return the number of segments in the string.

A segment is defined to be a contiguous sequence of non-space characters.
 */

function countSegments(s: string): number {
    if (s.length === 0) return 0;
    let segments = s[0] === ' ' ? 0 : 1;
    for (let i = 1; i < s.length - 1; i++) {
        if (s[i] === ' ') {
            if (s[i + 1] !== ' ') segments++;
        } else if (segments === 0) segments++;
    }
    return segments;
}

console.log(countSegments('Hello, my name is John'));
console.log(countSegments('Hello'));
console.log(countSegments('   Hello    my name    is John   '));
console.log(countSegments('     '));
console.log(countSegments(' 123'));
console.log(
    countSegments('Of all the gin joints in all the towns in all the world,   ')
);
