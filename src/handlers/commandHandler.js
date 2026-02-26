/**
 * @module CommandHandler
 * @description Escanea y carga comandos slash desde las subcarpetas del directorio /commands.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Carga todos los comandos slash y los registra en la colección del cliente.
 * @param {import('discord.js').Client} client El cliente de Discord.
 */
export async function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = (await import(`file://${filePath}`)).default;

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.warn(`[Aviso] Estructura inválida en el comando: ${filePath}`);
            }
        }
    }

    console.log(`[Handler] Sistema preparado: ${client.commands.size} comandos registrados.`);
}
