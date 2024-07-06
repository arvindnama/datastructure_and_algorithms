/**
 * given statement guess the result
 *
 * var obj = {
 *  helloworld() {
 *      return "hello world" + this.name
 *  }
 *  name: 'hello'
 * }
 *
 * var obj2 = {
 *  helloworld : obj.helloworld
 *  name: 'Bye'
 * }
 *
 * console.log(obj.helloworld())
 */

const obj = {
    helloworld() {
        return 'hello world, ' + this.name;
    },
    name: 'hello',
};

const obj2 = {
    helloworld: obj.helloworld,
    name: 'Bye',
};

console.log(obj2.helloworld());

// [Ans]: this will print `Helloworld, bye`

// follow up question: how to make it print helloworld, hello

// [Ans]
console.log(obj2.helloworld.call(obj));
