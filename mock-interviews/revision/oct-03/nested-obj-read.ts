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
    if (!collection) return collection;
    if (!property) return collection;
    const props = property.split('.');

    return read(
        collection[props[0]] as Record<string, unknown>,
        props.slice(1).join('.')
    );
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
