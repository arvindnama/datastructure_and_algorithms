/**
 * Given an nested object which can have any type of object, deep flatten it and return the new object in Javascript
 *
 Input:
{
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
       L: 56
    },
    Q: [1, 2]
   }
}

Output:
{
  "A": "12"
  "B": 23,
  "C.O.L": 56,
  "C.P": 23,
  "C.Q.0": 1,
  "C.Q.1": 2,
}
 */

const deepFlat = (obj: any): Record<string, number | string> => {
    const flatInternal = (
        obj: any,
        res: Record<string, number | string>,
        path: string
    ) => {
        if (Array.isArray(obj)) {
            obj.forEach((item, idx) => {
                const subPath = path ? `${path}.${idx}` : `${idx}`;
                flatInternal(item, res, subPath);
            });
        } else if (typeof obj === 'object') {
            const keys = Object.keys(obj);
            for (const key of keys) {
                const subPath = path ? `${path}.${key}` : key;
                flatInternal(obj[key], res, subPath);
            }
        } else {
            res[path] = obj;
        }
    };
    const res = {};
    flatInternal(obj, res, '');
    return res;
};

console.log(
    deepFlat({
        A: '12',
        B: 23,
        C: {
            P: 23,
            O: {
                L: 56,
            },
            Q: [1, 2],
        },
    })
);

console.log(deepFlat([12, 11]));
console.log(deepFlat({ a: '1', b: '2' }));
