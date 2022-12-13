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
            current.items = valueString.split(', ');
        }
        if (label.includes('Operation')){
            current.operation = valueString.split(' = ')[1];
        }
        if (label.includes('Test')){
            current.testDivisible = valueString.split(' by ')[1];
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

    for (let i=0; i<20; i++){
        monkeys.forEach(monkey => {
            while (monkey.items.length){
                monkey.inspections++;
                let item = monkey.items.shift();
                const expr = monkey.operation.replace(/old/g, item);
                item = eval(expr);
                item = Math.floor(item/3);
                const throwTo = item % monkey.testDivisible === 0 ? monkey.ifTrue : monkey.ifFalse;
                monkeys[throwTo].items.push(item);
            }
        });
    }

    monkeys.sort( (a,b) => a.inspections - b.inspections);
    const answer = monkeys.pop().inspections * monkeys.pop().inspections;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
