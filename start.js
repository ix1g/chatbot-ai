require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');

// Function to build Tailwind CSS
async function buildTailwind() {
    if (process.env.DASHBOARD === 'true') {
        console.log('Building Tailwind CSS...');
        const tailwindBuild = spawn('npx', [
            'tailwindcss',
            '-i',
            './dashboard/public/css/style.css',
            '-o',
            './dashboard/public/css/output.css',
            '--minify'
        ]);

        tailwindBuild.stdout.on('data', (data) => {
            console.log(`Tailwind: ${data}`);
        });

        tailwindBuild.stderr.on('data', (data) => {
            console.error(`Tailwind Error: ${data}`);
        });

        // Wait for Tailwind build to complete
        await new Promise((resolve) => {
            tailwindBuild.on('close', resolve);
        });
    }
}

// Start the application
async function startApp() {
    try {
        // Build Tailwind CSS if dashboard is enabled
        await buildTailwind();

        // Start the main application
        require('./src/index');

        console.log('\n=================================');
        console.log('🤖 Bot is running successfully!');
        if (process.env.DASHBOARD === 'true') {
            console.log(`📊 Dashboard available at http://localhost:${process.env.DASHBOARD_PORT || 3000}`);
        }
        console.log('=================================\n');
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

startApp();