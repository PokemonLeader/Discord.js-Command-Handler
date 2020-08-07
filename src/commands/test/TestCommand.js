const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class TestCommand extends BaseCommand{
    constructor(){
        super({
            name: 'test',
            command: ['test', 'testing'],
            expectedArgs: '<message>',
            minArgs: 1,
            onlyDeveloper: true,
            requiredUserPermission: ['ADMINISTRATOR', "MANAGE_MESSAGES"],
            requiredClientPermission: ['ADMINISTRATOR', "MANAGE_MESSAGES"]
        })
    }
    async run(client, message, args) {
        return message.channel.send(args[0]);
    }
}