/**
 * Deep merge 2 JS objects.
 */

const merge = (...objects: any[]): any => {
    /**
     * merge 2 objects and recurse by reducing the array
     */

    const mergeTwo = (src: any, target: any) => {
        for (const prop in src) {
            if (Array.isArray(src[prop])) {
                target[prop] = [...target[prop], ...src[prop]];
            } else if (typeof src[prop] === 'object') {
                // handle object
                if (!target[prop]) target[prop] = {};
                mergeTwo(src[prop], target[prop]);
            } else target[prop] = src[prop];
        }
    };

    if (objects.length === 1) return objects[0];
    // pick last 2 objs
    const [src, target] = [objects.pop(), objects.pop()];
    /// src --> target
    mergeTwo(src, target);

    return merge(...[...objects, target]);
};

const obj1 = {
    name: 'anama',
    age: 38,
    arrayTest: [1, 2, 4, 5],
    objTest: {
        a: 10,
        b: {
            c: 2,
        },
        c: {
            d: 1,
        },
    },
};

const obj2 = {
    qualification: 'BSC CS',
    loves: 'Javascript',
    arrayTest: [6, 7, 8],
    objTest: {
        a: 11,
        d: {
            e: 1,
        },
    },
};

const obj3 = {
    qualification: 'BSC CS 2',
    loves: 'typescript',
    arrayTest: [6, 7, 8],
    objTest: {
        a: 1,
        b: {
            c: 1,
        },
    },
};

console.log(merge(obj1, obj2, obj3));
