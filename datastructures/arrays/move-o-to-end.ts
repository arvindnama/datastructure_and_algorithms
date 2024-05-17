function moveAllZerosToEnd(array: number[]): number[] {
    let startPrt = 0;
    let endPtr = array.length - 1;

    const swap = (i: number, j: number) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };

    while (startPrt < endPtr) {
        if (array[startPrt] == 0) {
            swap(startPrt, endPtr);
            endPtr--;
        } else {
            startPrt++;
        }
    }
    return array;
}

let array = [1, 2, 0, 4, 3, 0, 5, 0];
console.log(array);
console.log('move all zeros to end', moveAllZerosToEnd(array));
array = [1, 2, 0, 0, 0, 3, 6];
console.log(array);
console.log('move all zeros to end', moveAllZerosToEnd(array));
