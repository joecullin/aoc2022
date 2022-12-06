const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const chars = input[0].split('');

    const hasDupes = (buffer) => {
        const seen = {};
        buffer.forEach(char => {
            seen[char] = true;
        });
        return (Object.keys(seen).length < buffer.length);
    };

    let answer;
    const buffer = [];
    for (let i=0; i<chars.length; i++){
        buffer.push(chars[i]);
        if (buffer.length > 4){
            buffer.shift();
        }
        if (buffer.length === 4){
            if (!hasDupes(buffer)){
                answer = i+1;
                break;
            }
        }
    }
    console.log(`answer: ${answer}`);
};

module.exports = { run };
