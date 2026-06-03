const start = performance.now();
const config = require('./config');
const logger = require('./logger');

function startApp() {
    logger.log(`Starting configuration for ${config.appName}`);
    logger.log(`Checking runtime...`);
    logger.log(`Node Version: ${process.version}`);
}

function loadConfiguration() {
    logger.log(`Loading configuration...`);
}

function connectToDatabase() {
    logger.log(`Connecting to database...`);
}

function registerRoutes() {
    logger.log(`Registering API routes...`);
}

function serverListen() {
    logger.log(`Server listening on port ${config.port}`);
}

function backendReady() {
    logger.log(`Backend ready for requests`);
}

function checkEndRuntime(startTime) {
    const end = performance.now();
    const runtime = end - startTime;
    logger.log(`Startup runtime: ${runtime.toFixed(2)} ms`);
}

startApp();
setTimeout(loadConfiguration, 1000);
setTimeout(connectToDatabase, 2000);
setTimeout(registerRoutes, 3000);
setTimeout(serverListen, 4000);
setTimeout(backendReady, 5000);
setTimeout(() => checkEndRuntime(start), 6000);