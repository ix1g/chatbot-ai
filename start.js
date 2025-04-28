require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');

function startService(name, command, args, cwd) {
    console.log(`Starting ${name}...`);
    const process = spawn(command, args, {
        cwd: cwd,
        stdio: 'pipe'
    });

    process.stdout.on('data', (data) => {
        console.log(`[${name}] ${data.toString().trim()}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`[${name}] ${data.toString().trim()}`);
    });

    process.on('close', (code) => {
        console.log(`[${name}] process exited with code ${code}`);
    });

    return process;
}

// Start the Discord bot
const bot = startService(
    'Discord Bot',
    'node',
    ['index.js'],
    __dirname
);

// Start the Dashboard
const dashboard = startService(
    'Dashboard',
    'node',
    ['server.js'],
    path.join(__dirname, 'dashboard')
);

// Handle process termination
process.on('SIGTERM', () => {
    console.log('Shutting down services...');
    bot.kill();
    dashboard.kill();
});

process.on('SIGINT', () => {
    console.log('Shutting down services...');
    bot.kill();
    dashboard.kill();
    process.exit(0);
});