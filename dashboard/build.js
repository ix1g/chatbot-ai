const { exec } = require('child_process');

console.log('Building Tailwind CSS...');
exec('npx tailwindcss -i ./public/css/style.css -o ./public/css/output.css --minify', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Tailwind build complete: ${stdout}`);
});