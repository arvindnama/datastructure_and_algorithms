

export type Vertex = {[key in string | number]: boolean};
export type Edge<T extends number | string> = [T, T, number?];
export type GraphNode<T extends number | string> = { node: T, weight?: number}
export type AdjacentList<T extends number | string> = {[k in string | number]: Array<GraphNode<T>>};

export type NodeVisited = {[key in number | string]: boolean};

export interface IGraph<T extends number | string> {
  vertex: number;
  adjacentList: AdjacentList<T>;
  print: ()=> void;
}


export class Graph<T extends number | string> implements IGraph<T> {
  public adjacentList: AdjacentList<T> = {};
  #vertices: Vertex = {};

  public get vertices() {
    return Object.keys(this.#vertices);
  }

  constructor(public vertex: number, edges: Array<Edge<T>>) {
    edges.forEach(([src, dest, weight]) => {
      // Record vertices 
      this.#vertices[src] = true;
      this.#vertices[dest] = true;

      this.adjacentList[src] = this.adjacentList[src] || [];
      this.adjacentList[src].push({node: dest, weight});
    });
  }

  public getAdjacentNodes(vertex: T) : Array<GraphNode<T>> {
    return this.adjacentList[vertex];
  }

  public print() {
    this.vertices.forEach((key) => {
      const edges = this.adjacentList[key];
      edges?.map(({node, weight}) => {
        const connector = weight ? `--(${weight})-->` : `---->`
        console.log(`${key} ${connector} ${node}`)
      })
    })
  }

}

