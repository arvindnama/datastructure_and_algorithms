/**
 * Given a rod of length n inches and an array of prices that includes prices of all pieces of size smaller than n. Determine the maximum value obtainable by cutting up the rod and selling the pieces. For example, if the length of the rod is 8 and the values of different pieces are given as the following, then the maximum obtainable value is 22 (by cutting in two pieces of lengths 2 and 6)
 *
 * https://www.geeksforgeeks.org/cutting-a-rod-dp-13/?ref=lbp
 */

function cuttingRod(prices: number[]): number {
    /*
     *  each piece of the rod can either be included or not.
     * If included total price would price of cut rod + remaining rod (existing piece included)
     * if not included total price will be price of remaining without this piece
     */

    const getMaxPrice = (length: number, piece: number): number => {
        if (length === 0) return 0;
        if (length < 0 || piece < 0) return Number.MIN_SAFE_INTEGER;

        const rodLength = piece + 1; // piece is 0 based hence +1
        const pieceNotIncluded = getMaxPrice(length, piece - 1);
        const pieceIncluded =
            prices[piece] + getMaxPrice(length - rodLength, piece);

        return Math.max(pieceIncluded, pieceNotIncluded);
    };

    return getMaxPrice(prices.length, prices.length - 1);
}

console.log(cuttingRod([1, 5, 8, 9, 10, 17, 17, 20]));
console.log(cuttingRod([3, 5, 8, 9, 10, 17, 17, 20]));
