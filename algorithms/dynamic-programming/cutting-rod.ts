/**
 * Given a rod of length n inches and an array of prices that includes prices of all pieces of size smaller than n. Determine the maximum value obtainable by cutting up the rod and selling the pieces. For example, if the length of the rod is 8 and the values of different pieces are given as the following, then the maximum obtainable value is 22 (by cutting in two pieces of lengths 2 and 6)
 */

const cutRod = (prices: number[], idx: number, n: number): number => {
    if (idx < 0 || n < 0) return Number.MIN_SAFE_INTEGER;
    if (n === 0) return 0;

    const notCut = cutRod(prices, idx - 1, n);

    const rod_length = idx + 1;
    const cut = prices[idx] + cutRod(prices, idx, n - rod_length);

    return Math.max(notCut, cut);
};

const prices = [1, 5, 8, 9, 10, 17, 17, 20];

console.log(cutRod(prices, prices.length - 1, prices.length));
