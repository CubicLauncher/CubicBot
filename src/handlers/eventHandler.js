/**
 * @module EventHandler
 * @description Gestiona la carga dinámica de archivos de eventos desde el directorio /events.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Carga de forma recursiva todos los eventos definidos en la carpeta de eventos.
 * @param {import('discord.js').Client} client El cliente de Discord.
 */
export async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = (await import(`file://${filePath}`)).default;

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    console.log(`[Handler] Registro completo: ${eventFiles.length} eventos cargados.`);
}
