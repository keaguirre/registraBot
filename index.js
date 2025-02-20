import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

//Client Storage box
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const functions = fs.readdirSync('/src/functions').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('/src/commands');

(async () => {
  for (file of functions){
    require(`./functions/${file}`)(client);
  }
  client.handleCommands(commandFolders, '/src/commands');
  client.login('');
});
