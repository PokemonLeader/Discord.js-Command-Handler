const BaseCommand = require('../../utils/structure/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { chmod } = require('fs');
let General = [];

module.exports = class HelpCommand extends BaseCommand{
    constructor(){
        super({
            name: 'help',
            command: ['help'],
            description: 'Help Command',
            requiredClientPermission: ['SEND_MESSAGES', 'EMBED_LINKS']
        })
    }
    async run(client, message, args) {
        const prefix = client.prefix
        const commands = client.helpCommand;

        if(General.length === 0) {
            commands.forEach(command => {
                General.push(command.name);
            });
        }


        let Generalfield= [];

        let embed = new MessageEmbed();
        embed.setTitle('Help Command!');

        for(const handler of General) {
            let cmdHandler = commands.get(handler); 
            let category = commands.get(handler).category;

            if(category === 'General') {
                Generalfield.push(`\`${cmdHandler.name}\``)
            }
            
        }

        embed.addField('General Command', Generalfield.join(', '))

        message.channel.send(embed);

        // message.channel.send(General.join(','));
    }
}