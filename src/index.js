const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const { DISCORD_TOKEN } = require('./config/config');
const { handleSetChatChannel } = require('./handlers/commandHandler');
const { handleMessage } = require('./handlers/messageHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
    
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
    console.log("Slash commands are ready to use");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "set-chat-channel") {
        await handleSetChatChannel(interaction);
    }
});

client.on("messageCreate", handleMessage);

client.login(DISCORD_TOKEN);