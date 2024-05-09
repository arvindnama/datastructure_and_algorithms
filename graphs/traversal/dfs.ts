import { Graph, NodeVisited } from "../helpers/node";


function dfsTraversal(g: Graph<number>, startNode: number): number[] {

  const visited: NodeVisited = {};
  const order: number[] = [];

  const traverseInt = (n: number) => {
    visited[n] = true;
    order.push(n);
    g.getAdjacentNodes(n)?.forEach((an) => {
      if(!visited[an.node]) {
        traverseInt(an.node);
      }
    })
  }
  
  traverseInt(startNode);
  return order;
}


let g = new Graph(4, [
  [0,1],
  [0,2],
  [1,2],
  [2,0],
  [2,3],
  [3,3]
])

g.print();

console.log('dfs', dfsTraversal(g, 1).join());


 g = new Graph(4, [
  [2,0],
  [0,2],
  [1,2],
  [0,1],
  [3,3],
  [1,3]
])

g.print();

console.log('dfs', dfsTraversal(g, 2).join());