function checkIfInOrderArrIsBst(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 2; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}

console.log(
    'Is Inorder Array BST',
    [19, 23, 25, 30, 45],
    checkIfInOrderArrIsBst([19, 23, 25, 30, 45])
);

console.log(
    'Is Inorder Array BST',
    [19, 23, 30, 25, 45],
    checkIfInOrderArrIsBst([19, 23, 30, 25, 45])
);
