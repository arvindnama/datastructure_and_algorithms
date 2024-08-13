const setABit = (n: number, pos: number): number => {
    const mask = 1 << pos;
    return n | mask;
};

const unSetABit = (n: number, pos: number): number => {
    const mask = ~(1 << pos);
    return n & mask;
};

const toggleABit = (n: number, pos: number): number => {
    const mask = 1 << pos;
    return n ^ mask;
};

const checkIfSet = (n: number, pos: number): boolean => {
    n = n >> pos;
    return (n & 1) === 1;
};

console.log('setABit(4, 2)::', setABit(4, 2).toString(2));
console.log('unSetABit(7, 2)::', unSetABit(7, 2).toString(2));
console.log('toggleABit(4, 0)::', toggleABit(4, 0).toString(2));
console.log('toggleABit(4, 1)::', toggleABit(4, 1).toString(2));
console.log('checkIfSet(7, 0)::', checkIfSet(7, 0));
console.log('checkIfSet(8, 0)::', checkIfSet(8, 0));
console.log('checkIfSet(8, 3)::', checkIfSet(8, 3));
console.log('checkIfSet(4, 1)::', checkIfSet(4, 1));
console.log('checkIfSet(4, 2)::', checkIfSet(4, 2));
