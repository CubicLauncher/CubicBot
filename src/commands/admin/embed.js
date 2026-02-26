/**
 * @file embed.js
 * @description Comando administrativo para enviar mensajes complejos (embeds, botones, componentes) vía JSON.
 */

import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Envía un mensaje completo (embeds, botones, etc) mediante un JSON')
        .addStringOption(option =>
            option.setName('json')
                .setDescription('Estructura JSON del mensaje a enviar')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const jsonString = interaction.options.getString('json');

        try {
            const messageData = JSON.parse(jsonString);

            // Validación de integridad de los embeds
            if (messageData.embeds && Array.isArray(messageData.embeds)) {
                messageData.embeds.forEach((e, index) => {
                    if (!e.title && !e.description && !e.image && !e.thumbnail && !e.fields) {
                        throw new Error(`Integridad fallida: el embed en la posición ${index} no tiene contenido visual.`);
                    }
                });
            }

            // Envío del mensaje al canal actual
            await interaction.channel.send(messageData);

            // Confirmación efímera al administrador
            await interaction.reply({
                content: '✅ **Acción completada:** El mensaje ha sido enviado al canal correctamente.',
                flags: [MessageFlags.Ephemeral]
            });

        } catch (error) {
            console.error('[Comando: Embed] Error al procesar JSON:', error);

            let errorMessage = error.message;
            if (error.code === 50035) {
                errorMessage = 'La API de Discord rechazó la estructura del JSON (posible error en IDs o tipos de componentes).';
            }

            const feedback = {
                content: `❌ **Error de Procesamiento:** ${errorMessage}\n\n**Estructura Recomendada:**\n\`\`\`json\n{\n  "content": "Texto descriptivo",\n  "embeds": [{ "title": "Título", "description": "Cuerpo" }],\n  "components": [{\n    "type": 1,\n    "components": [{ "type": 2, "style": 1, "label": "Botón de Acción", "custom_id": "id_unico" }]\n  }]\n}\n\`\`\``,
                flags: [MessageFlags.Ephemeral]
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(feedback);
            } else {
                await interaction.reply(feedback);
            }
        }
    },
};
