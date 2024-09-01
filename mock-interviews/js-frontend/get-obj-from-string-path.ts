/**
 * I  have found this question which was asked in the Amazon frontend interview, where we are given a nested object or an array of objects or arrays and a string path, we have to implement a function that will return the value at the given path.
 *
 * get([{ developer: "Tom" }, { count: [0, 1] }], "[1].count[0]"); // 0
 */

const get = (obj: any, path: string) => {
    /**
     * path can contain [] to access array element .
     *  we can safely convert all to `.` operations
     * i..e
     * [1].count[0] ==>  1.count.0
     */

    path = path.replaceAll('[', '.');
    path = path.replaceAll(']', '');

    const paths = path.split('.').slice(1);
    // first path will always be . heance we slice it

    const getInternal = (obj: any, paths: string[]): any => {
        if (paths.length === 0) return obj;
        const curPath = paths.shift() as string;
        const newObj = Array.isArray(obj) ? obj[+curPath] : obj[curPath];
        return getInternal(newObj, paths);
    };

    return getInternal(obj, paths);
};

console.log(get([{ developer: 'Tom' }, { count: [0, 1] }], '[1].count[0]'));
console.log(get([{ developer: 'Tom' }, { count: [0, 1] }], '[1].count'));
console.log(get([{ developer: 'Tom' }, { count: [0, 1] }], '[0].developer'));
console.log(
    get(
        [{ developer: { name: 'Tom' } }, { count: [0, 1] }],
        '[0].developer.name'
    )
);
