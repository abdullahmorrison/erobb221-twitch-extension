import React, { useState, useEffect, useCallback, useReducer } from 'react'
import HideExtensionModal from './components/HideExtensionModal/HideExtensionModal'
import BingoGame from './components/BingoGame/BingoGame'
import Tomato from './components/Tomato/Tomato'
import { Tomato as TomatoType } from './components/Tomato/types'
import BlurBox from './components/BlurBox/BlurBox'

import useChatCommand from './chatCommand'
import { commands } from './commands'

import styles from './app.module.css'
import { actions, initialState, reducer } from './app.reducer'

export default function App(){
  const [state, dispatch] = useReducer(reducer, initialState)

  const [command, tomatoTimer, nullifyCommand] = useChatCommand()
  const sleepTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  // Handle commmands
  useEffect(() => {
    if (command === commands.showBingoGame) {//show the bingo game for 2 seconds
      showBingoGame(2)
    }else if(command === commands.throwTomato) {//throw a tomato
      throwTomato()
    }
    nullifyCommand()
  }, [command])

  //get isExtensionHidden from local storage
  useEffect(() => {
    const isExtensionHidden = localStorage.getItem('isExtensionHidden')
    if(isExtensionHidden === null || JSON.parse(isExtensionHidden) === false) return
    dispatch({type: actions.HIDE_EXTENSION})
  }, [])
  //save isExtensionHidden to local storage
  useEffect(() => {
    localStorage.setItem('isExtensionHidden', JSON.stringify(state.isExtensionHidden))
  }, [state.isExtensionHidden])

  const handleClick = useCallback((event: any) => {
    // if user does alt + shift + left-click on screen, show the hide extension modal
    if(event.altKey && event.shiftKey && event.button === 0)
      dispatch({type: actions.HANDLE_ALT_SHIFT_LEFT_CLICK})
    else if(state.isBingoGameOpen && event.currentTarget === event.target.closest(`.${styles.bingoGame}`))
      dispatch({type: actions.CLOSE_BINGO_GAME})
  }, [state.isBingoGameOpen, state.isExtensionHidden])

  const showBingoGame = useCallback((seconds: number) => {
    dispatch({type: actions.SHOW_CURSOR})
    if(state.isExtensionHidden == true) return

    dispatch({type: actions.WAKE})
    if(sleepTimer.current) clearTimeout(sleepTimer.current)

    sleepTimer.current = setTimeout(() => {
      dispatch({type: actions.SLEEP})
      dispatch({type: actions.HIDE_CURSOR})
    }, seconds*1000)
  }, [state.isExtensionHidden])

  const throwTomato = useCallback(() => {
    if(state.isExtensionHidden) return

    const tomato: TomatoType = {
      x: Math.random()*100,
      y: Math.random()*100,
      rotate: Math.random()*360,
      splatter: false,
      fadeAway: false
    }

    dispatch({type: actions.THROW_TOMATO, payload: tomato})

    setTimeout(() => {
      dispatch({type: actions.SPLATTER_TOMATO, payload: tomato})
    }, 500)
  }, [state.isExtensionHidden])

  // Fade away all tomatoes when the timer is 0
  useEffect(() => {
    if(state.isExtensionHidden) return

    if(tomatoTimer === 0){
      dispatch({type: actions.FADE_AWAY_TOMATOES})
      setTimeout(() => {
        dispatch({type: actions.REMOVE_TOMATOES})
      }, 500)
    }
  }, [tomatoTimer, state.isExtensionHidden])

  return (
    <div
      className={`${styles.app} ${state.isCursorVisible? undefined : styles.cursorHidden}`}
      onMouseMove={()=>showBingoGame(5)}
      onMouseLeave={()=>dispatch({type: actions.SLEEP})}
      onClick={(event)=>handleClick(event)}
    >
      <BlurBox/>
      <HideExtensionModal
        showHideExtensionModal={state.showHideExtensionModal}
        hideExtension={()=>dispatch({type: actions.HIDE_EXTENSION})}
        cancel={() => dispatch({type: actions.CANCEL_HIDE_EXTENSION})}
      />
      <Tomato tomatoes={state.tomatoes}/>
      <BingoGame
        isBingoTabVisible={state.isBingoTabVisible}
        isBingoGameOpen={state.isBingoGameOpen}
        openBingoGame={() => dispatch({type: actions.OPEN_BINGO_GAME})}
        closeBingoGame={() => dispatch({type: actions.CLOSE_BINGO_GAME})}
      />
      <div
        className={styles.countDownTimer}
        style={{display: state.isExtensionHidden || tomatoTimer === 0 ? 'none' : undefined}}
      >
        {tomatoTimer}
      </div>
    </div>
  )
}
