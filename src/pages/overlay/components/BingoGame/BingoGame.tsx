import React from 'react'
import styles from './bingoGame.module.css'

import Board from '../../../../global/board/Board'
import Instructions from '../../../../global/instructions/Instructions'

import Streamer from '../../../../assets/streamer.json'

interface BingoGameProps {
  isBingoTabVisible: boolean
  isBingoGameOpen: boolean
  setIsBingoGameOpen: (open: boolean) => void
}
export default function BingoGame(props: BingoGameProps){
  const [isInstructionsOpen, setIsInstructionsOpen] = React.useState(false)
  const [streamer] = React.useState(Streamer)

  return (
    <div className={`${styles.overlay} ${styles.openExtensionButton} ${props.isBingoGameOpen && props.isBingoTabVisible ? styles.open: styles.closed}`}>
      <main>
        {isInstructionsOpen ? <Instructions closeInstructions={()=>setIsInstructionsOpen(false)} /> : null}

        <title>
          <h1>{streamer.name} Bingo </h1>
          <button className={styles.help} onClick={()=>setIsInstructionsOpen(true)}>?</button>
        </title>

        <Board/>

        <span className={styles.credits}>Made by @AbdullahMorrison</span>
      </main>

      <button className={`${styles.bingoTab} ${props.isBingoTabVisible? undefined : styles.hideBingoTab}`} onClick={() => props.setIsBingoGameOpen(!props.isBingoGameOpen)}></button>
    </div>
  )
}
