const deepEqual = (obj1: any, obj2: any): boolean => {
    const isObj = (obj: any) => typeof obj === 'object';
    /*
      Check for mismatch of types
     */
    if (!obj1 && obj2) return false;
    if (obj1 && !obj2) return false;

    if (Array.isArray(obj1) && !Array.isArray(obj2)) return false;
    if (Array.isArray(obj2) && !Array.isArray(obj1)) return false;

    if (isObj(obj1) && !isObj(obj2)) return false;
    if (isObj(obj2) && !isObj(obj1)) return false;

    /*
       Now we need 3 conditions , if both are : array or object or primitive
     */

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        for (let i = 0; i < obj1.length; i++) {
            const res = deepEqual(obj1[i], obj2[i]);
            if (!res) return false;
        }
        return true;
    } else if (isObj(obj1) && isObj(obj2)) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

        const keys = Object.keys(obj1);
        for (let i = 0; i < keys.length; i++) {
            const res = deepEqual(obj1[keys[i]], obj2[keys[i]]);
            if (!res) return false;
        }
        return true;
    }
    // they are primitive just compare
    return obj1 === obj2;
};

console.log(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } }));
console.log(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }));
console.log(
    deepEqual([{ a: { b: { c: 1 } } }, 10], [{ a: { b: { c: 1 } } }, 10])
);
