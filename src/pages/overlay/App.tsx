import React, { useState, useEffect, useCallback } from 'react'
import BingoGame from './components/BingoGame/BingoGame'
import Tomato from './components/Tomato/Tomato'
import { Tomato as TomatoType } from './components/Tomato/types'
import useChatCommand from './chatCommand'
import { commands } from './commands'

import styles from './app.module.css'


export default function App(){
  const [isBingoTabVisible, setIsBingoTabVisible] = React.useState(false)
  const [isBingoGameOpen, setIsBingoGameOpen] = React.useState(false)
  const [isCursorVisible, setIsCursorVisible] = useState(true) // hiding the cursor when the mouse is idle on the screen

  const [command, setCommand] = useChatCommand()
  const sleepTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (command === commands.showBingoGame) {
      showBingoGame(2)
      setCommand(commands.null)
    }else if(command === commands.throwTomato) {
      throwTomato()
      setCommand(commands.null)
    }
  }, [command])

  const showBingoGame = useCallback((seconds: number) => {
    setIsCursorVisible(true)
    setIsBingoTabVisible(true)
    if(sleepTimer.current) clearTimeout(sleepTimer.current)

    sleepTimer.current = setTimeout(() => { // hide the cursor and the bingo game after set seconds
      setIsCursorVisible(false)
      setIsBingoTabVisible(false)
      setIsBingoGameOpen(false)
    }, seconds*1000)
  }, [])


  const [tomatoes, setTomatoes] = useState<TomatoType[]>([])
  const throwTomato = useCallback(() => {
    const newTomato: TomatoType = {
      x: Math.random()*100,
      y: Math.random()*100,
      rotate: Math.random()*360,
      splatter: false
    }

    setTomatoes(prev => [...prev, newTomato])
    setTimeout(() => {
      setTomatoes(tomatoes => tomatoes.map(tomato => {
        if(tomato === newTomato) {
          return {
            ...tomato,
            splatter: true
          }
        }
        return tomato
      }))
    }, 500)
  }, [])

  return (
    <div
      className={`${styles.app} ${isCursorVisible? undefined : styles.cursorHidden}`}
      onMouseMove={()=>showBingoGame(5)}
      onMouseLeave={()=>setIsBingoTabVisible(false)}
      onClick={(event)=>isBingoGameOpen && event.target == event.currentTarget? setIsBingoGameOpen(false) : null}
    >
      <Tomato tomatoes={tomatoes}/>
      <BingoGame
        isBingoTabVisible={isBingoTabVisible}
        isBingoGameOpen={isBingoGameOpen}
        setIsBingoGameOpen={setIsBingoGameOpen}
      />
    </div>
  )
}
