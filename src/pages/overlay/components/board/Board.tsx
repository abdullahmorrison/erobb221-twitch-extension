import React from "react";
import styles from "./board.module.css";

import BoardData from '../../../../assets/board.json'
import checkBingo from "./bingoChecker";

import Chip from '../chip/Chip'

export interface Tile{
  img: {
    src: string
    altText: string
  }
  title: string
  clicked: boolean
}
export default function Board() {
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

  return (
    <div className={`${styles.board} ${bingo ? styles.bingo : null}`}>
      { board.map((tile: Tile, index: number) => {
        return (
          <div key={index} className={styles.boardTile} onClick={
            () => {
              const newBoard = [...board]
              newBoard[index].clicked = !newBoard[index].clicked
              setBoard(newBoard)
            }
          }>
            <img src={tile.img.src} alt={tile.img.altText}/>
            <p>{tile.title}</p>
            {tile.clicked ? <Chip/> : null}
          </div>
        )})
      }
    </div>
  );
}
