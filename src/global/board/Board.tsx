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
  const randomizeBoard = (board: Tile[]) => {
    const boardCopy = [...board]
    for (let i = boardCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boardCopy[i], boardCopy[j]] = [boardCopy[j], boardCopy[i]];
    }
    return boardCopy
  }
  const [board, setBoard] = React.useState<Tile[]>(
    localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board') || '')
    : randomizeBoard(BoardData)
  )

  const handleNewGame = () => {
    const newBoard = BoardData.map((tile: Tile) => {
      return {
        ...tile,
        clicked: false
      }
    })
    setBoard(randomizeBoard(newBoard))
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
