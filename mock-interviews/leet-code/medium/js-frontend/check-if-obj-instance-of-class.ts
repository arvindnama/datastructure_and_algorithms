/**
 * Write a function that checks if a given value is an instance of a given class or superclass. For this problem, an object is considered an instance of a given class if that object has access to that class's methods.

There are no constraints on the data types that can be passed to the function. For example, the value or the class could be undefined.
 */

function checkIfInstanceOf(obj: any, classFunction: any): boolean {
    /**
     * prototype of a class can be obtained by property on the class called prototype
     * prototype of an Object (instance) can be found by property __proto__
     *
     * Note::
     *  NaN is instance of Number
     *  null & undefined are not Objects
     *  5 is an instance of Number
     *  Number is not an instance of Number (they are class)
     *
     *  Incase of inheritance , we will need to move down the inheritance chain
     *  to check for instance of class.
     *
     *  All objects are instance of class called Object . THis is the termination case
     */

    const isNull = (a: any) => a === null || a === undefined;
    if (isNull(obj) || isNull(classFunction)) return false;
    if (obj['__proto__'] === Object.prototype) return false;
    if (obj['__proto__'] === classFunction.prototype) return true;

    return checkIfInstanceOf(obj['__proto__'], classFunction);
}

class Animal {}
class Dog extends Animal {}
console.log(checkIfInstanceOf(new Dog(), Animal));

console.log(checkIfInstanceOf(Date, Date));
console.log(checkIfInstanceOf(new Date(), Date));
console.log(checkIfInstanceOf(5, Number));
console.log(checkIfInstanceOf(null, null));
console.log(checkIfInstanceOf(undefined, undefined));
console.log(checkIfInstanceOf(Number.NaN, Number));
