/***
 * Given an undirected graph and a set of vertices, we have to print all the non-reachable nodes from the given head node using a breadth-first search.
 */

import { Graph, NodeVisited } from "../../models/graph.models";

function findAllUnreachableNodes<T extends number | string>(graph: Graph<T>, start: T): T[] {

  const visited: NodeVisited = graph.vertices.reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, {} as NodeVisited);
  
  const traverse = (start: T) => {
    const queue = [start];
    visited[start] = true;
    while(queue.length) {
      const n = queue.shift() as T;
      graph.getAdjacentNodes(n)?.forEach(an => {
        if(!visited[an.node]) {
          visited[an.node] = true;
          queue.push(an.node);
        }
      })
    }
  }

  traverse(start);

  return Object.keys(visited).filter((k) => !visited[k]).map(k => k as T);
}


let g: Graph<number> = new Graph(5, [
  [0,1],
  [1,0],
  [0,2],
  [2,0],
  [1,2],
  [2,1],
  [3,4],
  [4,3]
])

g.print();
console.log('Unreachable nodes from 0', findAllUnreachableNodes(g, 0));
console.log('Unreachable nodes from 0', findAllUnreachableNodes(g, 2));
console.log('Unreachable nodes from 3', findAllUnreachableNodes(g, 3));
console.log('Unreachable nodes from 4', findAllUnreachableNodes(g, 4));


g = new Graph(8, [
  [0,1],
  [1,0],
  [0,2],
  [2,0],
  [1,2],
  [2,1],
  [3,4],
  [4,3],
  [4,5],
  [5,4],
  [6,7],
  [7,6],
])

g.print();
console.log('Unreachable nodes from 0', findAllUnreachableNodes(g, 0));