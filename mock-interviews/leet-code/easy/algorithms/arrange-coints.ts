/**
 * You have n coins and you want to build a staircase with these coins. The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.

Given the integer n, return the number of complete rows of the staircase you will build.
 */

function arrangeCoins(n: number): number {
    const totalCoins = (rows: number): number => (rows * (rows + 1)) / 2;

    let [s, e] = [0, n];
    while (s < e) {
        const m = Math.floor((s + e) / 2);
        const coins = totalCoins(m);
        if (coins === n) return m;
        if (coins > n) e = m - 1;
        else s = m + 1;
    }
    return totalCoins(s) > n ? s - 1 : s;
}

console.log(arrangeCoins(5));
console.log(arrangeCoins(8));
console.log(arrangeCoins(2 ** 31 - 1));
