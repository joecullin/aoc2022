const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const doesContain = (outer, inner) => {
        return (outer.start <= inner.start && outer.end >= inner.end); 
    };

    const pairs = input.map(line => {
        const [firstAssignment, secondAssignment] = line.split(',').map(pair => {
            const [start, end] = pair.split('-').map(val => parseInt(val));
            return {start, end};
        });
        const fullyContained = doesContain(firstAssignment, secondAssignment) || doesContain(secondAssignment, firstAssignment);
        return {firstAssignment, secondAssignment, fullyContained};
    });

    const answer = pairs.filter(pair => pair.fullyContained).length;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
