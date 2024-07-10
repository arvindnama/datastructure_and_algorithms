/*
 * For a given no. n we will need to find the closest power of 2 .
 * a closest power of 2 is obtained by unsetting all bits except MSB
 * once we have the closest Power of 2 to n
 * we just need to right shift this number till it is 1
 *
 * UnsetAllButMSB ->
 * for a given integer start generating lsb (n %2) add this to []
 * once all bits are obtained, replace all bits to zero except MSB
 *
 *
 */
const findAllPow2LsEqN = (n: number): number[] => {
    const unsetAllButMsbNoSpace = (n: number): number => {
        let bitCount: number = 0;
        while (n) {
            bitCount++;
            n = Math.floor(n / 2);
        }
        return Math.pow(2, bitCount);
    };

    // const unsetAllButMsb = (n: number): number => {
    //     let res: number[] = [];
    //     while (n) {
    //         res.push(n % 2);
    //         n = Math.floor(n / 2);
    //     }
    //     res = res.map((b, i) => (i == 0 ? b : 0));
    //     return parseInt(res.join(''), 2);
    // };

    let closestPowOf2 = unsetAllButMsbNoSpace(n);
    console.log(n.toString(2), closestPowOf2.toString(2));
    const res = [closestPowOf2];
    while (closestPowOf2 != 1) {
        closestPowOf2 >>= 1;
        res.push(closestPowOf2);
    }
    return res;
};

console.log('Find all pow of 2 < or eq to 63', findAllPow2LsEqN(63));
console.log('Find all pow of 2 < or eq to 193', findAllPow2LsEqN(193));
