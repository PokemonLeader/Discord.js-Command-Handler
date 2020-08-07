const prefix = '!';

const validatePermission = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
      ]

      for(const permission of permissions){
          if(!validPermissions.includes(permission)) {
              throw new Error(`Unkown events node "${permission}"`)
          }
      }
};

module.exports = class BaseCommand {
   constructor(clientOption){
    const { 
        name,
        command,
        description = '',
        category = '',
        expectedArgs = '',
        minArgs=0,
        onlyDeveloper = false,
        requiredUserPermission = [],
        requiredClientPermission = []
     } = clientOption;

     


     //ensure that command is in a array.
     if(typeof command === 'string'){
         command = [command];
     }

     //ensures the description is a string
     if(!typeof description === 'string'){
         throw new Error('Description should be a string');
     }
     
     //ensure the minArgs is a number
     if(typeof minArgs !== 'number') {
         throw new Error('Minimum Args only allows numbers');
     }

     //ensure isOwner is a boolean
     if(typeof onlyDeveloper !== 'boolean'){
        throw new Error('onlyDeveloper should be Boolean')
     }

     //validate the permission for user
     if(requiredUserPermission.length) {
         if(typeof requiredUserPermission === 'string'){
             requiredUserPermission = [requiredUserPermission];
         }
         validatePermission(requiredUserPermission);
     }

     //validate the permission for client
     if(requiredClientPermission.length) {
        if(typeof requiredClientPermission === 'string'){
            requiredClientPermission = [requiredClientPermission];
        }
        validatePermission(requiredClientPermission);
    }

    this.name = name;
    this.command = command;
    this.description = description;
    this.category = category;
    this.expectedArgs = expectedArgs;
    this.minArgs = minArgs;
    this.onlyDeveloper = onlyDeveloper;
    this.requiredUserPermission = requiredUserPermission;
    this.requiredClientPermission = requiredClientPermission;
}
}