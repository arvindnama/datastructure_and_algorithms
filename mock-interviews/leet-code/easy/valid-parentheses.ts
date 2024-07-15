/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * An input string is valid if:
 * 1 Open brackets must be closed by the same type of brackets.
 * 2 Open brackets must be closed in the correct order.
 * 3 Every close bracket has a corresponding open bracket of the same type.
 */

function isValid(s: string): boolean {
    const parenthesisMap: { [key in string]: string } = {
        '(': ')',
        '[': ']',
        '{': '}',
    };
    const isClosing = (s: string): boolean =>
        s === ')' || s === ']' || s === '}';
    const stack: string[] = [s[0]];

    const match = (open: string, close: string): boolean =>
        parenthesisMap[open] === close;

    for (let i = 1; i < s.length; i++) {
        if (!isClosing(s[i])) {
            stack.push(s[i]);
        } else if (!match(stack.pop() as string, s[i])) return false; //
    }

    return stack.length === 0;
}

console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('((){})[(){}]'));
console.log(isValid('([)]'));
