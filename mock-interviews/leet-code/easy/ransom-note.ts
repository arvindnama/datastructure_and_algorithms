/**
 * Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.
 */

function canConstruct(ransomNote: string, magazine: string): boolean {
    const mapRn: { [k in string]: number } = {};
    const mapMg: { [k in string]: number } = {};

    const populateMap = (str: string, map: { [k in string]: number }) => {
        for (let i = 0; i < str.length; i++) {
            map[str[i]] = map[str[i]] || 0;
            map[str[i]]++;
        }
    };

    populateMap(ransomNote, mapRn);
    populateMap(magazine, mapMg);

    return Object.keys(mapRn).every((l) => mapRn[l] <= mapMg[l]);
}

console.log(canConstruct('a', 'b'));
console.log(canConstruct('aa', 'ab'));
console.log(canConstruct('aa', 'aab'));
console.log(canConstruct('abacdefa', 'aaabcdef'));
