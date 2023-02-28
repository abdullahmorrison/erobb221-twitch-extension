import React from 'react'
import styles from './overlay.module.css'

import Board from './board/Board'

export default function Overlay(){
  return (
    <div className={styles.overlay}>
      <main>
        <div className={styles.title}>
          <h1>Streamer Bingo </h1>
          <button className={styles.help}>?</button>
        </div>
        <Board />
        <button className={styles.newGameButton}>New Game</button>
      </main>

      <button className={styles.openExtensionButton}></button>
    </div>
  )
}
