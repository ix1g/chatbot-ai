const { Client, GatewayIntentBits, PermissionFlagsBits, ActivityType } = require('discord.js');
const { DISCORD_TOKEN } = require('./config/config');
const { handleSetChatChannel } = require('./handlers/commandHandler');
const { handleMessage } = require('./handlers/messageHandler');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Bot presence states
const presenceStates = [
    { name: '🤖 AI Chat', type: ActivityType.Playing },
    { name: '💭 Processing thoughts...', type: ActivityType.Watching },
    { name: '🎯 Ready to chat!', type: ActivityType.Listening },
    { name: '🌟 Learning new things', type: ActivityType.Competing }
];

let currentPresenceIndex = 0;

function updatePresence() {
    const presence = presenceStates[currentPresenceIndex];
    client.user.setActivity(presence.name, { type: presence.type });
    currentPresenceIndex = (currentPresenceIndex + 1) % presenceStates.length;
}

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

    // Set initial presence and start rotation
    updatePresence();
    setInterval(updatePresence, 15000); // Update every 15 seconds

    // Start dashboard if enabled
    if (process.env.DASHBOARD === 'true') {
        try {
            require('../dashboard/server');
            console.log('Dashboard started successfully');
        } catch (error) {
            console.error('Failed to start dashboard:', error);
        }
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "set-chat-channel") {
        await handleSetChatChannel(interaction);
    }
});

client.on("messageCreate", handleMessage);

client.login(DISCORD_TOKEN);