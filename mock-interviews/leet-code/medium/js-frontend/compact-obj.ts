/***
 * Given an object or array obj, return a compact object.

A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.
 */

type JSONValue =
    | null
    | boolean
    | number
    | string
    | JSONValue[]
    | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
    const compact = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.reduce((acc, cur) => {
                const res = compact(cur);
                if (res) {
                    acc.push(res);
                }
                return acc;
            }, []);
        } else if (typeof obj === 'object') {
            if (!obj) return;
            const comp: any = {};
            const keys = Object.keys(obj);
            keys.forEach((k) => {
                const res = compact(obj[k]);
                if (res) comp[k] = res;
            });
            return comp;
        }
        return obj;
    };
    return compact(obj);
}

console.log(compactObject([null, 0, false, 1]));
console.log(compactObject({ a: null, b: [false, 1] }));
console.log(compactObject([null, 0, 5, [0], [false, 16]]));
