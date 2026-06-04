const fs = require('fs');

function callback(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Async file written successfully');
}

function writeFileAsync() {
    fs.writeFile('async.txt', 'This creates / overwrites the file asynchronously', callback);
}

function writeFileSync() {
    fs.writeFileSync('sync.txt', 'This creates / overwirtes the file synchronously');
    console.log('Sync file written successfully');
}

console.log('Starting...');

writeFileAsync();
writeFileSync();

console.log('Ending...');