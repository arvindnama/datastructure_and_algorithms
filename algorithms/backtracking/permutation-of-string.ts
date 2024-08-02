function permutationOfString(str: string): Set<string> {
    const n = str.length;

    const swap = (s: string, x: number, y: number): string => {
        const strArray = s.split('');
        [strArray[x], strArray[y]] = [strArray[y], strArray[x]];
        return strArray.join('');
    };

    const permutations: Set<string> = new Set();
    const permute = (s: string, left: number) => {
        if (left === n - 1) {
            permutations.add(s);
            return;
        }

        for (let i = left; i < n; i++) {
            s = swap(s, left, i);
            permute(s, left + 1);
            s = swap(s, left, i);
        }
    };
    permute(str, 0);
    return permutations;
}

console.log('ABC: permutations', permutationOfString('ABC'));
console.log('XY: permutations', permutationOfString('XY'));
