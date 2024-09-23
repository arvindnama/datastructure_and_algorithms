function deepMerge(obj: any, src: any): any {
    /**
     * obj is array & src is array
     * obj is obj & src is obj
     *  for each key in src , deepMerge obj[key] && src[key]
     * obj is primitive & src is primitive -> return src
     *  for each index in src , deepMerge obj[i] && src[i]
     */

    if (Array.isArray(obj)) {
        obj = obj || [];
        if (Array.isArray(src)) {
            for (let i = 0; i < src.length; i++) {
                obj.push(src[i]);
            }
        } else obj.push(src);
        return obj;
    } else if (typeof obj === 'object' && typeof src === 'object') {
        obj = obj || {};
        const keys = Object.keys(src);
        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = deepMerge(obj[keys[i]], src[keys[i]]);
        }
        return obj;
    }

    return src;
}

console.log(deepMerge(1, 2));
console.log(deepMerge({ a: 1, c: 4 }, { a: 2, b: 3 }));
console.log(deepMerge({ a: { b: 1, c: 1 } }, { a: 2, b: 3 }));
console.log(deepMerge([1, 2, 3], [11, 22]));
console.log(deepMerge([1, 2, 3], { a: 1 }));
