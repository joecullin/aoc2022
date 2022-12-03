const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const groups = [];
    let acc = [];
    input.forEach(line => {
        acc.push(line.split(''));
        if (acc.length === 3){
            groups.push([...acc]);
            acc = [];
        }
    });

    const badges = groups.map(group => {
        const firstPassResults = [];
        group[0].forEach(letter => {
            if (group[1].some(compareLetter => letter === compareLetter)){
                firstPassResults.push(letter);
            }
        });
        let commonLetter;
        group[2].forEach(letter => {
            if (firstPassResults.some(compareLetter => letter === compareLetter)){
                commonLetter = letter;
            }
        });
        return commonLetter;
    });

    const priorityValues = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const priorities = badges.map(badge => {
        return priorityValues.indexOf(badge);
    });
    
    const computeSum = (previousValue, currentValue) => previousValue + currentValue;
    const answer = priorities.reduce(computeSum, 0);
    console.log(`answer: ${answer}`);

};

module.exports = { run };
