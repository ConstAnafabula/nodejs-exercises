const config = require('./config');

console.log("Starting server...");

setTimeout(() => {
    console.log("Loading configuration...");
},  2000);

setTimeout(() => {
    console.log("Checking runtime...");
},  4000);

setTimeout(() => {
    console.log(`Node Version: ${process.version}`);
    console.log(`Current Directory: ${process.cwd()}`);
    console.log(`App Name: ${config.appName}`);
    console.log(`Port: ${config.port}`);
    console.log(`Developer: ${config.developer}`);
},  6000)

setTimeout(() => {
    console.log(`${config.appName} is running on port ${config.port} created by ${config.developer}`);
    console.log("Server started successfully!");
},  8000);

setTimeout(() => {
    console.log("Backend ready for requests");
},  10000);