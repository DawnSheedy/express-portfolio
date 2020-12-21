const config = require('../../config')

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const settingsController = require('./../controllers/settings')
        //Default settings
        /*
            Discord
        */
        let discordDefaults = [
            { key: 'discordCommands', value: false, desc: 'Should the bot enable commands on discord.', cat: 'Discord' },
            { key: 'discordCommandPrefix', value: '!', desc: 'Prefix for discord commands (can\'t be / as this conflicts with discord).', cat: 'Discord' },
            { key: 'discordMod', value: false, desc: 'Should the bot moderate discord messages.', cat: 'Discord' },
            { key: 'discordReplyMode', value: false, desc: 'Should the bot use reply mode on discord. (@message the user who used the command)', cat: 'Discord' },
            { key: 'discordDmMode', value: false, desc: 'Should the bot restrict discord commands to DMs.', cat: 'Discord' },
            { key: 'discordHelpCommand', value: false, desc: 'Should the bot enable the discord help command.', cat: 'Discord' },
            { key: 'discordHelpCommand', value: '', desc: 'Prefix to put on discord command responses.', cat: 'Discord' }
        ]

        /*
            Twitch
            twitchCommands: true
            twitchCommandPrefix: '!
            twitchMod: true
            twitchModRepeatOffenderBan: true
            twitchModRepeatOffenderBanCount: 10
            twitchAutoMessages: false
            twitchCooldown: 15
            twitchChannel: config.channel
            twitchResponsePrefix: ''
        */
        let twitchDefaults = [
            { key: 'twitchCommands', value: true, desc: 'Should the bot enable commands on twitch.', cat: 'Twitch' },
            { key: 'twitchCommandPrefix', value: '!', desc: 'Prefix for twitch commands (can\'t be / as this conflicts with twitch).', cat: 'Twitch' },
            { key: 'twitchMod', value: true, desc: 'Should the bot moderate twitch messages', cat: 'Twitch' },
            { key: 'twitchModRepeatOffenderBan', value: true, desc: 'Should the bot ban repeat offenders on twitch.', cat: 'Twitch' },
            { key: 'twitchModRepeatOffenderBanCount', value: 10, desc: 'After how many offenses should a ban be instituted.', cat: 'Twitch' },
            { key: 'twitchAutoMessages', value: false, desc: 'Should the bot enable twitch auto messages. (Enabling will only send messages that have been enabled in the command list as well).', cat: 'Twitch' },
            { key: 'twitchCooldown', value: 15, desc: 'Number of messages to wait between commands.', cat: 'Twitch' },
            { key: 'twitchChannel', value: config.channel, desc: 'Should the bot enable commands on twitch.', cat: 'Twitch' },
            { key: 'twitchResponsePrefix', value: '', desc: 'Should the bot enable commands on twitch.', cat: 'Twitch' }
        ]

        /*
            Analytics
            eventStorageTime: 300 (seconds)
            messageStorageTime: 120 (seconds)
            analyticFrequency: 60 (seconds)
        */
        let analyticDefault = [
            { key: 'eventStorageTime', value: 300, desc: 'How long should events be stored. (seconds)', cat: 'Analytics' },
            { key: 'modEventStorageTime', value: 24 * 60 * 60, desc: 'How long should moderation events be stored. (seconds)', cat: 'Analytics' },
            { key: 'twitchMessageStorageTime', value: 120, desc: 'How long should twitch chat events be stored. (seconds)', cat: 'Analytics' },
            { key: 'discordMessageStorageTime', value: 120, desc: 'How long should discord chat events be stored.  (seconds)', cat: 'Analytics' },
            { key: 'analyticFrequency', value: 60, desc: 'How frequently should analytical snapshots be taken. (seconds)', cat: 'Analytics' }
        ]

        let array = discordDefaults.concat(twitchDefaults).concat(analyticDefault)

        array.forEach(async (setting) => {
            await settingsController.set(setting)
        })
        resolve(null)
    })
}