/**
 *
 * Write a function to validation parenthesis string
 */

function validate(str: string): boolean {
    const stack: string[] = [];

    const OpenToClose: { [k in string]: string } = {
        '(': ')',
        '[': ']',
        '{': '}',
    };
    const isOpen = (c: string) => ['{', '(', '['].includes(c);
    const isClose = (c: string) => !isOpen(c);
    const isMatchingOpen = (o: string, c: string) => OpenToClose[o] === c;

    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (isClose(c)) {
            const top = stack.pop() as string;
            if (!isMatchingOpen(top, c)) {
                return false;
            }
            continue;
        }
        stack.push(c);
    }
    return stack.length === 0;
}

console.log(validate('(){}[]'));
console.log(validate('({[]})'));
console.log(validate('({]})'));
