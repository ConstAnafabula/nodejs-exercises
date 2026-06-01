const info = require('./student');

console.log("=== STUDENT BACKEND PROFILE ===");
console.log(`Name: ${info.name}`);
console.log(`Course: ${info.course}`);
console.log(`Learning Goals: ${info.learningGoals}`);

console.log(`Node Version: ${process.version}`);

console.log(`Current Folder Path: ${__dirname}`);
console.log(`Current File Path: ${__filename}`);
setTimeout(() => {
    console.log("Profile system fully loaded!");
},  3000);