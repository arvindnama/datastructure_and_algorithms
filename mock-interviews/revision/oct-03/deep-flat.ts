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
    const flattenObj = (obj: any, path: string, res: any) => {
        for (const prop in obj) {
            const val = obj[prop];
            const newPath = path ? `${path}.${prop}` : prop;
            if (typeof val === 'object') {
                //
                flattenObj(val, newPath, res);
            } else res[newPath] = obj[prop];
        }
    };

    const res = {};
    flattenObj(obj, '', res);
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
