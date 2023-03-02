import React from 'react'

import styles from './instructions.module.css'

interface InstructionsProps {
  closeInstructions: () => void
}
export default function Instructions(props: InstructionsProps){
  return (
    <div className={styles.background}>
      <div className={styles.instructions}>
        <span className={styles.close} onClick={props.closeInstructions}>&times;</span>

        <h2>Description</h2>
        <p>This is a Twitch extension where you can play a bingo game about _______</p>

        <h2>Intructions</h2>
        <h3>How to Add/Remove a Chip:</h3>
        <p>Click on a tile to add a chip. Click the same tile to remove a chip.</p>

        <h3>How to Win (Bingo!):</h3>
        <p>Fill a row, column or diagonal with chips.</p>
      </div>
    </div>
  )
}
