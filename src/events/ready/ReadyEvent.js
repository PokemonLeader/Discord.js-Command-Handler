const BaseEvent = require('../../utils/structure/BaseEvent');
require('dotenv').config();

module.exports = class ReadyEvent extends BaseEvent{
    constructor(){
        super('ready');
    }
    async run(client) {
        console.log(`${client.user.username} is finally online!`);

        client.guilds.cache.get(process.env.officialServer).roles.cache.get(process.env.developerRole).members.forEach(member => {
            client.developers.set(member.id, member.user.username);
        });
    }
}