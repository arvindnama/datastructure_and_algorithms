/**
 * Given a string s consisting of words and spaces, return the length of the last word in the string.
 * A word is a maximal substring consisting of non-space characters only.
 */

function lengthOfLastWord(s: string): number {
    const getLastIdxOfLastWord = (): number => {
        let i = s.length - 1;
        while (s[i] === ' ') {
            i--;
        }
        return i;
    };

    let idx = getLastIdxOfLastWord();

    if (idx < 0) return 0;
    if (idx == 0) return 1; // there is a letter at 0th idx , hence 1

    let len = 0;
    while (s[idx] !== ' ' && idx >= 0) {
        len++;
        idx--;
    }
    return len;
}

console.log(lengthOfLastWord('Hello World'));
console.log(lengthOfLastWord('   fly me   to   the moon  '));
console.log(lengthOfLastWord('luffy is still joyboy '));
console.log(lengthOfLastWord('a'));
console.log(lengthOfLastWord('      '));
console.log(lengthOfLastWord('day'));
