import supabase from '../services/supabase.js'
import { AnyChannel, Client, Message } from 'discord.js-selfbot-v13'
import { uploadFileAttachement } from '../controllers/fileUploadHelpers.js'

type SavedMessage = {
  message: string
  message_id?: string | null
  channel_name?: string | null
  channelId?: string | null
  username?: string | null
  author_id?: string | null
  mention_username?: string | null
  mention_id?: string | null
  attachement_types?: string[] | null
  attachement_urls?: string[] | null
}

export const handleMessageSave = async (
  message: Message<boolean>,
  client: Client<boolean>,
  guildId: string
) => {
  if (message.guildId != guildId) return

  const channel = client.channels.cache.get(message.channelId)
  const messageObject = prepareMessageData(message, channel)

  const messageUrls: string[] = []
  const messageContentTypes: string[] = []

  message.attachments.forEach(async (attachement) => {
    const isImage = attachement.contentType?.includes('image')

    attachement.url && messageUrls.push(attachement.url)
    attachement.contentType && messageContentTypes.push(attachement.contentType)

    if (isImage) {
      await uploadFileAttachement(attachement.url, message.id, guildId)
    }
  })

  messageObject.attachement_urls = messageUrls
  messageObject.attachement_types = messageContentTypes

  const { error } = await supabase.from('all_messages').insert(messageObject)

  if (error) {
    console.log(error)
  }

  console.log(
    `${new Date().toUTCString()} -  Message from ${
      messageObject.username
    } saved succesfully`
  )
}

const prepareMessageData = (
  message: Message,
  channel: AnyChannel | undefined
): SavedMessage => {
  let messageObj: SavedMessage = {
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

  return messageObj
}
