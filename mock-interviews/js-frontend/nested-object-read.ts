/**
 *
In this question, you need to implement a function read that takes two parameters:

read(collection, property)

collection: The top level parent object in which we need to find the field.
property: The path of the field we need to find/read.
Expected Output: field value if field exists else undefined.

const collection = {
  a: {
    b: {
      c: {
        d: {
          e: 2
        }
      }
    }
  }
}

// should return 2
read(collection, 'a.b.c.d.e');

// should return undefined
read(collection, 'a.b.c.f');

 */

type PropertyValue = undefined | string | number | Record<string, unknown>;

function read(
    collection: Record<string, unknown>,
    property: string
): PropertyValue {
    const readRec = (
        collection: Record<string, unknown>,
        properties: string[]
    ): PropertyValue => {
        if (!collection) return undefined;

        if (properties.length === 0) return collection as PropertyValue;

        const prop = properties.shift() as string;
        collection = collection[prop] as any;
        return readRec(collection, properties);
    };

    return readRec(collection, property.split('.'));
}

const collection = {
    a: {
        b: {
            c: {
                d: {
                    e: 2,
                },
            },
        },
    },
};

// should return 2
console.log(read(collection, 'a.b.c.d.e'));

// should return undefined
console.log(read(collection, 'a.b.c.f'));

console.log(read(collection, 'a.b.c'));
