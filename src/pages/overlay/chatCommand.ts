import React, { useCallback, useEffect } from 'react'
import tmi, { ChatUserstate } from 'tmi.js'
import Streamer from '../../assets/streamer.json'
import { commands } from './commands'

export default function chatCommand(){
  const [command, setCommand] = React.useState('')
  const [tomatoTimer, setTomatoTimer] = React.useState(0)
  const timer = React.useRef<NodeJS.Timeout | null>(null)
  const channel = Streamer.name
  // const channel = 'AbdullahMorrison' //! For testing purposes
  const [client] = React.useState(new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [
      channel
    ]
  }))


  const messageHandler = useCallback((channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
    //if tomatoTimer is running and the msg contains the word "TomatoTime"
    if(timer.current && msg.includes('TomatoTime')) {
      setCommand(commands.throwTomato)
      return
    }

    //ignore if user is not a moderator or broadcaster or if the user is not AbdullahMorrison
    if (!tags.mod && !tags.badges?.broadcaster && tags.username !== 'abdullahmorrison') return
    // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
    if (self || !msg.trim().startsWith('!')) return

    const command = msg.trim().toLowerCase().slice(1)
    switch (command) {
      case commands.showBingoGame:
        setCommand(command)
        break
      case commands.startThrowing: //start the count down timer to be able to throw tomatoes
        if(timer.current) return

        const seconds = 30
        setTomatoTimer(seconds)
        timer.current = setInterval(() => {
          setTomatoTimer(prev => prev-1)
        }, 1000)
        setTimeout(() => {
          clearInterval(timer.current as NodeJS.Timeout)
          timer.current = null
          setTomatoTimer(0)
        }, seconds*1000)
        break
      case commands.cancel: //cancel the count down timer
        if(timer.current) {
          clearInterval(timer.current)
          timer.current = null
          setTomatoTimer(0)
        }
        break
      default:
        break
    }
  }, [command])

  const connectedHandler = useCallback(() => {
    console.log('%cExtension Connected to '+channel+'\'s Twitch Channel', 'color: green; font-weight: bold; font-size: 18px')
  }, [])

  const disconnectedHandler = useCallback(() => {
    console.log('%cExtension Disconnected from '+channel+'\'s Twitch Channel', 'color: red; font-weight: bold; font-size: 18px')
  }, [])

  const nullifyCommand = useCallback(() => {
    setCommand(commands.null)
  }, [command])

  useEffect(() => {
    client.addListener('message', messageHandler)
    client.addListener('connected', connectedHandler)
    client.addListener('disconnected', disconnectedHandler)
    client.connect()

    return () => {
      client.removeAllListeners()
      client.disconnect()
    }
  }, [])


  return [command, tomatoTimer, nullifyCommand] as const
}
