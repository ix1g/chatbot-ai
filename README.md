# Chatbot-AI

A Discord bot powered by the Gemini AI API to provide intelligent and interactive chat capabilities for your community.

---

## Features

- **AI-Powered Chat**: Leverages the Gemini API for generating intelligent responses.
- **Customizable**: Configure knowledge, embed styles, and swear word filtering.
- **Rate Limiting**: Prevents spam with user cooldowns and slow mode.
- **Slash Commands**: Easily set up the chat channel using `/set-chat-channel`.

---

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed. [Download here](https://nodejs.org/).
2. **Discord Bot**: Create a bot on the [Discord Developer Portal](https://discord.com/developers/applications).
3. **Gemini API Key**: Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4. **Host it**: Host it on [bssr-nodes](https://bssr-nodes.com) ^ [RRhosting](https://rrhosting.eu)

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

3. Create a `.env` file in the root directory and add the following:
   ```plaintext
   # Discord bot token
   DISCORD_TOKEN=your_discord_bot_token

   # Gemini API key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Customize the `config.json` file to configure the bot:
   ```json
   {
     "knowledge": "Your bot's knowledge base",
     "embedTitle": "Chatbot Response",
     "useEmbed": true,
     "swearWordsFile": "./swearWords.json"
   }
   ```

5. Start the bot:
   ```bash
   node index.js
   ```

Your bot should now be running and ready to use!

---

## Usage

1. **Set Chat Channel**: Use the `/set-chat-channel` slash command to designate a channel for AI chat.
2. **Interact**: Send messages in the designated channel, and the bot will respond intelligently.

---

## Environment Variables

Ensure the following variables are set in your `.env` file:

- `DISCORD_TOKEN`: Your Discord bot token.
- `GEMINI_API_KEY`: Your Gemini API key.

---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the bot.

---

## License

All rights reserved to Sayrz Studio. Visit us at [https://sayrz.com](https://sayrz.com).

##

- Note: You can use another gemini model like [gemini-1.5-pro](https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=API_KEY)
