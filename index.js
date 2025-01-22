require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  PermissionFlagsBits,
  EmbedBuilder
} = require("discord.js");
const axios = require("axios");
const fs = require("fs");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const config = require("./config.json");
const knowledge = config.knowledge;
const embedTitle = config.embedTitle;
const useEmbed = config.useEmbed;
const swearWordsFile = config.swearWordsFile;

const swearWords = fs.existsSync(swearWordsFile) ? require(swearWordsFile) : [];
const userCooldowns = new Map();
const COOLDOWN_TIME = 1500; // يخلي كول داون للرسائل عشان الشخص لما يجي يسوي سبام راح يتجاهل الرسائل

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

async function askGemini(content) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: knowledge // مال knowladge لازم تعلم البوت
              }
            ]
          },
          {
            role: "user",
            parts: [
              {
                text: content // وهنا مال رسائل
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    // all right's reserved to sayrz studio
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
// all right's reserved to sayrz studio
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let chatChannel = null;
// all right's reserved to sayrz studio
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  // all right's reserved to sayrz studio
  const command = {
    name: "set-chat-channel",
    description: "Set the channel for Gemini AI chat",
    options: [
      {
        name: "channel",
        description: "The channel to set for Gemini AI chat",
        type: 7,
        required: true
      }
    ],
    default_member_permissions: PermissionFlagsBits.Administrator.toString()
  };

  await client.application.commands.create(command);
  console.log("Slash command its ready to go");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "set-chat-channel") {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true
      });
    }

    chatChannel = interaction.options.getChannel("channel");

    // بيخلي سلومود للروم بشكل تلقائي لما تستعمل الامر
    try {
      await chatChannel.setRateLimitPerUser(
        5,
        "Slow mode enabled for Gemini AI chat"
      );
      console.log(`Slow mode set to 5 seconds in channel: ${chatChannel.name}`);
    } catch (error) {
      console.error("Failed to set slow mode:", error);
    }

    console.log(
      `Chat channel set to: ${chatChannel.name} (ID: ${chatChannel.id})`
    );
    await interaction.reply({
      content: `Chat channel set to ${chatChannel.name}. Slow mode enabled (5 seconds).`,
      ephemeral: true
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || message.channel.id !== chatChannel?.id) return;

  // يشوف اذا اكو رسائل بيها سب
  if (containsSwearWords(message.content)) {
    console.log(
      `Ignored message from ${message.author.tag} due to swear words.`
    );
    return;
  }

  // راح يرسل للكونسل انو اكو رسالة تم تجاهلها بسبب الكول داون
  const lastMessageTime = userCooldowns.get(message.author.id);
  if (lastMessageTime && Date.now() - lastMessageTime < COOLDOWN_TIME) {
    console.log(`Ignored message from ${message.author.tag} due to cooldown.`);
    return;
  }

  userCooldowns.set(message.author.id, Date.now());

  console.log(
    `Processing message from ${message.author.tag}: ${message.content}`
  );

  await message.channel.sendTyping();

  const startTime = Date.now();
  const response = await askGemini(message.content);
  const endTime = Date.now();
  const responseTime = (endTime - startTime) / 1000;

  console.log(`Generated response: ${response}`);

  const responseChunks = splitMessage(response);

  for (const chunk of responseChunks) {
    if (useEmbed) {
      const embed = new EmbedBuilder()
        .setColor(0xffffff)
        .setTitle(embedTitle)
        .setDescription(chunk)
        .setFooter({
          text: `Response time: ${responseTime.toFixed(2)} seconds`,
          iconURL: message.guild.iconURL({ dynamic: true })
        });

      await message.reply({ embeds: [embed] });
    } else {
      await message.reply(chunk);
    }
  }
});

client.login(DISCORD_TOKEN);
