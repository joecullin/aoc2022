const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const grid = [];
    input.forEach((line, row) => {
        line.split('').forEach( (val,col) => {
            grid.push({
                id: [row,col].join(":"),
                row,
                col,
                val: parseInt(val),
            });
        });
    });
    const val = (g, row,col) => {
        const id = [row,col].join(":");
        const cell = g.find(c => c.id === id);
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

    let previousVals = [];
    const checkCell = (row,col) => {
        const currentVal = val(grid, row,col);
        let visible;
        if (col === 0 || row === 0 || col === edgeLength-1 || row === edgeLength-1){
            visible = 1;
        }
        else if (Math.max(...previousVals) < currentVal){
            visible = 1;
        }
        previousVals.push(currentVal);
        const result = {
            id: [row,col].join(":"),
            row,
            col,
            val: visible
        };
        return result;
    };

    const topView = [];
    for (let col=0; col<edgeLength; col++){
        previousVals = [];
        for (let row=0; row<edgeLength; row++){
            topView.push(checkCell(row, col));
        }
    }
    console.log("top:");
    printGrid(topView);

    const leftView = [];
    for (let row=0; row<edgeLength; row++){
        previousVals = [];
        for (let col=0; col<edgeLength; col++){
            leftView.push(checkCell(row, col));
        }
    }
    console.log("left:");
    printGrid(leftView);

    const rightView = [];
    for (let row=0; row<edgeLength; row++){
        previousVals = [];
        for (let col=edgeLength-1; col>=0; col--){
            rightView.push(checkCell(row, col));
        }
    }
    console.log("right:");
    printGrid(rightView);

    const bottomView = [];
    for (let col=0; col<edgeLength; col++){
        previousVals = [];
        for (let row=edgeLength-1; row>=0; row--){
            bottomView.push(checkCell(row, col));
        }
    }
    console.log("bottom:");
    printGrid(bottomView);

    const visible = [];
    [topView, rightView, bottomView, leftView].forEach(view => {
        for (let row=0; row<edgeLength; row++){
            for (let col=0; col<edgeLength; col++){
                let value = val(view, row, col);
                if (value === 1){
                    const id = [row,col].join(":");
                    if (!visible.some(c => c.id === id)){
                        visible.push({
                            id,
                            row,
                            col,
                            val: 1
                        });
                    }
                }
            }
        }
    });
    printGrid(visible);
    console.log(visible.length);
};

module.exports = { run };
