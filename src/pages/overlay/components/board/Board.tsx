import React from "react";
import styles from "./board.module.css";

import BoardData from '../../../../assets/board.json'

import Chip from '../chip/Chip'

interface Tile{
  img: {
    src: string
    altText: string
  }
  title: string
  clicked: boolean
}
export default function Board() {
  const [board, setBoard] = React.useState<Tile[]>(
    localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board') || '')
    : BoardData
  )

  React.useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board))
  }, [board])

  return (
    <div className={styles.board}>
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
