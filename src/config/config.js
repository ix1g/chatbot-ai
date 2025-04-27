require('dotenv').config();

module.exports = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GOOGLE_CLOUD_VISION_KEYFILE: process.env.GOOGLE_CLOUD_VISION_KEYFILE,
    GEMINI_API_URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    COOLDOWN_TIME: 1500,
    botConfig: require('../../config.json'),
    swearWords: require('../../badwords-in-all.json')
};