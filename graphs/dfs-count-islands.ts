/**
 * Given a binary 2D matrix, find the number of islands. A group of connected 1s forms an island
 */


function countIslands(graph:number[][]): number {
  let islandCount = 0;
  const visitedMatrix: boolean[][] = graph.map(r => r.map(c => false));

  const findNextIsland = (): Nullable<[number, number]> => {
    for(let i = 0; i < graph.length; i++) {
      for(let j = 0; j< graph[i].length; j++) {
        if(!visitedMatrix[i]?.[j] && graph[i][j] === 1) {
          return [i,j];
        }  
      }
    }
    return;
  }

  const possibleMoves:Array<[number,number]> = [
    [-1,0] , [1,0], [0, -1], [0, 1], [-1,-1], [1,1], [1,-1], [-1,1]
  ];
  const canMove = (x: number,y: number): boolean => (
    x >=0 && x < graph[0].length && 
    y >=0 && y < graph.length && 
    visitedMatrix[x][y] === false
  );

  const traverse = ([x,y]: [number, number]) => {
    visitedMatrix[x][y] = true;

    possibleMoves.forEach( ([px,py]) => {
      const [nx, ny]:[number,number] = [x + px, y + py];
      if(canMove(nx, ny)) {
        visitedMatrix[nx][ny] = true;
        if(graph[nx][ny] === 1) {
          traverse([nx, ny]);
        }
      } 
    })
  };
  let island = findNextIsland();
  while(island) {
    islandCount++;
    traverse(island);
    island = findNextIsland();
  }

  return islandCount;
}


const graph =[
  [1,1,0,0,0],
  [0,1,0,0,1],
  [1,0,0,0,1],
  [0,0,0,0,0],
  [1,0,1,0,1],
];

console.log(graph);
console.log('no. of islands', countIslands(graph))