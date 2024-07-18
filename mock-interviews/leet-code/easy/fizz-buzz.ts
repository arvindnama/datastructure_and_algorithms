/**
 * Given an integer n, return a string array answer (1-indexed) where:

answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.
 */

function fizzBuzz(n: number): string[] {
    return Array(n)
        .fill(n)
        .map((_, i) => {
            i = i + 1;
            if (i % 3 === 0 && i % 5 === 0) return 'FizzBuzz';
            if (i % 3 === 0) return 'Fizz';
            if (i % 5 === 0) return 'Buzz';
            return `${i}`;
        });
}

console.log(fizzBuzz(3));
console.log(fizzBuzz(5));
console.log(fizzBuzz(15));
