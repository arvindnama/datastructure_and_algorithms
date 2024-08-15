const oddEven = (n: number): string => {
    return (n & 1) === 1 ? 'odd' : 'even';
};

console.log(oddEven(1));
console.log(oddEven(2));
console.log(oddEven(150));
console.log(oddEven(1120));
