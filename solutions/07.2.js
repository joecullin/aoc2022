const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let currentDirIndex;
    const dirs = [{
        parent: -1,
        dirName: "/",
        subDirs: [],
        files: [],
    }];
    input.forEach(line => {
        if (line.indexOf("$ cd ") === 0){
            const targetDir = line.replace(/\$\scd\s/, '');
            if (targetDir === "/"){
                currentDirIndex = 0;
            }
            else if (targetDir === ".."){
                currentDirIndex = dirs[currentDirIndex].parent;
            }
            else{
                currentDirIndex = dirs[currentDirIndex].subDirs.find(subDirIndex => dirs[subDirIndex].dirName === targetDir);
            }
        }
        else if (line.indexOf("$ ls") === 0){
            // nothing to do
        }
        else if (line.indexOf("dir ") === 0){
            const dirName = line.replace(/dir\s/, '');
            dirs.push({
                parent: currentDirIndex,
                dirName,
                subDirs: [],
                files: [],
            });
            dirs[currentDirIndex].subDirs.push(dirs.length-1);
        }
        else{
            const parts = line.split(' ');
            dirs[currentDirIndex].files.push({
                size: parseInt(parts[0]),
                name: parts[1],
            });
        }
    });

    const dirSize = (dirIndex) => {
        let total = 0;
        dirs[dirIndex].files.forEach(fileInfo => total += fileInfo.size);
        dirs[dirIndex].subDirs.forEach(subDirIndex => total += dirSize(subDirIndex));
        return total;
    };
    for (let i=0; i<dirs.length; i++){
        dirs[i].totalSize = dirSize(i);
    }

    const dirSizes = dirs.map(dir => dir.totalSize);
    dirSizes.sort((a,b) => a-b);
    const freeSpace = 70000000 - dirSizes[dirSizes.length-1];
    const neededSpace = 30000000 - freeSpace;

    const answer = dirSizes.find(dir => dir >= neededSpace);
    console.log(`answer: ${answer}`);
};

module.exports = { run };
