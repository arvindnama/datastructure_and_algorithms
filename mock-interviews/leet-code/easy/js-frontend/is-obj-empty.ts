import { JSONValue } from '../../../../models/leet-code.models';

type Obj = Record<string, JSONValue> | JSONValue[];

function isEmpty(obj: Obj): boolean {
    if (Array.isArray(obj)) return obj.length === 0;
    return Object.keys(obj).length === 0;
}

console.log(isEmpty({}));
console.log(isEmpty([]));
