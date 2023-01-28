import { Client } from 'discord.js-selfbot-v13'
import supabase from '../services/supabase'
import { getBase64 } from '../helpers/fetchHelpers'
import { decode } from 'base64-arraybuffer'

const frostServerId = '1064517644889374740'

const timeout = (ms: number) => {
  console.log('start timeout')
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Fetches emojis on startup, checks against a database
 * and if there are any msising uploads them
 * @param {Client<boolean>} client - DiscordJS client
 */
export const startupEmojiCheck = async (client: Client<boolean>) => {
  const { data, error } = await supabase.storage
    .from('emojis')
    .list(frostServerId)

  if (error) console.log(error)

  client.emojis.cache.forEach(async (emoji) => {
    const isInStorage =
      data && data.length && data.find((file) => file.name === emoji.id)
    const isFrostServer = emoji.guild.id === frostServerId

    if (isFrostServer && !isInStorage) {
      const pattern = `https://cdn.discordapp.com/emojis/${emoji.id}.${
        emoji.animated ? 'gif' : 'png'
      }`

      const file = await getBase64(pattern)
      const { data, error } = await supabase.storage
        .from('emojis')
        .upload(`${emoji.guild.id}/${emoji.id}`, decode(file), {
          contentType: 'image/png',
        })

      if (error) {
        console.log(error)
        console.log('error happened')
      } else {
        console.log(`Uploaded to ${data.path}`)
      }

      timeout(500)
    } else {
      console.log(`${emoji.name} is already in the database`)
    }
  })

  console.log(`${new Date().toUTCString()} - Emoji check completed `)
}
