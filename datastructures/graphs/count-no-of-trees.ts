/**
 * Given n nodes of a forest (collection of trees), find the number of trees in the forest.
 */

const countTrees = (edges: Array<[number, number]>): number => {
    const parent: number[] = [];
    const rank: number[] = [];

    const find = (i: number): number => {
        if (parent[i] === undefined) {
            parent[i] = i;
            rank[i] = 0;
        }
        if (parent[i] === i) return i;
        return (parent[i] = find(parent[i]));
    };

    const add = (u: number, v: number) => {
        const [uR, vR] = [find(u), find(v)];
        if (uR !== vR) {
            if (rank[uR] < rank[vR]) {
                parent[vR] = uR;
            } else if (rank[uR] > rank[vR]) {
                parent[uR] = vR;
            } else {
                parent[uR] = vR;
                rank[vR]++;
            }
        }
    };

    edges.forEach(([u, v]) => add(u, v));

    const map: { [k in number]: boolean } = {};
    for (let i = 0; i < parent.length; i++) {
        map[find(parent[i])] = true;
    }

    return Object.keys(map).length;
};

console.log(
    countTrees([
        [0, 1],
        [0, 2],
        [3, 4],
    ])
);
