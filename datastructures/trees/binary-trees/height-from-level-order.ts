/**
 * Given level order of a binary tree, calculate its depth(or height) [starting from depth 0]. The level order is given as a string with two possible characters.
 */

type Node<T> = { val: T; level: number };

function height<T>(input: Array<T>) {
    let level = 0;
    const queue: Node<T>[] = [{ val: input.shift() as T, level: 0 }];

    while (input.length) {
        const nxtVal1 = input.shift();
        const nxtVal2 = input.shift();
        const node = queue.shift() as Node<T>;
        if (nxtVal1 || nxtVal2) {
            const nxtLevel = (node.level as number) + 1;
            if (nxtVal1) queue.push({ val: nxtVal1, level: nxtLevel });
            if (nxtVal2) queue.push({ val: nxtVal2, level: nxtLevel });
            level = Math.max(level, nxtLevel);
        }
    }
    return level;
}

console.log('Depth from level-order list', height(['n', 'l', 'n', 'l', 'l']));
