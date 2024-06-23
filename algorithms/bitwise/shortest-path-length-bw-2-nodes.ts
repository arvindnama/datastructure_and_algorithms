/**
 * Shortest path length between two given nodes such that adjacent nodes are at bit difference 2
 *
 * The edge between any two nodes (a and b) exists only if the bit difference between them is 2 else -1
 *
 */

const shortestPath = (a: number, b: number): number => {
    const bitDiff = (a: number, b: number): number => {
        let aXb = a ^ b;
        let bitDiff = 0;
        while (aXb) {
            bitDiff += aXb & 1;
            aXb >>= 1;
        }
        return bitDiff;
    };

    const diff = bitDiff(a, b);
    return diff % 2 === 0 ? diff / 2 : -1; // if diff is multiple of 2 then connected and shorted distance is diff/2
};

console.log('Shortest path bw 2 nodes a:15, b:3', shortestPath(15, 3));
console.log('Shortest path bw 2 nodes a:15, b:2', shortestPath(15, 3));
