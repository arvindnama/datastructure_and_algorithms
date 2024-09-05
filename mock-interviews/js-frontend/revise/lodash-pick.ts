/**
 * In this question, the candidate must replicate the functionality of _.pick from lodash.
 *
 * Syntax:
 * _.pick(object, [paths])
 *
 * object (Object): The source object.
 * [paths] (...(string|string[])): The property paths to pick.
 */

const pick = (obj: any, paths?: string | string[]): any => {
    if (!paths) return {};
    if (!Array.isArray(paths)) paths = [paths];

    const res: any = Array.isArray(obj) ? [] : {};

    for (const path of paths) {
        const keys = path.split('.');
        if (keys.length > 1 && typeof obj[keys[0]] === 'object') {
            if (Array.isArray(obj[keys[0]])) {
                res[keys[0]] = [
                    ...(res[keys[0]] || []),
                    ...pick(obj[keys[0]], keys.slice(1).join('.')),
                ];
            } else {
                res[keys[0]] = {
                    ...(res[keys[0]] || {}),
                    ...pick(obj[keys[0]], keys.slice(1).join('.')),
                };
            }
        } else res[path] = obj[path];
    }
    return res;
};

const object = { a: 1, b: '2', c: { d: 3, e: 4, f: [1] } };

console.log(object, ['a', 'c.d', 'c.f.o']);
console.log(pick(object, ['a', 'c.d', 'c.f.0']));
