/**
 * Deep merge 2 JS objects.
 */

const merge = (...objects: any[]): any => {
    const mergeIntoTarget = (target: any, obj: any) => {
        for (const prop in obj) {
            if (Array.isArray(obj[prop])) {
                target[prop] = [...(target[prop] ?? []), ...obj[prop]];
            } else if (typeof obj[prop] === 'object') {
                target[prop] = merge(target[prop] ?? {}, obj[prop]);
            } else {
                target[prop] = obj[prop];
            }
        }
    };

    if (objects.length === 1) {
        return objects[0];
    }

    for (let i = objects.length - 1; i > 0; i--) {
        const obj = objects[i];
        const target = objects[i - 1];
        mergeIntoTarget(target, obj);
    }

    return objects[0];
};

const obj1 = {
    name: 'anama',
    age: 38,
    arrayTest: [1, 2, 4, 5],
    objTest: {
        a: 10,
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
console.log(obj1);
console.log(obj2);
