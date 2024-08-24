export class DisjointSets<T extends string | number> {
    #parent: { [k in string | number]: T } = {};
    #rank: { [k in string | number]: number } = {};

    constructor(private n: number) {}

    public find(u: T): T {
        if (this.#parent[u] === undefined) {
            this.#parent[u] = u;
            this.#rank[u] = 0;
        }

        if (this.#parent[u] === u) return u;

        return (this.#parent[u] = this.find(this.#parent[u]));
    }

    public isDisjoint(u: T, v: T): boolean {
        return this.find(u) !== this.find(v);
    }

    public union(u: T, v: T) {
        const reU = this.find(u);
        const reV = this.find(v);
        if (this.#rank[reU] < this.#rank[reV]) {
            this.#parent[reV] = reU;
        } else if (this.#rank[reU] > this.#rank[reV]) {
            this.#parent[reU] = reV;
        } else {
            this.#parent[reU] = reV;
            this.#rank[reV]++;
        }
    }

    public printSets(): { [k: string | number]: T[] } {
        const sets: { [k: string | number]: T[] } = {};
        const nodes = Object.keys(this.#parent);

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i] as T;
            const nRE = this.find(node);
            sets[nRE] = sets[nRE] || [];
            sets[nRE].push(node);
        }

        return sets;
    }
}
