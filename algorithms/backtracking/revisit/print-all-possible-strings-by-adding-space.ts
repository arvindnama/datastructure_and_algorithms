/**
 * Given a string you need to print all possible strings that can be made by placing spaces (zero or one) in between them.
 */

const printAllPossible = (str: string): string[] => {
    const res: string[] = [];
    const traverse = (str: string, idx: number) => {
        if (idx === 0) {
            res.push(str);
            return;
        }
        traverse(str, idx - 1); // dont insert space.
        str = `${str.slice(0, idx)} ${str.substring(idx)}`;
        traverse(str, idx - 1); // insert space.
    };
    traverse(str, str.length - 1);
    return res;
};

console.log(printAllPossible('ABC'));
