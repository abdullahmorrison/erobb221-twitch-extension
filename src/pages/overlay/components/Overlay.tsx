import React from 'react'
import styles from './overlay.module.css'

import Board from './board/Board'

export default function Overlay(){
  return (
    <div className={styles.overlay}>
      <main>
        <h1>Streamer Bingo</h1>
        <Board />
      </main>

      <button>
        <span>+</span>
      </button>
    </div>
  )
}
