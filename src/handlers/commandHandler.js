const { PermissionFlagsBits } = require('discord.js');

let chatChannel = null;

async function handleSetChatChannel(interaction) {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
            content: "You do not have permission to use this command.",
            ephemeral: true
        });
    }

    chatChannel = interaction.options.getChannel("channel");

    try {
        await chatChannel.setRateLimitPerUser(
            5,
            "Slow mode enabled for Gemini AI chat"
        );
        console.log(`Slow mode set to 5 seconds in channel: ${chatChannel.name}`);
    } catch (error) {
        console.error("Failed to set slow mode:", error);
    }

    console.log(`Chat channel set to: ${chatChannel.name} (ID: ${chatChannel.id})`);
    await interaction.reply({
        content: `Chat channel set to ${chatChannel.name}. Slow mode enabled (5 seconds).`,
        ephemeral: true
    });
}

function getChatChannel() {
    return chatChannel;
}

module.exports = {
    handleSetChatChannel,
    getChatChannel
};