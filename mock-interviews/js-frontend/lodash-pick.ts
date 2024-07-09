/**
 * In this question, the candidate must replicate the functionality of _.pick from lodash.
 *
 * Syntax:
 * _.pick(object, [paths])
 *
 * object (Object): The source object.
 * [paths] (...(string|string[])): The property paths to pick.
 */

const pick = (
    obj: Record<string, unknown>,
    path?: string | string[]
): Record<string, unknown> => {
    if (!path || path.length == 0) return obj;

    if (!Array.isArray(path)) {
        path = [path];
    }
    return path.reduce(
        (acc, cur) => {
            const subPaths = cur.split('.');
            if (subPaths.length > 1 && typeof obj[subPaths[0]] === 'object') {
                acc[subPaths[0]] = pick(
                    obj[subPaths[0]] as Record<string, unknown>,
                    subPaths.slice(1)
                );
            } else acc[cur] = obj[cur];
            return acc;
        },
        {} as Record<string, unknown>
    );
};

const object = { a: 1, b: '2', c: { d: 3, e: 4 } };

console.log(object, ['a', 'c.d']);
console.log(pick(object, ['a', 'c.d']));
