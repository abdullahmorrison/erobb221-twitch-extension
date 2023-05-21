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

  const [command, tomatoTimer, nullifyCommand] = useChatCommand()
  const sleepTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (command === commands.showBingoGame) {//show the bingo game for 2 seconds
      showBingoGame(2)
    }else if(command === commands.throwTomato) {//throw a tomato
      throwTomato()
    }
    nullifyCommand()
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

  useEffect(() => {
    if(tomatoTimer === 0){
      // fade away all tomatoes
      setTomatoes(tomatoes => tomatoes.map(tomato => {
        return {
          ...tomato,
          fadeAway: true
        }
      }))
      // remove all tomatoes after fade away
      setTimeout(() => {
        setTomatoes([])
      }, 500)
    }
  }, [tomatoTimer])

  const throwTomato = useCallback(() => {
    const newTomato: TomatoType = {
      x: Math.random()*100,
      y: Math.random()*100,
      rotate: Math.random()*360,
      splatter: false,
      fadeAway: false
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
      <div className={styles.countDownTimer}>
        {tomatoTimer} seconds
      </div>
    </div>
  )
}
