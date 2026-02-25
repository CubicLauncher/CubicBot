import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);

    let commandsArray = [];

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = (await import(`file://${filePath}`)).default;

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());
            } else {
                console.warn(`[WARNING] El comando en ${filePath} no tiene la estructura requerida.`);
            }
        }
    }

    // Opcional: Registrar los comandos en la API de Discord
    // Esto se puede hacer en un archivo separado o aquí mismo si es sencillo.
    // Por ahora solo los cargamos en la colección.
    console.log(`[Handler] ¡Listo! Se han cargado ${client.commands.size} comandos.`);
}
