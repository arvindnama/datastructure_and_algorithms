//Reverse bits of a given 32 bits unsigned integer.

function reverseBits(n: number): number {
    let binaryStr = n.toString(2);
    binaryStr = '0'.repeat(32 - binaryStr.length) + binaryStr;
    let res = 0;
    for (let i = 0; i < 32; i++) {
        res += parseInt(binaryStr[i]) * 2 ** i;
    }
    return res;
}

console.log(reverseBits(43261596));
