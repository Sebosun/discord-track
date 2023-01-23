const { createClient } = require('@supabase/supabase-js')
const { Client } = require('discord.js-selfbot-v13')
require('dotenv').config()

const client = new Client({ checkUpdate: false })

const token = process.env.TOKEN
const supabaseBaseLink = process.env.SUPABASE_BASE_LINK
const supabaseHash = process.env.SUPABASE_ADMIN_HASH
const guildId = process.env.GUILD_ID

client.login(token)

const supabase = createClient(supabaseBaseLink, supabaseHash)

// TODO: handle edited messages

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`)
  console.log(`${client.user}`)
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} | ${guild.id}`)
  })
})

client.on('messageCreate', async (message) => {
  if (message.guildId === guildId) {
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
    const date = new Date()
    console.log(
      `${date.getHours}:${date.getMinutes} -  Message from ${messageObj.username} saved succesfully`
    )
  }
})
