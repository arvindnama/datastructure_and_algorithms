const fibo = (n: number): number => {
    const map = ((fibo as any as FuncWithMap).map =
        (fibo as any as FuncWithMap).map || {});

    if (n === 0) return 0;
    if (n === 1) return 1;
    if (map[n]) return map[n] as number;

    return (map[n] = fibo(n - 1) + fibo(n - 2));
};

console.log('fibo(5)', fibo(5));
console.log('fibo(10)', fibo(10));
