const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});

    const computeSum = (previousValue, currentValue) => previousValue + currentValue;

    const elves = [];
    let elf = [];
    input.forEach(item => {
        if (!item){
            elves.push([...elf]);
            elf = [];
        }
        else{
            elf.push(item);
        }
    });
    elves.push([...elf]);

    const sortedTotals = elves.map(elf => {
        return elf.reduce(computeSum);
    })
    .sort((a,b) => a - b);

    const answer = sortedTotals.pop() + sortedTotals.pop() + sortedTotals.pop();
    console.log(`answer: ${answer}`);

};

module.exports = { run };
