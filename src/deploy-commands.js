/**
 * @file deploy-commands.js
 * @description Script independiente para registrar los comandos slash en la API de Discord.
 * Debe ejecutarse cada vez que se añadan o modifiquen comandos.
 */

import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    if (!fs.lstatSync(folderPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = (await import(`file://${filePath}`)).default;
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        }
    }
}

const rest = new REST().setToken(process.env.TOKEN);

/**
 * Función autoejecutable para registrar los comandos globales.
 */
(async () => {
    try {
        console.log(`[REST] Iniciando actualización de ${commands.length} comandos slash registrados globalmente.`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`[REST] Operación completada: ${data.length} comandos sincronizados correctamente.`);
    } catch (error) {
        console.error('[Error] Fallo en la sincronización de comandos:', error);
    }
})();
