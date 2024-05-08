

export type Edge<T extends number | string> = [T, T, number?];
export type Node<T extends number | string> = { node: T, weight?: number}
export type AdjacentList<T extends number | string> = {[k in string | number]: Array<Node<T>>};

export interface IGraph<T extends number | string> {
  vertex: number;
  adjacentList: AdjacentList<T>;
  print: ()=> void;
}


export class Graph<T extends number | string> implements IGraph<T> {
  public adjacentList: AdjacentList<T> = {};

  public get vertices() {
    return Object.keys(this.adjacentList);
  }

  constructor(public vertex: number, edges: Array<Edge<T>>) {
    edges.forEach(([src, dest, weight]) => {
    this.adjacentList[src] = this.adjacentList[src] || [];
    this.adjacentList[src].push({node: dest, weight});
  });

  }


  public print() {
    this.vertices.forEach((key) => {
      const edges = this.adjacentList[key];
      edges.map(({node, weight}) => {
        const connector = weight ? `--(${weight})-->` : `---->`
        console.log(`${key} ${connector} ${node}`)
      })
    })
  }

}

