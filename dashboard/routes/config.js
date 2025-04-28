const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./auth');
const fs = require('fs').promises;
const path = require('path');

// Get configuration page
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const configPath = path.join(process.cwd(), '..', 'config.json');
        const config = require(configPath);
        
        res.render('config', {
            title: 'Bot Configuration',
            config
        });
    } catch (error) {
        console.error('Error loading configuration:', error);
        res.status(500).render('error', {
            message: 'Error loading configuration'
        });
    }
});

// Update configuration
router.post('/update', isAuthenticated, async (req, res) => {
    try {
        const {
            knowledge,
            embedTitle,
            useEmbed,
            model,
            swearWordsFile
        } = req.body;

        const configPath = path.join(process.cwd(), '..', 'config.json');
        const config = {
            knowledge,
            embedTitle,
            useEmbed: useEmbed === 'on',
            model,
            swearWordsFile
        };

        await fs.writeFile(configPath, JSON.stringify(config, null, 2));

        req.flash('success', 'Configuration updated successfully');
        res.redirect('/config');
    } catch (error) {
        console.error('Error updating configuration:', error);
        req.flash('error', 'Failed to update configuration');
        res.redirect('/config');
    }
});

module.exports = router;