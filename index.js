const { createClient } = require('@supabase/supabase-js')
const { Client } = require('discord.js-selfbot-v13')
const { handleMessageSave } = require('./controllers/logMessages')
const { logBan } = require('./controllers/logEvents')
require('dotenv').config()

const client = new Client({ checkUpdate: false })
const token = process.env.TOKEN

client.login(token)

// TODO: handle edited messages

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`)
  console.log(`${client.user}`)
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} | ${guild.id}`)
  })
})

client.on('messageCreate', (message) => handleMessageSave(message, client))
client.on('guildBanAdd', logBan)
