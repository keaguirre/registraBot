const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v10');
const fs = require('fs');
const clientId = '';
const guildId = '';
module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders){
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filder(file => file.endsWith('.js'));
            for (const file of commandFiles){
                const command = require (`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }
    
        const rest = new REST({version: '10'}).setToken('');
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(
                    Routes.applicationCommands(clientId),{
                        body: client.commandArray,
                    },
                );
            }catch (error){
                console.error(error);
            }
        })();
    }
}