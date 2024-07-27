const deepEqual = (obj1: any, obj2: any): boolean => {
    if (!obj1 && !obj2) return true;
    if (!obj1 && obj2) return false;
    if (obj1 && !obj2) return false;

    if (Array.isArray(obj1) && !Array.isArray(obj2)) return false;
    if (!Array.isArray(obj1) && Array.isArray(obj2)) return false;
    if (typeof obj1 === 'object' && typeof obj2 !== 'object') return false;
    if (typeof obj1 !== 'object' && typeof obj2 === 'object') return false;

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        return obj1.every((o, idx) => deepEqual(o, obj2[idx]));
    } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        const keys1 = Object.keys(obj1 as object);
        const keys2 = Object.keys(obj2 as object);

        if (keys1.length !== keys2.length) return false;
        if (!keys1.every((k) => (obj2 as object).hasOwnProperty(k)))
            return false;
        return keys1.every((k) => deepEqual(obj1[k], obj2[k]));
    }
    return obj1 === obj2;
};

console.log(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } }));
console.log(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }));
console.log(deepEqual([{ a: { b: { c: 1 } } }], [{ a: { b: { c: 1 } } }]));
