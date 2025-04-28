const fs = require('fs');
const path = require('path');

try {
    console.log('🎨 Ensuring CSS directory structure...');
    
    const cssDir = path.join(__dirname, 'public', 'css');
    if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true });
    }

    console.log('✨ CSS setup completed!');
} catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
}