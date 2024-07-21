/**
 * In this question, you need to replicate the popular testing library jest functionality. You must implement the utility expect provided by the jest library.
 */

interface Executor<T> {
    not: {
        toBe: (expected: T) => void;
    };
    toBe: (expected: T) => void;
}

function customExpect<T>(actual: T): Executor<T> {
    const getToBeFn = (isNot: boolean) => (expected: T) => {
        const areEqual = expected === actual;
        if (isNot) {
            if (areEqual)
                throw Error(`Expected ${expected} not to be ${actual}`);
            return;
        }
        if (!areEqual) throw Error(`Expected ${expected} but got ${actual}`);
    };
    return {
        not: {
            toBe: getToBeFn(true),
        },
        toBe: getToBeFn(false),
    };
}

customExpect(3).toBe(3); // no error | Do not return anything
try {
    customExpect(2).toBe(3); // should throw an error
} catch (e) {
    console.error(e);
}

customExpect(2).not.toBe(3); // no error | Do not return anything
try {
    customExpect(2).not.toBe(2); // should throw an error
} catch (e) {
    console.error(e);
}
