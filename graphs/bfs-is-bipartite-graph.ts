/***
 * A Bipartite Graph is a graph whose vertices can be divided into two independent sets, U and V such that every edge (u, v) either connects a vertex from U to V or a vertex from V to U. In other words, for every edge (u, v), either u belongs to U and v to V, or u belongs to V and v to U. We can also say that there is no edge that connects vertices of same set.
 * 
 * start from any one vertex, paint it color-1 , get all neighbors and paint it color-2 & continue
 * if any neighbor is of same color as it current node , it is not  then it is not bipartite.
 */

import { Graph, NodeVisited } from "./helpers/node";

function isBipartiteGraph<T extends number | string >(graph:Graph<T>) {
  const start = graph.vertices[0];

  const colorMap= {[start]: 1};
  const queue: T[] = [start as T];

  while(queue.length) {
    const node = queue.shift() as T;
    const color = colorMap[node];
    const adNodes = graph.getAdjacentNodes(node) ?? [];
    for(let i = 0 ; i < adNodes.length; i++) {
      const ad = adNodes[i].node;
      if(colorMap[ad] === undefined) {
        colorMap[ad] = (color + 1) % 2;
        queue.push(ad);
      }else if(colorMap[ad] === color){
        // both vertex of edge are part of same set. 
        return false;
      }
    }
  }
  return true;
}

let g: Graph<number> = new Graph(6, [
  [0,1],
  [1,2],
  [2,3],
  [3,4],
  [4,5],
  [5,0],
])

g.print();
console.log('is Bipartite graph::', isBipartiteGraph(g));

g = new Graph(6, [
  [0,1],
  [1,2],
  [2,3],
  [3,4],
  [4,0],
])

g.print();
console.log('is Bipartite graph::', isBipartiteGraph(g));
