import React from "react";
import styles from "./board.module.css";

import Chip from '../chip/Chip'
import checkBingo from "./bingoChecker";

import BoardData from '../../assets/board.json'


export interface Tile{
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
    : // get 25 random tiles from BoardData to create a board
    BoardData.sort(() => Math.random() - 0.5).slice(0, 25)
  )

  const handleNewGame = () => {
    const newBoard = BoardData.sort(() => Math.random() - 0.5).slice(0, 25)
    setBoard(newBoard)
  }

  const [bingo, setBingo] = React.useState<boolean>(
    localStorage.getItem('bingo') ? JSON.parse(localStorage.getItem('bingo') || '')
    : false
  )

  React.useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('bingo', JSON.stringify(bingo))
    checkBingo(board) ? setBingo(true) : setBingo(false)
  }, [board])

  return (
    <div className={styles.game}>
      <div className={`${styles.board} ${bingo ? styles.bingo : null}`}>
        { board.map((tile: Tile, index: number) => {
          return (
            <div key={index} className={styles.boardTile} onClick={()=>setBoard(
              board.map((tile: Tile, i: number) => {
                if (i === index) {
                  return {
                    ...tile,
                    clicked: !tile.clicked
                  }
                }
                return tile
              })
            )}>
              <img src={tile.img.src} alt={tile.img.altText}/>
              <p>{tile.title}</p>
              {tile.clicked ? <Chip/> : null}
            </div>
          )})
        }
      </div>

      <button onClick={handleNewGame} className={styles.newGameButton}>New Game</button>
    </div>
  );
}

