import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde con Pong!'),
    async execute(interaction, client) {
        await interaction.reply(`¡Pong! Latencia: ${client.ws.ping}ms`);
    },
};
