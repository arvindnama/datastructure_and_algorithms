function printLeftRotation(arr: number[], k: number) {
    k = k % arr.length;

    // just for readability (else console.log for o(1) space)
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        const idx = (k + i) % arr.length;
        str = `${str} ${arr[idx]}`;
    }
    return str;
}

console.log(
    `Print Left rotated array ${[1, 3, 5, 7, 9]} , k= 1 time, in o(n) time & o(1) space`,
    printLeftRotation([1, 3, 5, 7, 9], 1)
);
console.log(
    `Print Left rotated array ${[1, 3, 5, 7, 9]} , k= 2 time, in o(n) time & o(1) space`,
    printLeftRotation([1, 3, 5, 7, 9], 2)
);
console.log(
    `Print Left rotated array ${[1, 3, 5, 7, 9]} , k= 3 time, in o(n) time & o(1) space`,
    printLeftRotation([1, 3, 5, 7, 9], 3)
);
console.log(
    `Print Left rotated array ${[1, 3, 5, 7, 9]} , k= 14 time, in o(n) time & o(1) space`,
    printLeftRotation([1, 3, 5, 7, 9], 14)
);
