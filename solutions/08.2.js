const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const grid = [];
    input.forEach((line, row) => {
        line.split('').forEach( (val,col) => {
            grid.push({
                row,
                col,
                val: parseInt(val),
            });
        });
    });
    const val = (g, row,col) => {
        const cell = g.find(c => c.row === row && c.col === col);
        return cell?.val;
    };
    const edgeLength = grid[grid.length-1].row + 1; // both inputs are square

    const printGrid = (g) => {
        console.log("-------------------");
        for (let row=0; row<edgeLength; row++){
            const rowVals = [];
            for (let col=0; col<edgeLength; col++){
                let value = val(g, row, col);
                if (value !== 0 && !value){ value = " " }
                rowVals.push(value);
            }
            console.log(`${rowVals.join(' ')}`);
        }
    };

    printGrid(grid);

    const checkDistance = (row,col,direction) => {
        const currentVal = val(grid, row,col);
        let distance = 0;
        if (direction === "up"){
            for (let i=row-1; i>=0; i--){
                distance++;
                const checkVal = val(grid, i, col);
                if (checkVal >= currentVal){
                    break;
                }
            }
        }
        if (direction === "down"){
            for (let i=row+1; i<edgeLength; i++){
                distance++;
                const checkVal = val(grid, i, col);
                if (checkVal >= currentVal){
                    break;
                }
            }
        }
        if (direction === "left"){
            for (let i=col-1; i>=0; i--){
                distance++;
                const checkVal = val(grid, row, i);
                if (checkVal >= currentVal){
                    break;
                }
            }
        }
        if (direction === "right"){
            for (let i=col+1; i<edgeLength; i++){
                distance++;
                const checkVal = val(grid, row, i);
                if (checkVal >= currentVal){
                    break;
                }
            }
        }
        return distance;
    };

    const checkCell = (row,col) => {
        return checkDistance(row,col,"up") * checkDistance(row,col,"down") * checkDistance(row,col,"left") * checkDistance(row,col,"right");
    };

    const scores = [];
    for (let col=0; col<edgeLength; col++){
        for (let row=0; row<edgeLength; row++){
            scores.push({
                row,
                col,
                val: checkCell(row, col)
            });
        }
    }
    printGrid(scores);

    const answer = Math.max(...scores.map(s => s.val));
    console.log(`answer: ${answer}`);
};

module.exports = { run };
