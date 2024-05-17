function rearrange(arr: number[]): number[] {
    let i = 0,
        j = 0;

    const swap = (i: number, j: number) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    while (j < arr.length) {
        if (arr[j] % 2 === 0) {
            swap(i++, j);
        } else {
            j++;
        }
    }

    return arr;
}

const arr = [7, 2, 9, 4, 6, 1, 3, 8, 5];
console.log(arr);
console.log('segregate even n odd', rearrange(arr));
