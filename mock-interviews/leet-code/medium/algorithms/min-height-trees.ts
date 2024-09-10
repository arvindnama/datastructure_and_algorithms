/**
 * A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.


 */

function findMinHeightTrees(n: number, edges: number[][]): number[] {
    /**
     * generate a graph from edges & n nodes.
     * for each node perform a DFS and record the height
     */

    const graph: number[][] = new Array(n).fill(null).map(() => []);

    edges.forEach(([x, y]) => {
        graph[x] = graph[x] || [];
        graph[y] = graph[y] || [];
        graph[x].push(y);
        graph[y].push(x);
    });

    const getAdjNodes = (x: number) => {
        return graph[x];
    };

    const dfs = (v: number, visited: boolean[]): number => {
        visited[v] = true;
        const adjNodes = getAdjNodes(v);
        if (!adjNodes.length) return 0;

        let maxHeight = 0;
        for (const adjNode of adjNodes) {
            if (!visited[adjNode]) {
                const branchHeight = 1 + dfs(adjNode, visited);
                maxHeight = Math.max(branchHeight, maxHeight);
            }
        }
        return maxHeight;
    };

    const map: { [height in number]: number[] } = {};
    for (let i = 0; i < n; i++) {
        const visited: boolean[] = [];
        const height = dfs(i, visited);
        map[height] = map[height] || [];
        map[height].push(i);
    }

    return map[+Object.keys(map)[0]];
}

console.log(
    findMinHeightTrees(4, [
        [1, 0],
        [1, 2],
        [1, 3],
    ])
);

console.log(
    findMinHeightTrees(6, [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 4],
        [5, 4],
    ])
);
