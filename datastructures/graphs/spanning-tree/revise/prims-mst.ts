import { Matrix } from '../../../../models/matrix.models';

const primsMst = (graph: Matrix) => {
    const n = graph.length;
    const isInMstSet: boolean[] = new Array(n).fill(false);
    const mstMap: Array<{ w: number; parent: number; v: number }> = new Array(n)
        .fill(-1)
        .map((_, idx) => ({ w: Number.MAX_VALUE, v: idx, parent: -1 }));

    const getAdjNodes = (u: number): number[] =>
        graph[u]
            .map((w, v) => ({ w, v }))
            .filter(({ w }) => w > 0)
            .map(({ v }) => v);

    const pickNext = (): number =>
        mstMap
            .filter(({ v }) => !isInMstSet[v])
            .reduce(
                (acc, cur) => {
                    if (cur.w < acc.w) {
                        return { w: cur.w, v: cur.v };
                    }
                    return acc;
                },
                { w: Number.MAX_VALUE, v: -1 }
            ).v;

    mstMap[0].w = 0; // this will ensure we start from 0
    let u = pickNext();

    while (u !== -1) {
        console.log(u);
        isInMstSet[u] = true;

        getAdjNodes(u)
            .filter((u) => !isInMstSet[u])
            .forEach((v) => {
                const newW = graph[u][v];
                if (newW < mstMap[v].w) {
                    mstMap[v] = {
                        v,
                        w: newW,
                        parent: u,
                    };
                }
            });
        u = pickNext();
    }

    // 1st is always root
    console.log(
        mstMap.slice(1).map(({ w, v, parent }) => `${parent} --> ${v}: ${w}`)
    );
};

primsMst([
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0],
]);
