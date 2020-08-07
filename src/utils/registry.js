const path = require('path');
const fs = require('fs');
const BaseCommand = require('./structure/BaseCommand');
const BaseEvent = require('./structure/BaseEvent');

async function registerCommand(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdirSync(filePath);
    for(const file of files) {
        const stat = await fs.lstatSync(path.join(filePath, file));
        if(stat.isDirectory()) registerCommand(client, path.join(dir, file));
        if(file.endsWith('.js')) {
            const Command = require(path.join(filePath, file));
            if(Command.prototype instanceof BaseCommand) {
                const cmd = new Command();
                //client.commands.set(cmd.command[0], cmd)
                cmd.category = path.parse(filePath).name;
                client.helpCommand.set(cmd.name, cmd);
                cmd.command.forEach(cmdalias => {
                    client.commands.set(cmdalias, cmd)
                });
            }
        }
    }
    console.log(client.helpCommand);
}

async function registerEvents(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdirSync(filePath);
    for(const file of files) {
        const stat = await fs.lstatSync(path.join(filePath, file));
        if(stat.isDirectory()) registerEvents(client, path.join(dir, file));
        if(file.endsWith('.js')) {
            const Event = require(path.join(filePath, file));
            if(Event.prototype instanceof BaseEvent){
                const event = new Event();
                client.events.set(event.name, event);
                client.on(event.name, event.run.bind(event, client));
            }
        }
    }
}

module.exports = {
    registerCommand,
    registerEvents
}

// const path = require('path');
// const fs = require('fs');
// const BaseCommand = require('./structure/BaseCommand');

// async function registerCommand(client, dir = '') {
//     const filePath = path.join(__dirname, dir);
//     const files = await fs.readdirSync(filePath);
//     for(const file of files) {
//         const stat = await fs.lstatSync(path.join(filePath, file));
//         if(stat.isDirectory()) registerCommand(client, path.join(dir, file));
//         if(file.endsWith('.js')){
            
//         }
//     }
// }

// module.exports = {
//     registerCommand
// }