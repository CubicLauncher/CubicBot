/**
 * @file ping.js
 * @description Comando básico de utilidad para verificar la latencia del bot.
 */

import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Verifica la latencia de respuesta del bot'),

    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     * @param {import('discord.js').Client} client 
     */
    async execute(interaction, client) {
        await interaction.reply({
            content: `🏓 **¡Pong!**\nLatencia de la API: \`${client.ws.ping}ms\``
        });
    },
};
