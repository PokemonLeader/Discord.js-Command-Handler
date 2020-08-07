const BaseEvent = require('../../utils/structure/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
    constructor(){
        super('message')
    }
    async run(client, message) {
        if(message.author.bot) return undefined;
        if(message.channel.type === 'dm') return undefined;
        if(message.content.startsWith(client.prefix)) {
            const [cmdName, ...cmdArgs] = message.content
            .slice(client.prefix.length)
            .trim()
            .split(/\s+/);
            const command = client.commands.get(cmdName.toLowerCase());

            if(command) {

                if(command.onlyDeveloper === true) {
                    let onlyDeveloper=client.developers.get(message.author.id);

                    if(!onlyDeveloper) return message.reply('This command is **Bot Developer** only');
                }

                for(const permission of command.requiredUserPermission) {
                    if(!message.member.hasPermission(permission)) {
                        message.reply(`You need permission **"${permission}"** to execute this command!`);
                        return;
                    }
                }

                for(const permission of command.requiredClientPermission) {
                    if(!message.guild.me.hasPermission(permission)) {
                        message.reply(`I need permission **"${permission}"** inorder for this command to work!`);
                        return;
                    }
                }

                if(cmdArgs.length < command.minArgs) {
                    return message.channel.send(`**Invalid useage!**\n${client.prefix}${cmdName} ${command.expectedArgs}`)
                }

                command.run(client, message, cmdArgs);
            }
        }
    }
}