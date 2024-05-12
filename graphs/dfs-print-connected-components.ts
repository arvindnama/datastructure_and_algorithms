/**
 * Given an undirected graph, the task is to print all the connected components line by line. 
 */

import { Graph, NodeVisited } from "../models/graph.models";

function printConnectedComponents<T extends number | string>(graph: Graph<T> ) {

  const visitedMap: NodeVisited = {};

  const getNextUnvisitedVertex = (): Nullable<T> => {
      for (let i = 0; i< graph.vertices.length; i++){
        if(!visitedMap[graph.vertices[i]]) {
          return graph.vertices[i] as T;
        }
      }
      return null;
  }

  let path: T[] = [];
  const traverse = (node: T) => {
    visitedMap[node] = true;
    path.push(node);
    graph.getAdjacentNodes(node)?.forEach(nextNode => {
      if(!visitedMap[nextNode.node]) {
        traverse(nextNode.node);
      }
    })
  }

  let nextNode = getNextUnvisitedVertex();
  while(nextNode){
    path = [];
    traverse(nextNode);
    if(path.length > 1){
      console.log(path.join('->'));
    }
    nextNode = getNextUnvisitedVertex();
  }
  
}

let graph = new Graph(5, [
  [0,1],
  [1,0],
  [1,2],
  [2,1],
  [3,4],
  [4,3],
])

graph.print();

console.log('All connected components');
printConnectedComponents(graph);