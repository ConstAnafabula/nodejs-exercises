const fs = require('fs')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const activities = []

function optionsMenu() {

console.log('\n1. Create a file to store my activities.');
console.log('2. Log my activities to a file.');
console.log('3. View my logged activities.');
console.log('4. Enter an activity.');
console.log('5. Exit the application.\n');

readline.question('Please select an option (1-5): ', optionHandler);
}

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

function enterActivity() {
    console.log('Please enter your activities for the day. Type "done" when finished.')
    readline.question('Enter an activity: ', inputHandler);
}
function optionHandler(option) {
    switch (option) {
        case '1':
            createFile();
            break;
        case '2':
            logActivities();
            break;
        case '3':
            viewActivities();
            break;
        case '4':
            enterActivity();
            break;
        case '5':
            console.log('Exiting the application. Goodbye!');
            readline.close();
            break;
        default:
            console.log('Invalid option. Please select an option between 1 and 4.');
    }
}

function searchFile(fileName) {
    try {
        fs.accessSync(fileName + '.txt', fs.constants.F_OK);

    } catch (err) {
        console.error(`File "${fileName}.txt" does not exist. Please create the file first.`);
        return false;
    }
    return true;
}

function createFile() {
    readline.question('Enter the name of the file to create: ', (fileName) => {
        fs.writeFile(fileName + '.txt', '', handleError);
        console.log(`File "${fileName}.txt" created successfully.`);
        optionsMenu();
    })
}

function doneViewing() {
    console.log('Press Enter to return to the options menu.');
    readline.question('', () => {
        optionsMenu();
    })
}

function viewActivities(found) {
    let done = false;
    readline.question('Enter the name of the file to view: ', (fileName) => {
        found = searchFile(fileName)
        if (!found) {
            optionsMenu();
            return;
        }
        fs.readFile(fileName + '.txt', 'utf8', handleResult);
        setTimeout(doneViewing, 1000);
    })
    
}

function logActivities(found) {
    readline.question('Enter the name of the file to log activities: ', (fileName) => {    
        found = searchFile(fileName);
        
        if (!found) {
            optionsMenu();
            return;
        }
        const activityData = activities.join('\n');
        fs.appendFile(fileName + '.txt', activityData + '\n', handleError);
        console.log('Activities logged successfully.');
        optionsMenu();
    })
}

function inputHandler(activity) {
    if (activity.toLowerCase() === 'done') {
        console.log(activities)
        optionsMenu();
        return;
    }
    activities.push(activity);
    enterActivity();
}

console.log('Welcome to the Activity Logger!')
optionsMenu()