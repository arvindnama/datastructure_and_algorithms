import { Graph, NodeVisited } from "../../models/graph.models";

function bfsTraversal(graph: Graph<number>, start: number) {

  const visited: NodeVisited = {[start]: true}
  const queue = [start];
  const order = []
  while(queue.length) {
    const node = queue.shift() as number;
    order.push(node);
    graph.getAdjacentNodes(node).forEach((v) => {
      if(!visited[v.node]) {
        queue.push(v.node);
        visited[v.node] = true;
      }
    });
  }

  console.log(order.join(' '));
}

const g = new Graph(5, [
  [0,1],
  [0,2],
  [1,0],
  [1,2],
  [1,3],
  [2,0],
  [2,1],
  [2,4],
  [3,4],
  [3,1],
  [4,3],
  [4,3],
])

g.print();

console.log('BFS');
bfsTraversal(g, 0);