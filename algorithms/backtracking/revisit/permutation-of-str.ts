/**
 * Given a string S, the task is to write a program to print all permutations of a given string.
 */

const permutationOfStr = (str: string): string[] => {
    const res: string[] = [];

    const traverse = (s: string, visited: { [k in string]: boolean }) => {
        if (s.length === str.length) {
            res.push(s);
            return;
        }

        for (let i = 0; i < str.length; i++) {
            if (!visited[str[i]]) {
                visited[str[i]] = true;
                traverse(`${s}${str[i]}`, visited);
                visited[str[i]] = false;
            }
        }
    };

    for (let i = 0; i < str.length; i++) {
        const visited: { [k in string]: boolean } = { [str[i]]: true };
        traverse(str[i], visited);
    }

    return res;
};

console.log(permutationOfStr('ABC'));
console.log(permutationOfStr('XY'));
console.log(permutationOfStr('XYZA'));
