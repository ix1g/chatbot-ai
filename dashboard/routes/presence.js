const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./auth');

// Global variable to store presence states (accessible by both bot and dashboard)
global.presenceStates = [
    { name: '🤖 AI Chat', type: 'Playing' },
    { name: '💭 Processing thoughts...', type: 'Watching' },
    { name: '🎯 Ready to chat!', type: 'Listening' },
    { name: '🌟 Learning new things', type: 'Competing' }
];

// Get current presence settings
router.get('/', isAuthenticated, (req, res) => {
    res.render('presence', {
        title: 'Presence Management',
        presenceStates: global.presenceStates,
        currentPresence: global.currentPresenceState || global.presenceStates[0]
    });
});

// Update presence settings
router.post('/update', isAuthenticated, (req, res) => {
    const { name, type } = req.body;
    
    // Update global presence state
    global.currentPresenceState = { name, type };
    
    // Emit presence update event
    if (global.updateBotPresence) {
        global.updateBotPresence(name, type);
    }

    req.flash('success', 'Presence updated successfully');
    res.redirect('/presence');
});

// Add new presence state
router.post('/add', isAuthenticated, (req, res) => {
    const { name, type } = req.body;
    
    global.presenceStates.push({ name, type });
    
    req.flash('success', 'New presence state added');
    res.redirect('/presence');
});

// Remove presence state
router.post('/remove/:index', isAuthenticated, (req, res) => {
    const index = parseInt(req.params.index);
    
    if (index >= 0 && index < global.presenceStates.length) {
        global.presenceStates.splice(index, 1);
    }
    
    req.flash('success', 'Presence state removed');
    res.redirect('/presence');
});

module.exports = router;