/**
 * @file interactionCreate.js
 * @description Evento principal para gestionar las interacciones de los comandos slash.
 */

import { Events, MessageFlags } from 'discord.js';

export default {
    name: Events.InteractionCreate,

    /**
     * @param {import('discord.js').BaseInteraction} interaction 
     * @param {import('discord.js').Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`[Error] No se encontró el comando: ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`[Error] Fallo al ejecutar /${interaction.commandName}:`, error);

            const errorPayload = {
                content: '❌ **Error Interno:** Hubo un problema al ejecutar este comando.',
                flags: [MessageFlags.Ephemeral]
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorPayload);
            } else {
                await interaction.reply(errorPayload);
            }
        }
    },
};
