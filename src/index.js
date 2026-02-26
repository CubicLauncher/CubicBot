/**
 * @file index.js
 * @description Punto de entrada principal para CubicBot.
 * Inicializa el cliente de Discord, configura los intents y carga los gestores de comandos y eventos.
 */

import { Client, GatewayIntentBits, Collection } from 'discord.js';
import 'dotenv/config';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';

/**
 * Inicialización del cliente de Discord con los permisos (Intents) necesarios.
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

/**
 * Colección global para almacenar los comandos cargados.
 */
client.commands = new Collection();

/**
 * Inicio de sesión y proceso de carga inicial.
 */
client.login(process.env.TOKEN).then(async () => {
    console.log('[System] Iniciando sesión...');
    await loadEvents(client);
    await loadCommands(client);
}).catch(err => {
    console.error('[Error] Error crítico al iniciar sesión:', err);
});
