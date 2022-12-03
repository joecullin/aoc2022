const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const sacks = input.map(line => {
        const splitIndex = line.length / 2;
        const parts = [
            line.substring(0, splitIndex).split(''),
            line.substring(splitIndex).split('')
        ];

        let commonLetter;
        parts[0].forEach(letter => {
            if (parts[1].some(compareLetter => letter === compareLetter)){
                commonLetter = letter;
            }
        }); 
        
        return {commonLetter, parts};
    });

    const priorityValues = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const priorities = sacks.map(sack => {
        return priorityValues.indexOf(sack.commonLetter);
    });
    
    const computeSum = (previousValue, currentValue) => previousValue + currentValue;
    const answer = priorities.reduce(computeSum, 0);
    console.log(`answer: ${answer}`);
};

module.exports = { run };
