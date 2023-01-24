const { supabase } = require('../services/supabase')
const timestamp = require('time-stamp')

const guildId = process.env.GUILD_ID

const handleMessageSave = async (message) => {
  if (message.guildId != guildId) return
  lastMessageId = message.id
  const messageObj = {
    message: message.content,
    message_id: message.id,
    channel_name: client.channels.cache.get(message.channelId).name,
    channelId: message.channelId,
    username: message.author.username,
    author_id: message.author.id,
  }

  const mentionUser = message.mentions.repliedUser

  if (mentionUser) {
    messageObj.mention_username = mentionUser.username
    messageObj.mention_id = mentionUser.id
  }

  const { error } = await supabase.from('all_messages').insert(messageObj)

  if (error) {
    console.log(error)
  }

  console.log(
    `${timestamp.utc('[YYYY/MM/DD] HH:mm:ss')} -  Message from ${
      messageObj.username
    } saved succesfully`
  )
}

module.exports = { handleMessageSave }
