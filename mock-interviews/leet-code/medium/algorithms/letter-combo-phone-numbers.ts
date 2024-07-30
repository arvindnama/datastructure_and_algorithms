/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
 */

function letterCombinations(digits: string): string[] {
    const map: { [k in string]: string[] } = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
    };
    const getLetterCombo = (a: string[], b: string[]): string[] => {
        if (!a.length && !b.length) return [];
        if (!a.length) return b;
        if (!b.length) return a;
        const res = [];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                res.push(`${a[i]}${b[j]}`);
            }
        }
        return res;
    };
    const combos = [];
    for (let i = 0; i < digits.length; i += 2) {
        const [c1, c2] = [map[digits[i]] ?? [], map[digits[i + 1]] ?? []];
        combos.push(getLetterCombo(c1, c2));
    }
    return combos.reduce((acc, cur) => {
        return getLetterCombo(acc, cur);
    }, []);
}

console.log(letterCombinations('23'));
console.log(letterCombinations('2345'));
