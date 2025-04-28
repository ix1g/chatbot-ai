# Chatbot-AI

A sophisticated Discord bot powered by Gemini AI API and Google Cloud Vision, providing intelligent chat and image analysis capabilities for your community. Features both a Discord bot interface and a web-based admin dashboard.

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
- **Web Dashboard**:
  - Real-time bot monitoring
  - Configuration management
  - Usage statistics
  - Performance metrics
- **Customizable**: Configure knowledge base, embed styles, and content filtering
- **Rate Limiting**: Prevents spam with user cooldowns and slow mode
- **Slash Commands**: Easy channel setup with `/set-chat-channel`

---

## Project Structure

```
├── src/                  # Bot source code
│   ├── config/          # Configuration management
│   ├── handlers/        # Command and message handlers
│   ├── services/        # Core services (AI, Image processing)
│   └── utils/           # Utility functions
├── dashboard/           # Web dashboard
│   ├── controllers/     # Dashboard logic
│   ├── public/         # Static assets
│   ├── routes/         # Route handlers
│   ├── views/          # EJS templates
│   └── server.js       # Dashboard server
└── config.json         # Bot configuration
```

---

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js >=16.0.0 installed. [Download here](https://nodejs.org/)
2. **Discord Bot**: Create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
3. **Gemini API Key**: Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. **Google Cloud Vision**: Set up Google Cloud Vision API (optional, for image analysis)

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

   # Dashboard Configuration
   DASHBOARD_PORT=3000
   DASHBOARD_USERNAME=admin
   DASHBOARD_PASSWORD=your_secure_password
   SESSION_SECRET=your_session_secret
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

5. Start the application:
   ```bash
   # Start both bot and dashboard
   npm start

   # Development mode (auto-restart on changes)
   npm run dev

   # Run bot and dashboard separately
   npm run bot
   npm run dashboard
   ```

---

## Usage

### Discord Bot
1. **Channel Setup**: Use `/set-chat-channel` to designate an AI chat channel
2. **Text Interaction**: Send messages to get AI-powered responses
3. **Image Analysis**: Upload images to get detailed analysis including:
   - Text extraction
   - Object recognition
   - Scene understanding
   - Face detection
4. **Context Memory**: The bot remembers previous interactions per user for more contextual responses

### Dashboard
1. Access the dashboard at `http://localhost:3000` (or your configured port)
2. Log in with your dashboard credentials
3. Features available:
   - Real-time bot status monitoring
   - Message statistics and user activity
   - Memory usage and performance metrics
   - Bot configuration management
   - Uptime tracking

---

## Environment Variables

### Bot Configuration
- `DISCORD_TOKEN`: Your Discord bot token
- `GEMINI_API_KEY`: Your Gemini API key
- `GOOGLE_CLOUD_VISION_KEYFILE`: Path to Google Cloud Vision credentials (optional)

### Dashboard Configuration
- `DASHBOARD_PORT`: Port for the web dashboard (default: 3000)
- `DASHBOARD_USERNAME`: Admin username for dashboard access
- `DASHBOARD_PASSWORD`: Admin password for dashboard access
- `SESSION_SECRET`: Secret for session management

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
