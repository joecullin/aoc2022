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
    console.log(instructions);

    const rope = [];
    for (let k=0; k<10; k++){
        rope.push({k, x:0, y:0});
    }
    const visited = {};

    const move = (knot, direction) => {
        switch (direction) {
            case "U": knot.y++; break;
            case "D": knot.y--; break;
            case "R": knot.x++; break;
            case "L": knot.x--;
        }
    };

    // axis labels aren't perfect (need printf), but good enough for debugging.
    const printRope = () => {
        const yVals = rope.map(knot => knot.y);
        const xVals = rope.map(knot => knot.x);
        const yMin = Math.min(...yVals, 0);
        const yMax = Math.max(...yVals, 0);
        const xMin = Math.min(...xVals, 0);
        const xMax = Math.max(...xVals, 0);
        for (let y=yMax; y>=yMin; y--){
            const row = [y, "|"];
            for (let x=xMin; x<=xMax; x++){
                let displayVal = '.';
                for (let i=rope.length-1; i>=0; i--){
                    if (rope[i].x === x && rope[i].y === y){
                        displayVal = rope[i].k;
                    }
                }
                row.push(displayVal);
            }
            console.log(row.join(" "));
        }
        const xLabels = [];
        for (let x=xMin; x<=xMax; x++){
            xLabels.push(x);
        }
        console.log("    " + xLabels.map(() => "-").join("-"));
        console.log("    " + xLabels.join(" "));
    };

    instructions.forEach(direction => {
        move(rope[0], direction);

        for (let i=1; i<rope.length; i++){
            const xDiff = rope[i-1].x - rope[i].x;
            const yDiff = rope[i-1].y - rope[i].y;

            if (xDiff === 0 || yDiff === 0){  // in same row or col
                if (Math.abs(xDiff) > 1){
                    rope[i].x += (xDiff < 0) ? -1 : 1;
                }
                if (Math.abs(yDiff) > 1){
                    rope[i].y += (yDiff < 0) ? -1 : 1;
                }
            }
            else if (
                (Math.abs(xDiff) >= 1 && Math.abs(yDiff) > 1) ||
                (Math.abs(yDiff) >= 1 && Math.abs(xDiff) > 1)
            ){
                rope[i].y += (yDiff < 0) ? -1 : 1;
                rope[i].x += (xDiff < 0) ? -1 : 1;
            }

            if (i === rope.length-1){ // tail knot
                visited[ [rope[i].x,rope[i].y].join(",") ] = true;
            }
        }
        printRope();
    });

    const answer = Object.keys(visited).length;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
