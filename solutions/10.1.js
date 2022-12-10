const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const instructions = [];
    input.forEach(line => {
        const [op, valueString] = line.split(' ');
        const value = op === "noop" ? null : parseInt(valueString);
        if (op === "addx"){
            instructions.push({ op: "addx_first_cycle" }); // effectively a no-op
        }
        instructions.push({ op, value });
    });

    const sampleIndexes = [20, 60, 100, 140, 180, 220];
    let register = 1;
    let answer = 0;

    for (let cycle=1; cycle<=220; cycle++){
        const instruction = instructions.shift();

        if (sampleIndexes.includes(cycle)){
            const strength = cycle * register;
            answer += strength;
        }

        if (instruction.op === "addx"){
            register += instruction.value;
        }

        if (!instructions.length){
            break;
        }
    }

    console.log(`answer: ${answer}`);
};

module.exports = { run };
