import React from 'react'
import styles from './overlay.module.css'

import Board from './board/Board'
import { Tile } from './board/Board'
import checkBingo from "./board/bingoChecker";

import BoardData from '../../../assets/board.json'

export default function Overlay(){
  const [isExtensionOpen, setIsExtensionOpen] = React.useState(false)
  const [bingo, setBingo] = React.useState<boolean>(
    localStorage.getItem('bingo') ? JSON.parse(localStorage.getItem('bingo') || '')
    : false
  )
  const [board, setBoard] = React.useState<Tile[]>(
    localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board') || '')
    : BoardData
  )
  React.useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('bingo', JSON.stringify(bingo))
    checkBingo(board) ? setBingo(true) : setBingo(false)
  }, [board])

  const handleNewGame = () => {
    const newBoard = BoardData.map((tile: Tile) => {
      return {
        ...tile,
        clicked: false
      }
    })
    setBoard(newBoard)
  }

  return (
    <div className={`${styles.overlay} ${styles.openExtensionButton} ${isExtensionOpen ? styles.open: styles.closed}`}>
      <main>
        <div className={styles.title}>
          <h1>Streamer Bingo </h1>
          <button className={styles.help}>?</button>
        </div>
        <Board
          board={board}
          bingo={bingo}
          clickTile={(index: number) => {
            const newBoard = [...board]
            newBoard[index].clicked = !newBoard[index].clicked
            setBoard(newBoard)
          }}
        />
        <button onClick={handleNewGame} className={styles.newGameButton}>New Game</button>
      </main>

      <button className={styles.openExtensionButton} onClick={() => setIsExtensionOpen(!isExtensionOpen)}></button>
    </div>
  )
}
