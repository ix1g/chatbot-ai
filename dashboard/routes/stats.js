const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./auth');

// Get stats page
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const stats = {
            totalMessages: global.messageCount || 0,
            activeUsers: Object.keys(global.userCooldowns || {}).length,
            avgResponseTime: calculateAverageResponseTime(),
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage()
        };

        res.render('stats', {
            title: 'Bot Statistics',
            stats
        });
    } catch (error) {
        console.error('Error loading stats:', error);
        res.status(500).render('error', {
            message: 'Error loading statistics'
        });
    }
});

// Get bot status (for AJAX updates)
router.get('/status', isAuthenticated, (req, res) => {
    try {
        const status = {
            status: 'Online',
            lastUpdate: new Date().toISOString(),
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime()
        };
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get bot status' });
    }
});

// Helper function to calculate average response time
function calculateAverageResponseTime() {
    if (!global.responseTimes || global.responseTimes.length === 0) {
        return 0;
    }
    const sum = global.responseTimes.reduce((a, b) => a + b, 0);
    return sum / global.responseTimes.length;
}

module.exports = router;