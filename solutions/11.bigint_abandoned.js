const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const monkeys = [];
    let current = {};
    const processCurrent = () => {
        if (Object.keys(current).length){
            monkeys.push(current);
            current = {};
        }
    };
    input.forEach(line => {
        if (line.includes('Monkey')){
            processCurrent();
        }
        const [label, valueString] = line.split(':').map(p => p.trim());
        if (label.includes('Starting')){
            current.items = valueString.split(', ').map(i => BigInt(i));
        }
        if (label.includes('Operation')){
            current.operation = valueString.split(' = ')[1].replace(/(\d+)/, (matches) => { 
console.log(JSON.stringify(matches));
return `BigInt(${matches})`; });
        }
        if (label.includes('Test')){
            current.testDivisible = BigInt(valueString.split(' by ')[1]);
        }
        if (label.includes('true')){
            current.ifTrue = valueString.split(' monkey ')[1];
        }
        if (label.includes('false')){
            current.ifFalse = valueString.split(' monkey ')[1];
        }
    });
    processCurrent();

    monkeys.forEach(m => m.inspections = 0);

    for (let i=0; i<1000; i++){
        monkeys.forEach( (monkey, m) => {
            while (monkey.items.length){
                monkey.inspections++;
                let item = monkey.items.shift();
                console.log(`monkey ${m} item: ${item}`);
                const expr = monkey.operation.replace(/old/g, `BigInt(${item})`);
                console.log(`${expr}`);
                item = BigInt(eval(expr));
                console.log(`---> ${item}`);
                // item = item/BigInt(3); // bigint division drops remainder
                // console.log(`after divide by 3 ---> ${item}`);
                const check = item % monkey.testDivisible;
                console.log(`remainder: ${check}`);
                const throwTo = item % monkey.testDivisible == 0 ? monkey.ifTrue : monkey.ifFalse;
                console.log(`---> throw to ${throwTo}`);
                monkeys[throwTo].items.push(item);
            }
        });

        console.log(`================ after round ${i+1}`);
        console.log(monkeys);
    }

    monkeys.sort( (a,b) => a.inspections - b.inspections);
    const answer = monkeys.pop().inspections * monkeys.pop().inspections;
    console.log(`answer: ${answer}`);
};


// ideas:
//   - continually reduce all by some amount (something divisible by 3), so the max never gets too high? -- I don't think so. Some of the numbers stay small.
//   - bigint?
//   - build up a bigger & bigger expression, then eval it all at the end?


module.exports = { run };
