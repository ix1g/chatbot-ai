const axios = require('axios');
const { GEMINI_API_URL } = require('../config/config');

async function askGemini(content, knowledge) {
    try {
        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: knowledge }]
                    },
                    {
                        role: "user",
                        parts: [{ text: content }]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        const generatedText = response.data.candidates[0].content.parts[0].text;
        return generatedText || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error(
            "Error connecting to Gemini API:",
            error.response ? error.response.data : error.message
        );
        return "Error connecting to Gemini API.";
    }
}

module.exports = { askGemini };