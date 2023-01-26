import supabase from '../services/supabase.js'
import timestamp from 'time-stamp'
import { GuildBan } from 'discord.js-selfbot-v13'

const logBan = async (banEvent: GuildBan) => {
  const serverId = banEvent.guild.id
  const serverName = banEvent.guild.name
  const bannedUserName = banEvent.user.username
  const bannedUserId = banEvent.user.id

  const { error } = await supabase
    .from('bans')
    .insert({ serverId, serverName, bannedUserId, bannedUserName })

  if (error) {
    console.log(error)
  }

  console.log(
    /* @ts-ignore */
    `${timestamp.utc(
      '[YYYY/MM/DD] HH:mm:ss'
    )} - ${bannedUserName} has been banned from ${serverName}`
  )
}

export { logBan }
