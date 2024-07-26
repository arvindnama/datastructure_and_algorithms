/**
 * Write a generator function that returns a generator object which yields the fibonacci sequence.

The fibonacci sequence is defined by the relation Xn = Xn-1 + Xn-2.

The first few numbers of the series are 0, 1, 1, 2, 3, 5, 8, 13.
 */

function* fibGenerator(): Generator<number, any, number> {
    const fibo = [0, 1];
    yield fibo[0];
    yield fibo[1];
    let idx = 2;
    while (idx < 50) {
        fibo[idx] = fibo[idx - 1] + fibo[idx - 2];
        yield fibo[idx];
        idx++;
    }
}

const gen = fibGenerator();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
