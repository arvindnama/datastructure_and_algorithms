/**
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 *
 *
 * n == 2
 *
 *          (
 *       ((  ()
 *   (()    ()(
 * (())     ()()
 *
 */

function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    const generate = (op: number, cp: number, t: string) => {
        if (op === cp && op + cp === 2 * n) {
            res.push(t);
            return;
        }

        if (op < n) generate(op + 1, cp, t + '(');
        if (cp < op) generate(op, cp + 1, t + ')');
    };
    generate(0, 0, '');
    return res;
}

// console.log(generateParenthesis(1));
// console.log(generateParenthesis(2));
console.log(generateParenthesis(3));
