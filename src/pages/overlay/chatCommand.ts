import React, { useEffect } from 'react'
import tmi, { ChatUserstate } from 'tmi.js'
import Streamer from '../../assets/streamer.json'
import { commands } from './commands'

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


  const tomatoTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)
  useEffect(() => {
    return () => {
      if(tomatoTimer.current) clearTimeout(tomatoTimer.current)
    }
  }, [])

   const messageHandler = React.useCallback((channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
    //if tomatoTimer is running and the msg contains the word "TomatoTime"
    if(tomatoTimer.current && msg.includes('TomatoTime')) {
      setCommand(commands.throwTomato)
      return
    }

    //ignore if user is not a moderator or broadcaster or if the user is not AbdullahMorrison
    if (!tags.mod && !tags.badges?.broadcaster && tags.username !== 'abdullahmorrison') return
    // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
    if (self || !msg.trim().startsWith('!')) return

    const command = msg.trim().toLowerCase().slice(1)
    if(command === commands.showBingoGame) setCommand(command)
    else if(command === commands.throwTomato){
      console.log('throwing tomatoes')
      if(tomatoTimer.current) clearTimeout(tomatoTimer.current)
      tomatoTimer.current = setTimeout(() => setCommand(''), 15*1000)
    }else if(command === commands.cancel){
      console.log('canceling tomatoes')
      if(tomatoTimer.current) clearTimeout(tomatoTimer.current)
      setCommand('')
    }
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
