import React from "react";
import styles from "./board.module.css";


import Chip from '../chip/Chip'

export interface Tile{
  img: {
    src: string
    altText: string
  }
  title: string
  clicked: boolean
}
interface BoardProps{
  board: Tile[]
  bingo: boolean
  clickTile: (index: number) => void
}
export default function Board(props: BoardProps) {
  return (
    <div className={`${styles.board} ${props.bingo ? styles.bingo : null}`}>
      { props.board.map((tile: Tile, index: number) => {
        return (
          <div key={index} className={styles.boardTile} onClick={()=>props.clickTile(index)}>
            <img src={tile.img.src} alt={tile.img.altText}/>
            <p>{tile.title}</p>
            {tile.clicked ? <Chip/> : null}
          </div>
        )})
      }
    </div>
  );
}
