# Chatbot-AI

A sophisticated Discord bot powered by Gemini AI API and Google Cloud Vision, providing intelligent chat and image analysis capabilities for your community.

---

## Features

- **AI-Powered Chat**: Leverages the Gemini API for intelligent responses
- **Image Analysis**: 
  - Text recognition in images
  - Object and scene detection
  - Face detection with emotion analysis
  - Image optimization and processing
- **User Memory System**:
  - Per-user context memory
  - Image analysis caching
  - Conversation history tracking
- **Customizable**: Configure knowledge base, embed styles, and content filtering
- **Rate Limiting**: Prevents spam with user cooldowns and slow mode
- **Slash Commands**: Easy channel setup with `/set-chat-channel`

---

## Project Structure

```
src/
├── config/
│   └── config.js         # Configuration management
├── handlers/
│   ├── commandHandler.js # Slash command handling
│   └── messageHandler.js # Message processing
├── services/
│   ├── geminiService.js  # AI interaction
│   └── imageService.js   # Image processing
├── utils/
│   └── messageUtils.js   # Utility functions
└── index.js             # Main application entry
```

---

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js >=16.0.0 installed. [Download here](https://nodejs.org/)
2. **Discord Bot**: Create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
3. **Gemini API Key**: Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. **Google Cloud Vision**: Set up Google Cloud Vision API (optional, for image analysis) [Google Vision API](https://console.cloud.google.com/apis/library/vision.googleapis.com?project=elite-ceremony-456322-s5)

---

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/chatbot-ai.git
   cd chatbot-ai
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   # Discord bot token
   DISCORD_TOKEN=your_discord_bot_token

   # Gemini API key
   GEMINI_API_KEY=your_gemini_api_key

   # Google Cloud Vision API key file path (optional)
   GOOGLE_CLOUD_VISION_KEYFILE=path/to/your/google-cloud-vision-key.json
   ```

4. Configure the bot in `config.json`:
   ```json
   {
     "knowledge": "Your bot's knowledge base",
     "embedTitle": "Chatbot Response",
     "useEmbed": true,
     "swearWordsFile": "./badwords-in-all.json"
   }
   ```

5. Start the bot:
   ```bash
   # Regular mode
   npm start

   # Development mode (auto-restart on changes)
   npm run dev
   ```

---

## Usage

1. **Channel Setup**: Use `/set-chat-channel` to designate an AI chat channel
2. **Text Interaction**: Send messages to get AI-powered responses
3. **Image Analysis**: Upload images to get detailed analysis including:
   - Text extraction
   - Object recognition
   - Scene understanding
   - Face detection
4. **Context Memory**: The bot remembers previous interactions per user for more contextual responses

---

## Environment Variables

- `DISCORD_TOKEN`: Your Discord bot token
- `GEMINI_API_KEY`: Your Gemini API key
- `GOOGLE_CLOUD_VISION_KEYFILE`: Path to Google Cloud Vision credentials (optional)

---

## Customizing the Model

You can use different Gemini models by modifying the API endpoint in `src/config/config.js`:

Available models:
- gemini-1.5-flash (default, faster responses)
- gemini-1.5-pro-latest (more capable)
- Other models as they become available

---

## Contributing

Contributions are welcome! Feel free to:
- Submit issues
- Create pull requests
- Suggest new features
- Improve documentation

---

## License

All rights reserved to Sayrz Studio. Visit us at [https://sayrz.com](https://sayrz.com)
