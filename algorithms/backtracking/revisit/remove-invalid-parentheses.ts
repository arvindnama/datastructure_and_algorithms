/**
 * An expression will be given which can contain open and close parentheses and optionally some characters, No other operator will be there in string. We need to remove minimum number of parentheses to make the input string valid. If more than one valid output are possible removing same number of parentheses then print all such output.
 */

const removeInvalid = (str: string): string[] => {
    const queue = [str];
    const visited: { [k in string]: boolean } = { [str]: true };

    const res: string[] = [];

    const isValid = (s: string): boolean => {
        const stack = [];
        for (let i = 0; i < s.length; i++) {
            if (!isParentheses(s[i])) continue;
            if (s[i] === '(') stack.push(s[i]);
            else if (!(s[i] === ')' && stack.pop() === '(')) return false;
        }
        return stack.length === 0;
    };

    const isParentheses = (c: string): boolean => c === '(' || c === ')';

    while (queue.length) {
        const s = queue.shift() as string;
        if (isValid(s)) {
            const firstEntry = res[0] || '';
            if (s.length >= firstEntry.length) res.push(s);
            continue;
        }

        for (let i = 0; i < s.length; i++) {
            if (!isParentheses(s[i])) continue;
            const t = `${s.slice(0, i)}${str.substring(i + 1)}`;
            if (!visited[t]) {
                visited[t] = true;
                queue.push(t);
            }
        }
    }
    return res;
};

const removeInvalid2 = (str: string): string[] => {
    const isValid = (s: string): boolean => {
        const stack = [];
        for (let i = 0; i < s.length; i++) {
            if (!isParentheses(s[i])) continue;
            if (s[i] === '(') stack.push(s[i]);
            else if (!(s[i] === ')' && stack.pop() === '(')) return false;
        }
        return stack.length === 0;
    };

    const isParentheses = (c: string): boolean => c === '(' || c === ')';

    const res: string[] = [];
    const visited: { [k in string]: boolean } = { [str]: true };

    const traverse = (s: string) => {
        if (isValid(s)) {
            res.push(s);
            return;
        }

        // if the string is not valid , remove one element at a time
        // and check for its validity
        for (let i = 0; i < s.length; i++) {
            if (!isParentheses(s[i])) continue;
            const nextStr = `${s.slice(0, i)}${s.substring(i + 1)}`;
            if (!visited[nextStr]) {
                visited[nextStr] = true;
                traverse(nextStr);
            }
        }
    };
    traverse(str);
    const sorted = res.sort((a, b) => b.length - a.length);
    return sorted.filter((a) => a.length === sorted[0]?.length);
};
console.log(removeInvalid('()())()'));
console.log(removeInvalid2('(v)())()'));
