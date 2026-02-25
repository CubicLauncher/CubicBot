import { Client, GatewayIntentBits, Collection } from 'discord.js';
import 'dotenv/config';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();

client.login(process.env.TOKEN).then(async () => {
    await loadEvents(client);
    await loadCommands(client);
});
