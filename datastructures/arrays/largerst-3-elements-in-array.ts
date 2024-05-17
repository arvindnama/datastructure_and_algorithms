function findLargest3InArray(array: number[]): [number, number, number] {
    const res: [number, number, number] = [array[0], array[0], array[0]];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > res[0]) {
            res[2] = res[1];
            res[1] = res[0];
            res[0] = array[i];
        }
        if (array[i] > res[1] && array[i] < res[0]) {
            res[2] = res[1];
            res[1] = array[i];
        }
        if (array[i] > res[2] && array[i] < res[1]) {
            res[2] = array[i];
        }
    }

    return res;
}

const array = [10, 4, 3, 50, 23, 90];
console.log('3 largest', findLargest3InArray(array));
