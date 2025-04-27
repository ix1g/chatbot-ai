const { EmbedBuilder } = require('discord.js');
const { containsSwearWords, splitMessage } = require('../utils/messageUtils');
const { processImage, getUserContext } = require('../services/imageService');
const { askGemini } = require('../services/geminiService');
const { COOLDOWN_TIME, botConfig } = require('../config/config');
const { getChatChannel } = require('./commandHandler');

const userCooldowns = new Map();

async function handleMessage(message) {
    const chatChannel = getChatChannel();
    if (message.author.bot || message.channel.id !== chatChannel?.id) return;

    // Check for images in the message
    const hasImage = message.attachments.size > 0 && 
        message.attachments.some(attachment => 
            attachment.contentType?.startsWith('image/'));

    if (containsSwearWords(message.content)) {
        console.log(`Ignored message from ${message.author.tag} due to swear words.`);
        return;
    }

    const lastMessageTime = userCooldowns.get(message.author.id);
    if (lastMessageTime && Date.now() - lastMessageTime < COOLDOWN_TIME) {
        console.log(`Ignored message from ${message.author.tag} due to cooldown.`);
        return;
    }

    userCooldowns.set(message.author.id, Date.now());
    console.log(`Processing message from ${message.author.tag}: ${message.content}`);
    await message.channel.sendTyping();

    const startTime = Date.now();
    let response;
    let imageAnalysis = null;

    try {
        if (hasImage) {
            const imageUrl = message.attachments.first().url;
            imageAnalysis = await processImage(imageUrl, message.author.id, message.content);
            
            const userContext = getUserContext(message.author.id);
            
            const imageContext = `Image analysis results:
            ${imageAnalysis.text ? `Text found: ${imageAnalysis.text}` : 'No text found'}
            Objects detected: ${imageAnalysis.objects.map(obj => `${obj.name} (${Math.round(obj.confidence * 100)}%)`).join(', ')}
            Labels: ${imageAnalysis.labels.map(label => `${label.description} (${Math.round(label.confidence * 100)}%)`).join(', ')}
            ${imageAnalysis.faces.length > 0 ? `Faces detected: ${imageAnalysis.faces.length} faces with emotions detected` : 'No faces detected'}`;

            const combinedPrompt = `${message.content}\n\nContext: ${imageContext}`;
            response = await askGemini(combinedPrompt, botConfig.knowledge);
        } else {
            response = await askGemini(message.content, botConfig.knowledge);
        }

        const endTime = Date.now();
        const responseTime = (endTime - startTime) / 1000;

        const responseChunks = splitMessage(response);

        for (const chunk of responseChunks) {
            if (botConfig.useEmbed) {
                const embed = new EmbedBuilder()
                    .setColor(0xffffff)
                    .setTitle(botConfig.embedTitle)
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
    } catch (error) {
        console.error('Error processing message:', error);
        await message.reply('Sorry, I encountered an error while processing your message.');
    }
}

module.exports = { handleMessage };