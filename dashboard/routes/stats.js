const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        // TODO: Get these stats from your bot
        const stats = {
            totalMessages: 0,
            activeUsers: 0,
            responseTimes: [],
            uptime: 0
        };
        
        res.render('stats', { 
            title: 'Bot Statistics',
            stats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).render('error', { 
            message: 'Error fetching statistics' 
        });
    }
});

module.exports = router;