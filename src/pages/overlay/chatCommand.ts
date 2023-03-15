import React from 'react'
import tmi, { ChatUserstate } from 'tmi.js'
import Streamer from '../../assets/streamer.json'

export default function chatCommand(){
  const [command, setCommand] = React.useState('')
  const [client] = React.useState(new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [
      // 'AbdullahMorrison', //! For testing purposes
      Streamer.name
    ]
  }))

   const messageHandler = React.useCallback((channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
    //ignore if user is not a moderator or broadcaster or if the user is not AbdullahMorrison
    if (!tags.mod && !tags.badges?.broadcaster && tags.username !== 'abdullahmorrison') return
    // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
    if (self || !msg.trim().startsWith('!')) return

    const command = msg.trim().toLowerCase().slice(1)
    if(command == 'bingo') setCommand(command)
  }, [])

  const connectedHandler = React.useCallback(() => {
    console.log('*Twitch extension is connected to chat*')
  }, [])

  React.useEffect(() => {
    client.addListener('message', messageHandler)
    client.on('connected', connectedHandler)
    client.connect()

    return () => {
      client.removeListener('message', messageHandler)
    }
  }, [client, messageHandler, connectedHandler])


  return [command, setCommand] as const
}
