const validateEvent = (event) => {
    const validateEvents = [
      'rateLimit',
      'ready',
      'guildCreate',
      'guildDelete',
      'guildUpdate',
      'guildUnavailable',
      'guildAvailable',
      'guildMemberAdd',
      'guildMemberRemove',
      'guildMemberUpdate',
      'guildMemberAvailable',
      'guildMemberSpeaking',
      'guildMembersChunk',
      'guildIntegrationsUpdate',
      'roleCreate',
      'roleDelete',
      'inviteCreate',
      'inviteDelete',
      'roleUpdate',
      'emojiCreate',
      'emojiDelete',
      'emojiUpdate',
      'guildBanAdd',
      'guildBanRemove',
      'channelCreate',
      'channelDelete',
      'channelUpdate',
      'channelPinsUpdate',
      'message',
      'messageDelete',
      'messageUpdate',
      'messageDeleteBulk',
      'messageReactionAdd',
      'messageReactionRemove',
      'messageReactionRemoveAll',
      'messageReactionRemoveEmoji',
      'userUpdate',
      'presenceUpdate',
      'voiceServerUpdate',
      'voiceStateUpdate',
      'subscribe',
      'unsubscribe',
      'typingStart',
      'typingStop',
      'webhookUpdate',
      'error',
      'warn',
      'debug',
      'shardDisconnect',
      'shardError',
      'shardReconnecting',
      'shardReady',
      'shardResume',
      'invalidated',
      'raw'
    ]


    if(!validateEvents.includes(event)) {
      throw new Error(`Unkown event node "${event}"`)
    }
};

module.exports = class BaseEvent {
    constructor(name) {

      validateEvent(name);

      this.name = name;
    }
  }

