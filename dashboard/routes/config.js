const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        // Load current configuration
        const config = require('../../config.json');
        res.render('config', { 
            title: 'Bot Configuration',
            config
        });
    } catch (error) {
        console.error('Error loading config:', error);
        res.status(500).render('error', { 
            message: 'Error loading configuration' 
        });
    }
});

router.post('/update', isAuthenticated, async (req, res) => {
    try {
        const fs = require('fs').promises;
        const updatedConfig = {
            ...require('../../config.json'),
            ...req.body
        };
        
        await fs.writeFile(
            require('path').join(__dirname, '../../config.json'),
            JSON.stringify(updatedConfig, null, 2)
        );
        
        res.redirect('/config');
    } catch (error) {
        console.error('Error updating config:', error);
        res.status(500).render('error', { 
            message: 'Error updating configuration' 
        });
    }
});

module.exports = router;