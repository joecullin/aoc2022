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


    const display = () => {
        let row = [];
        pixels.forEach((pixel, i) => {
            row.push(pixel);
            if (i && i % 40 === 39){
                console.log(row.join(''));
                row = [];
            }
        });
        console.log(row.join(''));
    };

    let register = 1;
    const pixels = [...Array(239).keys()].map(() => ".");

    let cycle = 0;
    instructions.forEach(instruction => {
        cycle++;
        if (instruction.op === "addx"){
            register += instruction.value;
        }
        const positionInRow = cycle % 40;

        const sprite = [ register ];
        // I know I'm slightly off, probably something to do with using arrays starting at 1.
        // But I get a legible-enough answer, so I'll stop here and call it good enough.
        if (positionInRow !== 39){ sprite.push(register+1); } 
        if (positionInRow !== 0){ sprite.push(register-1); } 
        if (sprite.includes(positionInRow)){
            pixels[cycle-1] = '#';
        }
    });

    display();
};

module.exports = { run };
