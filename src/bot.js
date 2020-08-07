require('dotenv').config();
const {
    Client, Message
} = require('discord.js');

const {
    registerCommand,
    registerEvents
} = require('./utils/registry.js');

const client = new Client({
    disableMentions: 'everyone'
});
(async () => {
    client.commands = new Map();
    client.helpCommand = new Map();
    client.events = new Map();
    client.developers = new Map();
    client.prefix = '!';

    await registerCommand(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(process.env.token);
})();