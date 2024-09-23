/***
 * Given an object or array obj, return a compact object.

A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.
 */

import { JSONValue } from '../../../../../models/leet-code.models';

type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
    /*
      1. obj is array
        for every index , if it is false do not push
      2. obj is object
      for every key , if it is false do not push
    */
    const compact = (obj: any): any => {
        if (Array.isArray(obj)) {
            const res = obj.reduce((res, cur) => {
                const item = compactObject(cur);
                if (item) {
                    res.push(item);
                }
                return res;
            }, []);
            if (res.length === 0) return null;
            return res;
        } else if (typeof obj === 'object') {
            if (!obj) return null;
            const res: any = {};
            for (const key in obj) {
                const item = compact(obj[key]);
                if (item) {
                    res[key] = item;
                }
            }
            return res;
        }
        return obj;
    };
    return compact(obj);
}

console.log(compactObject([null, 0, false, 1]));
console.log(compactObject({ a: null, b: [false, 1] }));
console.log(compactObject([null, 0, 5, [0], [false, 16]]));
