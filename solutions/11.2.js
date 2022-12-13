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

    let common = 1;
    monkeys.forEach(m => {
        m.inspections = 0;
        common = common * m.testDivisible;
    });
    console.log(`common: ${common}`);

    const shrink = () => {
        let done = true; // disable for now
        while (!done){
            const allItems = [];
            monkeys.forEach(monkey => {
                allItems.push(...monkey.items);
            });
            // console.log(`all: ${JSON.stringify(allItems)}`);
            const minItem = Math.min(...allItems);
            // console.log(`min: ${minItem}`);
            if (minItem < common){
                done = true;
            }
            else{
                monkeys.forEach( (monkey, m) => {
                    monkey.items.forEach( (item, i) => {
                        monkeys[m].items[i] = item - common;
                    });
                });
            }
            // console.log("now");        
            // console.log(monkeys);
        }
    };

    for (let i=0; i<3; i++){
        monkeys.forEach(monkey => {
            while (monkey.items.length){
                monkey.inspections++;
                let item = monkey.items.shift();
                const expr = monkey.operation.replace(/old/g, item);
                item = eval(expr);
                const throwTo = item % monkey.testDivisible === 0 ? monkey.ifTrue : monkey.ifFalse;
                monkeys[throwTo].items.push(item);
            }
        });
        console.log(`================== after round ${i+1}:`);
        console.log(monkeys);
        shrink();
    }

    monkeys.sort( (a,b) => a.inspections - b.inspections);
    const answer = monkeys.pop().inspections * monkeys.pop().inspections;
    console.log(`answer: ${answer}`);
};



// Next tack: try maintaining the expression instead of tracking the numbers.



module.exports = { run };
