/***
 * Given a directed graph, a source vertex ‘src’ and a destination vertex ‘dst’, print all paths from given ‘src’ to ‘dst’
 */

import { Graph, NodeVisited } from "./helpers/node";

function findAllPaths<T extends number | string>(graph: Graph<T>, src: T, dest: T) {


  const traverse = (node:T, path:T[]) => {
    if(path[path.length - 1] === dest) {
      console.log(path.join('-->'));
      return;
    }
    graph.getAdjacentNodes(node)?.forEach(({node: adNode}) => {
      // if node already in path (loop) ignore them.
      if(!path.find(n => n === adNode)) {
        path.push(adNode);
        traverse(adNode, path);
        // pop the last visited node. 
        path.pop();
      }
    })  
  }
  traverse(src, [src]);
}

let graph = new Graph(4, [
  [2,0],
  [2,1],
  [0,1],
  [0,2],
  [0,3],
  [1,3]
]);

graph.print();
console.log('Paths from 2 to 3');
findAllPaths(graph, 2, 3)