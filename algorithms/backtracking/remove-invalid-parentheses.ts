function removeInvalidParentheses(s: string): string[] {
    const result: string[] = [];

    const isParentheses = (chr: string): boolean => chr === '(' || chr === ')';

    const isValid = (str: string): boolean => {
        let ctr = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') {
                ctr++;
            } else if (str[i] === ')') {
                ctr--;
            }
            if (ctr < 0) return false;
        }
        return ctr === 0;
    };

    const queue: string[] = [s];
    const visited: { [key in string]: boolean } = { [s]: true };
    let lockLevel: boolean = false;
    while (queue.length) {
        const str = queue.shift() as string;
        if (isValid(str)) {
            result.push(str);
            // found a result at str.length level so we need to find solution
            // at this level alone, need not go further down.
            lockLevel = true;
        }
        if (lockLevel) continue;

        for (let i = 0; i < str.length; i++) {
            if (!isParentheses(str[i])) continue;
            const temp = str.substring(0, i) + str.substring(i + 1);
            if (!visited[temp]) {
                visited[temp] = true;
                queue.push(temp);
            }
        }
    }
    return result;
}

let str = '()())()';
console.log('remove Invalid parenthesis', str, removeInvalidParentheses(str));

str = '()v)';
console.log('remove Invalid parenthesis', str, removeInvalidParentheses(str));
