import React, { useState, useEffect, useCallback } from 'react'
import BingoGame from './components/BingoGame/BingoGame'
import useChatCommand from './chatCommand'
import { commands } from './commands'

import styles from './app.module.css'

export default function App(){
  const [isBingoGameVisible, setIsBingoGameVisible] = React.useState(false)
  const [isBingoGameOpen, setIsBingoGameOpen] = React.useState(false)
  const [isCursorVisible, setIsCursorVisible] = useState(true) // hiding the cursor when the mouse is idle on the screen

  const [command, setCommand] = useChatCommand()
  const sleepTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (command === commands.showBingoGame) {
      showBingoGame(2)
      setCommand(commands.null)
    }
  }, [command])

  const showBingoGame = useCallback((seconds: number) => {
    setIsCursorVisible(true)
    setIsBingoGameVisible(true)
    if(sleepTimer.current) clearTimeout(sleepTimer.current)

    sleepTimer.current = setTimeout(() => {
      setIsCursorVisible(false)
      setIsBingoGameVisible(false)
      setIsBingoGameOpen(false)
    }, seconds*1000)
  }, [])

  return (
    <div
      className={`${styles.app} ${isCursorVisible? undefined : styles.cursorHidden}`}
      onMouseMove={()=>showBingoGame(5)}
      onMouseLeave={()=>setIsBingoGameVisible(false)}
      onClick={(event)=>isBingoGameOpen && event.target == event.currentTarget? setIsBingoGameOpen(false) : null}
    >
      <BingoGame
        isBingoTabVisible={isBingoGameVisible}
        isBingoGameOpen={isBingoGameOpen}
        setIsBingoGameOpen={setIsBingoGameOpen}
      />
    </div>
  )
}
