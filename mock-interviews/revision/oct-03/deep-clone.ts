/**
 * In general, cloning means copying one value to another. A deep clone makes a copy of
 * JavaScript value, leading to a completely new value that has no references pointing
 * back to the properties in the original object (if it's an object). Any changes made to
 * the deep-copied object will not affect the original object.
 *
 * Assumption :
 *
 * Input object only contains JSON-serializable values, i.e. null, boolean, number,
 * string, and will not contain any other built-in objects such as Date, Regex, Map or Set.
 */

const cloneDeep = (obj: any): any => {
    const res: any = {};
    for (const prop in obj) {
        const val = obj[prop];
        if (Array.isArray(val)) {
            res[prop] = val.map((v) => cloneDeep(v));
        } else if (typeof val === 'object') {
            // handle object
            res[prop] = cloneDeep(val);
        } else res[prop] = obj[prop];
    }
    return res;
};

const original = {
    name: 'Devtools Tech',
    details: {
        link: 'youtube.com/devtoolstech',
        subs: 3500,
        tags: [{ id: 1, value: 'devtoolstech' }],
    },
};

// deep cloning the original object
const cloned = cloneDeep(original);

// updating the values
cloned.name = 'Tech Devtools';
cloned.details.tags[0].value = 'frontend';

console.assert(
    original.name !== cloned.name,
    `origin: ${original.name} !== ${cloned.name}`
);

console.assert(
    original.details.tags[0].value !== cloned.details.tags[0].value,
    `origin: ${original.name} !== ${cloned.name}`
);

console.log('All tests passed');
