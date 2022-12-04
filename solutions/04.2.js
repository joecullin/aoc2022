const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const pairs = input.map(line => {
        return line.split(',').map(pair => {
            const [start, end] = pair.split('-').map(val => parseInt(val));
            return {start, end};
        });
    });

    const answer = pairs.filter(pair => {
        // iterate over both pairs, marking each section touched.
        const assigned = {};
        pair.forEach(assignment => {
            for (let i=assignment.start; i<=assignment.end; i++){
                assigned[i] = (assigned[i] || 0) + 1;
            }
        });
        // return true if any section was marked more than once.
        return Object.values(assigned).some(count => count !== 1);
    }).length;

    console.log(`answer: ${answer}`);
};

module.exports = { run };
