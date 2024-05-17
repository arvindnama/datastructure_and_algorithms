function rotate(arr: number[], d: number): number[] {
    const temp = [];
    for (let i = 0; i < d; i++) {
        temp[i] = arr[i];
    }

    let k = 0;
    for (let i = 0, j = d; i < arr.length; i++, j++) {
        if (j < arr.length) {
            arr[i] = arr[j];
        } else {
            arr[i] = temp[k++];
        }
    }

    return arr;
}

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr);
console.log('rotate 2 times', rotate(arr, 2));
