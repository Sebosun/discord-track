const { supabase } = require('../services/supabase')
const timestamp = require('time-stamp')
require('dotenv').config()

const guildId = process.env.GUILD_ID

const logBan = async (banEvent) => {
  if (banEvent.id != guildId) return
  const serverId = banEvent.id
  const serverName = banEvent.name
  const bannedUserName = banEvent.user.username
  const bannedUserId = banEvent.user.id

  const { error } = await supabase
    .from('bans')
    .insert({ serverId, serverName, bannedUserId, bannedUserName })

  if (error) {
    console.log(error)
  }

  console.log(
    `${timestamp.utc('[YYYY/MM/DD] HH:mm:ss')} -  Message from ${
      messageObj.username
    } saved succesfully`
  )

  console.log(banEvent.id)
}

module.exports = { logBan }
