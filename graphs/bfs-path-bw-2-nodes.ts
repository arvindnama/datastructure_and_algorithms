/**
 * Given a Directed Graph and two vertices in it, check whether there is a path from the first given vertex to second.
 */

import { Graph, NodeVisited } from "../models/graph.models";


function bfsPathExists(graph: Graph<number>, s: number, e: number): boolean {

  const visited: NodeVisited = {[s]: true};
  const queue  = [s];

  while(queue.length){
    const n = queue.shift() as number;
    if(n === e) {
      return true; // path found
    }
    graph.getAdjacentNodes(n)?.forEach(v => {
      if(!visited[v.node]) {
        visited[v.node] = true;
        queue.push(v.node);
      }
    })
  }
  return false;
}

let g = new Graph(5, 
  [
    [0,1],
    [0,2],
    [1,2],
    [2,0],
    [2,3],
    [3,3],
  ]
)

g.print();

console.log('Path between 1 & 3:: ', bfsPathExists(g,1,3));
console.log('Path between 3 & 0:: ', bfsPathExists(g,3,0));