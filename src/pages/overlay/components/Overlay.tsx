import React from 'react'
import styles from './overlay.module.css'

import Board from './board/Board'
import Instructions from './instructions/Instructions'
import { Tile } from './board/Board'
import checkBingo from "./board/bingoChecker";

import BoardData from '../../../assets/board.json'
import Streamer from '../../../assets/streamer.json'

interface OverlayProps {
  isOverlayVisible: boolean
}
export default function Overlay(props: OverlayProps){
  const randomizeBoard = (board: Tile[]) => {
    const boardCopy = [...board]
    for (let i = boardCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boardCopy[i], boardCopy[j]] = [boardCopy[j], boardCopy[i]];
    }
    return boardCopy
  }
  const handleNewGame = () => {
    const newBoard = BoardData.map((tile: Tile) => {
      return {
        ...tile,
        clicked: false
      }
    })
    setBoard(randomizeBoard(newBoard))
  }

  const [isExtensionOpen, setIsExtensionOpen] = React.useState(false)
  const [isInstructionsOpen, setIsInstructionsOpen] = React.useState(false)
  const [streamer] = React.useState(Streamer.name)

  const [bingo, setBingo] = React.useState<boolean>(
    localStorage.getItem('bingo') ? JSON.parse(localStorage.getItem('bingo') || '')
    : false
  )
  const [board, setBoard] = React.useState<Tile[]>(
    localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board') || '')
    : randomizeBoard(BoardData)
  )

  React.useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('bingo', JSON.stringify(bingo))
    checkBingo(board) ? setBingo(true) : setBingo(false)
  }, [board])

  return (
    <div className={`${styles.overlay} ${styles.openExtensionButton} ${isExtensionOpen && props.isOverlayVisible ? styles.open: styles.closed}`}>
      <main>
        {isInstructionsOpen ? <Instructions closeInstructions={()=>setIsInstructionsOpen(false)} /> : null}

        <div className={styles.title}>
          <h1>{streamer} Bingo </h1>
          <button className={styles.help} onClick={()=>setIsInstructionsOpen(true)}>?</button>
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

        <span className={styles.credits}>Made by @AbdullahMorrison</span>
      </main>

      <button className={`${styles.openExtensionButton} ${props.isOverlayVisible? null : styles.hideOpenExtensionButton}`} onClick={() => setIsExtensionOpen(!isExtensionOpen)}></button>
    </div>
  )
}
