import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: '¡Hubo un error ejecutando este comando!', ephemeral: true });
            } else {
                await interaction.reply({ content: '¡Hubo un error ejecutando este comando!', ephemeral: true });
            }
        }
    },
};
