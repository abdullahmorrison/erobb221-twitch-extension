import React, { useState, useEffect, useCallback } from 'react'
import BingoGame from './components/BingoGame/BingoGame'
import useChatCommand from './chatCommand'

import styles from './app.module.css'

export default function App(){
  const [isBingoGameVisible, setIsBingoGameVisible] = React.useState(false)
  const [isBingoGameOpen, setIsBingoGameOpen] = React.useState(false)
  const sleepTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const [command, setCommand] = useChatCommand()

  useEffect(() => {
    if (command === 'bingo') {
      showBingoGame(2)
      setCommand('')
    }
  }, [command])

  const showBingoGame = useCallback((seconds: number) => {
    setIsBingoGameVisible(true)
    if(sleepTimer.current) clearTimeout(sleepTimer.current)

    sleepTimer.current = setTimeout(() => {
      setIsBingoGameVisible(false)
      setIsBingoGameOpen(false)
    }, seconds*1000)
  }, [])

  return (
    <div
      className={styles.app}
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
