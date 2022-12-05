const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const stacks = [];
    const instructions = [];
    input.forEach(line => {
        if (line.indexOf('[') > -1){
            const crates = [...line.matchAll(/.(.).(?:.|$)/g)].map(match => match[1].trim());
            crates.forEach((crate, i) => {
                if (crate !== ""){
                    if (!stacks[i]){
                        stacks[i] = [];
                    }
                    stacks[i].unshift(crate);
                }
            });
        }
        else if (line.indexOf('move') === 0){
            const parts = [...line.matchAll(/(\d+)/g)].map(match => match[1]);
            // (subtract one to translate to zero-based stack ids)
            instructions.push({crateCount: parts[0], from: parts[1]-1, to: parts[2]-1});
        }
    });

    instructions.forEach(move => {
        const crates = stacks[move.from].splice(move.crateCount * -1);
        stacks[move.to].push(...crates);
    });

    const answer = stacks.map(stack => stack[stack.length-1]).join('');
    console.log(`answer: ${answer}`);
};

module.exports = { run };
