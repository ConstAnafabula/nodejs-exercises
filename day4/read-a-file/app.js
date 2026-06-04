const fs = require(`fs`);

console.log(`Starting...`);

function callBack(ye, data) {
    if (ye) {
        console.error(ye);
        return;
    }
    console.log(data);
}

function readFileAsync() {
    fs.readFile("async.txt", "utf8", callBack);
}

function readFileSync() {
    const data = fs.readFileSync(`sync.txt`, `utf8`);
    console.log(data);
}

readFileAsync();
readFileSync();

console.log(`Ending...`);