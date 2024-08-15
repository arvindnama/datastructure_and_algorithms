const checkIfAlternativeSet = (n: number): boolean => {
    n = n ^ (n >> 1);
    return (n & (n + 1)) === 0;
};

console.log(checkIfAlternativeSet(0b101010101));
console.log(checkIfAlternativeSet(0b101010111));
console.log(checkIfAlternativeSet(0b101));
