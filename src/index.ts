import { Client } from 'discord.js-selfbot-v13'
import { handleMessageSave } from './controllers/logMessages.js'
import { logBan } from './controllers/logEvents.js'
import dotenv from 'dotenv'
import { startupEmojiCheck } from './controllers/fileUploadHelpers.js'

dotenv.config()

const trackedServerId = process.env.GUILD_ID

if (!trackedServerId) throw new Error('No tracked sserver ID')

const client = new Client({ checkUpdate: false })
const token = process.env.TOKEN

client.login(token)

// TODO: handle edited messages
client.on('ready', async () => {
  console.log(`${client.user}`)
  console.log(`${client.user?.username} is ready!`)
  if (trackedServerId) await startupEmojiCheck(client, trackedServerId)
})

client.on('messageCreate', (message) =>
  handleMessageSave(message, client, trackedServerId)
)

client.on('guildBanAdd', logBan)
