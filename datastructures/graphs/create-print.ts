import { Graph } from '../../models/graph.models';

const graph = new Graph(3, [
    ['a', 'b'],
    ['a', 'c'],
    ['b', 'c'],
    ['c', 'a'],
]);

console.group(`graph`);
console.log('vertices with connection', graph.vertices);
console.log('Edges::');
graph.print();
console.groupEnd();

const weightedGraph = new Graph(3, [
    ['a', 'b', 5],
    ['a', 'c', 10],
    ['b', 'c', 20],
]);

console.group(`weight graph`);
console.log('vertices with connection', weightedGraph.vertices);
console.log('Edges::');
weightedGraph.print();
console.groupEnd();
