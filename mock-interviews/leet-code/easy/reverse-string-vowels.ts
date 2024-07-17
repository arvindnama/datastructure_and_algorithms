/**
 * Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.
 */

function reverseVowels(s: string): string {
    const arr = s.split('');

    let [start, end] = [0, arr.length - 1];

    const isVowel = (s: string) => 'aeiouAEIOU'.includes(s);
    while (start < end) {
        const [isStartV, isEndV] = [isVowel(arr[start]), isVowel(arr[end])];
        if (isStartV && isEndV) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        } else if (!isStartV && !isEndV) {
            start++;
            end--;
        } else if (isStartV && !isEndV) {
            end--;
        } else {
            start++;
        }
    }
    return arr.join('');
}

console.log(reverseVowels('hello'));
console.log(reverseVowels('leetcode'));
