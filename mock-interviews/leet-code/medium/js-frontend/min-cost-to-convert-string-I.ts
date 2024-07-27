/**
 * You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English letters. You are also given two 0-indexed character arrays original and changed, and an integer array cost, where cost[i] represents the cost of changing the character original[i] to the character changed[i].

You start with the string source. In one operation, you can pick a character x from the string and change it to the character y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y.

Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.

Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].


 */

function minimumCost(
    source: string,
    target: string,
    original: string[],
    changed: string[],
    cost: number[]
): number {
    const costMap: { [key in string]: Record<string, number> } = {};
    for (let i = 0; i < original.length; i++) {
        costMap[original[i]] = costMap[original[i]] || {};
        costMap[original[i]][changed[i]] = cost[i];
    }

    const cache: { [key in string]: number } = {};

    const minCost = (
        s: string,
        t: string,
        visited: { [key in string]: boolean } = {}
    ): number => {
        if (s == t) return 0;
        if (!costMap[s]) return -1;

        const key = `${s}_${t}`;
        if (cache[key] !== undefined) return cache[key];
        let cost = costMap[s][t] ?? Number.MAX_SAFE_INTEGER;
        visited[s] = true;

        const keys = Object.keys(costMap[s]).filter(
            (t1) => t1 !== t && !visited[t1]
        );

        for (let i = 0; i < keys.length; i++) {
            if (costMap[s][keys[i]] < cost) {
                const c = minCost(keys[i], t, visited);
                if (c !== -1) {
                    cost = Math.min(costMap[s][keys[i]] + c, cost);
                }
            }
        }

        visited[s] = false;
        cost = cost === Number.MAX_SAFE_INTEGER ? -1 : cost;
        return cost;
    };

    let minTotalConst = 0;
    for (let i = 0; i < source.length; i++) {
        const cost = minCost(source[i], target[i]);
        cache[`${source[i]}_${target[i]}`] = cost;

        if (cost == -1) return -1;
        minTotalConst += cost;
    }

    return minTotalConst;
}

// console.log(
//     minimumCost(
//         'abcd',
//         'acbe',
//         ['a', 'b', 'c', 'c', 'e', 'd'],
//         ['b', 'c', 'b', 'e', 'b', 'e'],
//         [2, 5, 5, 1, 2, 20]
//     )
// );

// console.log(minimumCost('aaaa', 'bbbb', ['a', 'c'], ['c', 'b'], [1, 2]));
// console.log(minimumCost('abcd', 'abce', ['a'], ['e'], [1000]));

// console.log(
//     minimumCost(
//         'aaaabadaaa',
//         'dbdadddbad',
//         ['c', 'a', 'c', 'a', 'a', 'b', 'b', 'b', 'd', 'd', 'c'],
//         ['a', 'c', 'b', 'd', 'b', 'c', 'a', 'd', 'c', 'b', 'd'],
//         [7, 8, 11, 9, 7, 6, 4, 6, 9, 5, 9]
//     )
// );
// console.log(
//     minimumCost(
//         'aaadbdcdac',
//         'cdbabaddba',
//         ['a', 'c', 'b', 'd', 'b', 'a', 'c'],
//         ['c', 'a', 'd', 'b', 'c', 'b', 'd'],
//         [7, 2, 1, 3, 6, 1, 7]
//     )
// );

console.log(
    minimumCost(
        'a',
        'd',
        ['a', 'b', 'd', 'b', 'd', 'a', 'c', 'b', 'a', 'c'],
        ['c', 'd', 'a', 'c', 'b', 'b', 'd', 'a', 'd', 'a'],
        [8, 11, 5, 1, 11, 4, 3, 8, 11, 4]
    )
);
