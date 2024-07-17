/**
 * Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).


 */

function isSubsequence(s: string, t: string): boolean {
    // let [i, j] = [0, 0];
    // while (j < t.length) {
    //     if (s[i] === t[j]) {
    //         i++;
    //     }
    //     j++;
    // }

    // return i === s.length;

    if (s === '') return true;
    if (t === '') return false;
    const map: { [k in string]: Array<number> } = {};
    for (let i = 0; i < t.length; i++) {
        map[t[i]] = map[t[i]] || [];
        map[t[i]].push(i);
    }

    const arr: Array<number[]> = [];
    for (let i = s.length - 1; i >= 0; i--) {
        if (!map[s[i]]) return false;
        arr.push(map[s[i]]);
    }

    const check = (arr: Array<number[]>, idx: number, num: number): boolean => {
        if (idx === arr.length) return true;

        for (let i = arr[idx].length - 1; i >= 0; i--) {
            if (arr[idx][i] < num && check(arr, idx + 1, arr[idx][i]))
                return true;
        }
        return false;
    };
    return arr[0].reverse().some((num) => check(arr, 1, num));
}

console.log(isSubsequence('', 'ahbgdc'));
console.log(isSubsequence('abc', 'ahbgdc'));
console.log(isSubsequence('axc', 'ahbgdc'));
console.log(
    isSubsequence(
        'rjufvjafbxnbgriwgokdgqdqewn',
        'mjmqqjrmzkvhxlyruonekhhofpzzslupzojfuoztvzmmqvmlhgqxehojfowtrinbatjujaxekbcydldglkbxsqbbnrkhfdnpfbuaktupfftiljwpgglkjqunvithzlzpgikixqeuimmtbiskemplcvljqgvlzvnqxgedxqnznddkiujwhdefziydtquoudzxstpjjitmiimbjfgfjikkjycwgnpdxpeppsturjwkgnifinccvqzwlbmgpdaodzptyrjjkbqmgdrftfbwgimsmjpknuqtijrsnwvtytqqvookinzmkkkrkgwafohflvuedssukjgipgmypakhlckvizmqvycvbxhlljzejcaijqnfgobuhuiahtmxfzoplmmjfxtggwwxliplntkfuxjcnzcqsaagahbbneugiocexcfpszzomumfqpaiydssmihdoewahoswhlnpctjmkyufsvjlrflfiktndubnymenlmpyrhjxfdcq'
    )
);
