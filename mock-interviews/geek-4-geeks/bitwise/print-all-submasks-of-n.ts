// Given an integer N, the task is to print all the subsets of the set formed by

const printAllSubMasks = (n: number): number[] => {
    let subMask = n;
    const res: number[] = [];
    while (subMask > 0) {
        res.push(subMask);
        subMask = (subMask - 1) & n;
    }
    return res;
};

console.log('Print All sub-masks of', 5, printAllSubMasks(5));
console.log('Print All sub-masks of', 25, printAllSubMasks(25));
