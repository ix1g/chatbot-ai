const { swearWords } = require('../config/config');

function containsSwearWords(text) {
    return swearWords.some((word) =>
        text.toLowerCase().includes(word.toLowerCase())
    );
}

function splitMessage(text, maxLength = 2000) {
    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
        chunks.push(text.slice(i, i + maxLength));
    }
    return chunks;
}

module.exports = {
    containsSwearWords,
    splitMessage
};