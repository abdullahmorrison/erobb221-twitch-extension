import React, { useState, useEffect, useCallback } from 'react'
import HideExtensionModal from './components/HideExtensionModal/HideExtensionModal'
import BingoGame from './components/BingoGame/BingoGame'
import Tomato from './components/Tomato/Tomato'
import { Tomato as TomatoType } from './components/Tomato/types'
import useChatCommand from './chatCommand'
import { commands } from './commands'

import styles from './app.module.css'

export default function App(){
  const [isExtensionHidden, setIsExtensionHidden] = useState(false)
  const [showHideExtensionModal, setShowHideExtensionModal] = useState(false)

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

  const handleClick = useCallback((event: any) => {
    // if user does alt + shift + left-click on screen, show the hide extension modal
    if(event.altKey && event.shiftKey && event.button === 0) {
      if(isExtensionHidden == false)
        setShowHideExtensionModal(true)
      else
        setIsExtensionHidden(false)
    }
    else if(isBingoGameOpen && event.target == event.currentTarget) setIsBingoGameOpen(false)
  }, [isBingoGameOpen, isExtensionHidden])

  const showBingoGame = useCallback((seconds: number) => {
    if(isExtensionHidden == true) return // if the user has hidden the extension, don't show the bingo game

    setIsCursorVisible(true)
    setIsBingoTabVisible(true)
    if(sleepTimer.current) clearTimeout(sleepTimer.current)

    sleepTimer.current = setTimeout(() => { // hide the cursor and the bingo game after set seconds
      setIsCursorVisible(false)
      setIsBingoTabVisible(false)
      setIsBingoGameOpen(false)
    }, seconds*1000)
  }, [isExtensionHidden])

  const [tomatoes, setTomatoes] = useState<TomatoType[]>([])
  useEffect(() => {// Fade away all tomatoes when the timer is 0
    if(isExtensionHidden) return // if the user has hidden the extension, don't show the tomatoes

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
  }, [tomatoTimer, isExtensionHidden])

  const throwTomato = useCallback(() => {
    if(isExtensionHidden) return // if the user has hidden the extension, don't show the tomatoes

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
  }, [isExtensionHidden])

  return (
    <div
      className={`${styles.app} ${isCursorVisible? undefined : styles.cursorHidden}`}
      onMouseMove={()=>showBingoGame(5)}
      onMouseLeave={()=>setIsBingoTabVisible(false)}
      onClick={(event)=>handleClick(event)}
    >
      <HideExtensionModal
        showHideExtensionModal={showHideExtensionModal}
        hideExtension={() => {
          setTomatoes([])
          setIsBingoGameOpen(false)
          setIsBingoTabVisible(false)
          setShowHideExtensionModal(false)
          setIsExtensionHidden(true)
        }}
        cancel={() => setShowHideExtensionModal(false)}
      />
      <Tomato tomatoes={tomatoes}/>
      <BingoGame
        isBingoTabVisible={isBingoTabVisible}
        isBingoGameOpen={isBingoGameOpen}
        setIsBingoGameOpen={setIsBingoGameOpen}
      />
      <div
        className={styles.countDownTimer}
        style={{display: isExtensionHidden || tomatoTimer === 0 ? 'none' : undefined}}
      >
        {tomatoTimer}
      </div>
    </div>
  )
}
