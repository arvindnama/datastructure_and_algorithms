import { isJSONObj, JSONValue } from '../../../../models/leet-code.models';

function deepMerge(obj: JSONValue, src: JSONValue): JSONValue {
    if (Array.isArray(obj) && Array.isArray(src)) {
        let i = 0;
        for (; i < obj.length; i++) {
            if (!src[i]) break;
            obj[i] = deepMerge(obj[i], src[i]);
        }
        // incase src is bigger than obj
        for (; i < src.length; i++) {
            obj.push(src[i]);
        }
        return obj;
    } else if (isJSONObj(obj) && isJSONObj(src)) {
        const [objKeys, srcKeys] = [Object.keys(obj), Object.keys(src)];

        for (let i = 0; i < objKeys.length; i++) {
            if (!src[objKeys[i]]) break;
            obj[objKeys[i]] = deepMerge(obj[objKeys[i]], src[objKeys[i]]);
        }

        return srcKeys
            .filter((sk) => !objKeys.includes(sk))
            .reduce((acc, sk) => {
                acc[sk] = src[sk];
                return acc;
            }, obj);
    }
    return src;
}

console.log(deepMerge(1, 2));
console.log(deepMerge({ a: 1, c: 4 }, { a: 2, b: 3 }));
console.log(deepMerge({ a: { b: 1, c: 1 } }, { a: 2, b: 3 }));
console.log(deepMerge([1, 2, 3], [11, 22]));
console.log(deepMerge([1, 2, 3], { a: 1 }));
