import { createGrid, outOfBounds, readPuzzleInput } from "../utils.mjs";

const fullInput = readPuzzleInput(8);
const testInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

const underReview = fullInput;

const grid = createGrid(underReview);

const anttenaePositions = grid.reduce((acc, col, x) => {
    col.forEach((square, y) => {
        if (square != '.'){
            if (!acc[square]){
                acc[square] = [];
            }
            acc[square].push({x,y});
        }
    });
    return acc;
},{});

let allAntinodes = [];

for (let type of Object.keys(anttenaePositions)) {
    const positions = anttenaePositions[type];

    positions.forEach((position) => {
        const otherPositions = positions.filter((pos) => pos.x != position.x && pos.y != position.y);
        if (otherPositions.length > 0) allAntinodes.push(position);
	otherPositions.forEach((other) => {
            const vector = {
                x: other.x - position.x,
                y: other.y - position.y
            }
	    let antinode = {
		x: other.x + vector.x,
		y: other.y + vector.y
            }
	    while (!outOfBounds(antinode, grid)){
                allAntinodes.push({...antinode})
		antinode.x += vector.x;
		antinode.y += vector.y;
	    }
        })
    });
}

//remove OOB
allAntinodes = allAntinodes.filter((node) => !outOfBounds(node, grid));

//dedupe
allAntinodes = allAntinodes.reduce((acc, node) => {
    const exists = acc.some((n) => n.x == node.x && n.y == node.y);
    if (!exists) {
        acc.push(node);
    }
    return acc;
}, []);

console.log(allAntinodes.length);
