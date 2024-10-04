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
    if (!obj) return obj;
    if (!path) return obj;
    if (!Array.isArray(path)) path = [path];

    return path.reduce(
        (res, curPath) => {
            const subPaths = curPath.split('.');

            if (subPaths.length === 1) {
                if (obj[subPaths[0]] !== undefined) {
                    res[subPaths[0]] = obj[subPaths[0]];
                }
            } else {
                const temp = pick(
                    obj[subPaths[0]] as Record<string, unknown>,
                    subPaths.slice(1).join('.')
                );
                if (temp !== undefined) {
                    res[subPaths[0]] = {
                        ...(res[subPaths[0]] as Record<string, unknown>),
                        ...temp,
                    };
                }
            }
            return res;
        },
        {} as Record<string, unknown>
    );
};

const object = { a: 1, b: '2', c: { h: 1, d: 3, e: { f: 10, g: 11 } } };

// console.log(object, ['a', 'c.d']);
console.log(pick(object, ['a', 'c.d', 'c.h', 'c.e.g']));
