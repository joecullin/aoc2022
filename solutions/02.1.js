const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const guide = input
        .map(line => { return line
            .replace(/[AX]/g, 'rock')
            .replace(/[BY]/g, 'paper')
            .replace(/[CZ]/g, 'scissors')})
        .map(line => {
            const [them, me] = line.split(/\s/);
            return {them, me};
        });
    console.log(guide);

    const playRound = (round) => {
        let score = 0;
        if (round.me === "rock"){
            score += 1;
            if (round.them === "rock"){
                score += 3; // draw
            }
            if (round.them === "scissors"){
                score += 6; // win
            }
        }
        if (round.me === "paper"){
            score += 2;
            if (round.them === "paper"){
                score += 3; // draw
            }
            if (round.them === "rock"){
                score += 6; // win
            }
        }
        if (round.me === "scissors"){
            score += 3;
            if (round.them === "scissors"){
                score += 3; // draw
            }
            if (round.them === "paper"){
                score += 6; // win
            }
        }
        return {score, ...round};
    };

    const rounds = guide.map(round => playRound(round));

    const computeSum = (previousValue, currentValue) => previousValue + currentValue;
    const answer = rounds.map(round => round.score).reduce(computeSum, 0);
    console.log(`answer: ${answer}`);
};

module.exports = { run };
