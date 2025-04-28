const { exec } = require('child_process');
const path = require('path');

console.log('Building Tailwind CSS...');
exec('npx postcss ./public/css/style.css -o ./public/css/output.css', {
    cwd: path.join(__dirname)
}, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`CSS build complete: ${stdout}`);
});