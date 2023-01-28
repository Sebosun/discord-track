import { Client } from 'discord.js-selfbot-v13'
import { handleMessageSave } from './controllers/logMessages.js'
import { logBan } from './controllers/logEvents.js'
import dotenv from 'dotenv'
import { startupEmojiCheck } from './controllers/startupEmojiCheck.js'

dotenv.config()

const client = new Client({ checkUpdate: false })
const token = process.env.TOKEN

client.login(token)

// TODO: handle edited messages
client.on('ready', async () => {
  console.log(`${client.user?.username} is ready!`)
  console.log(`${client.user}`)
  await startupEmojiCheck(client)
})

/* client.on('messageCreate', (message) => handleMessageSave(message, client)) */
/* client.on('guildBanAdd', logBan) */
