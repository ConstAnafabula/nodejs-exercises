const fs = require(`fs`);

function callBack(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('File has been updated asynchronously');
}
function appendAsync() {
    fs.appendFile('sample.txt', '\n\nThis adds a new line asynchronously', callBack);
}
function appendSync() {
    fs.appendFileSync('sample.txt', '\n\nThis adds a new line synchronously');
    console.log('File has been updated synchronously');
}

console.log('Starting...');
appendAsync();
appendSync();
console.log('Almost done!');