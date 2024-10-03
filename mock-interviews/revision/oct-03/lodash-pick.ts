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
    if(!obj) return {};
    if(!Array.isArray(path)) path = [path || ''];

   return path.reduce((res, cur) => {
        const props = cur.split('.');

        if(props.length > 1 && typeof obj[props[0]] === 'object') {
            const tempRes  = pick(
                obj[props[0]] as Record<string,unknown>,
                props.slice(1)
            );
            res[props[0]] = {
                ...res[props[0]] as Record<string,unknown>,
                ...tempRes,
            }
        }else res[props[0]] = obj[props[0]]

        return res;
   }, {} as Record<string,unknown>)
};

const object = { a: 1, b: '2', c: { d: 3, e: {f:10} } };

console.log(object, ['a', 'c.d']);
console.log(pick(object, ['a', 'c.d', 'c.d.e.f']));
