const fs = require('fs')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const activities = []

function handleError(err) {
    if (err) {
        console.error('An error occurred:', err);
    }
}

function handleResult(err, data) {
    if (err) {
        console.error('An error occurred:', err);
        return;
    }
    console.log('Logged Activities:\n', data);
}

function inputHandler(activity) {
    if (activity.toLowerCase() === 'done') {
    }
}

function optionHandler(option) {
    switch (option) {
        case '1':
            createFile();
            break;
        case '2':
            // Handle option 2
            break;
        case '3':
            viewActivities();
            break;
        case '4':
            // Handle option 4
            break;
        default:
            console.log('Invalid option. Please select an option between 1 and 4.');
    }
}

function createFile() {
    readline.question('Enter the name of the file to create: ', (fileName) => {
        fs.writeFile(fileName, '', handleError);
        console.log(`File "${fileName}" created successfully.`);
    })
}

function viewActivities() {
    readline.question('Enter the name of the file to view: ', (fileName) => {
        fs.readFile(fileName, 'utf8', handleResult);
    })
}

function logActivities() {
    
}
console.log('Welcome to the Activity Logger!')
console.log('\n1. Create a file to store my activities.');
console.log('2. Log my activities to a file.');
console.log('3. View my logged activities.');
console.log('4. Exit the application.\n');

readline.question('Please select an option (1-4): ', optionHandler);
console.log('Please enter your activities for the day. Type "done" when finished.')

readline.question('Enter an activity: ', inputHandler);