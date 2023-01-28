import supabase from '../services/supabase.js'
import { Client, Message } from 'discord.js-selfbot-v13'

const guildId = process.env.GUILD_ID

type SavedMessage = {
  message: string
  message_id?: string
  channel_name?: string
  channelId?: string
  username?: string
  author_id?: string
  mention_username?: string
  mention_id?: string
}

export const handleMessageSave = async (
  message: Message<boolean>,
  client: Client<boolean>
) => {
  if (message.id != guildId) return

  const channel = client.channels.cache.get(message.channelId)

  const messageObj: SavedMessage = {
    message: message.content,
    message_id: message.id,
    channelId: message.channelId,
    username: message.author.username,
    author_id: message.author.id,
  }

  const mentionUser = message.mentions.repliedUser

  if (channel?.type != 'DM' && channel) {
    messageObj.channel_name = channel.name
  }

  if (mentionUser) {
    messageObj.mention_username = mentionUser.username
    messageObj.mention_id = mentionUser.id
  }

  const { error } = await supabase.from('all_messages').insert(messageObj)

  if (error) {
    console.log(error)
  }

  console.log(
    `${new Date().toUTCString()} -  Message from ${
      messageObj.username
    } saved succesfully`
  )
}
