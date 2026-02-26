/**
 * @file ready.js
 * @description Evento emitido cuando el cliente completa el proceso de inicio de sesión.
 */

import { Events } from 'discord.js';

export default {
    name: Events.ClientReady,
    once: true,

    /**
     * @param {import('discord.js').Client} client 
     */
    execute(client) {
        console.log(`[Sistema] Sesión establecida: ${client.user.tag}`);
    },
};
