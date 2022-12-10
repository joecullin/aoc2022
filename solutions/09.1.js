const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const instructions = [];
    input.forEach(line => {
        const parts = line.split(' ');
        const steps = parseInt(parts[1]);
        for (let i=0; i<steps; i++){
            instructions.push(parts[0]);
        }
    });

    const head = { x: 0, y: 0 };
    const tail = { x: 0, y: 0 };
    const visited = {};

    const move = (knot, direction) => {
        switch (direction) {
            case "U": knot.y++; break;
            case "D": knot.y--; break;
            case "R": knot.x++; break;
            case "L": knot.x--;
        }
    };

    instructions.forEach(direction => {
        move(head, direction);
        const xDiff = head.x - tail.x;
        const yDiff = head.y - tail.y;

        if (Math.abs(xDiff) > 1){
            tail.x += (xDiff/2);
            if (yDiff !== 0){
                tail.y += yDiff;
            }
        }
        if (Math.abs(yDiff) > 1){
            tail.y += (yDiff/2);
            if (xDiff !== 0){
                tail.x += xDiff;
            }
        }
        visited[ [tail.x,tail.y].join(",") ] = true;
    });

    const answer = Object.keys(visited).length;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
