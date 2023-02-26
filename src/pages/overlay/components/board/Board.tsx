import React from "react";
import styles from "./board.module.css";

import BoardData from '../../../../assets/board.json'

interface Board{
  img: {
    src: string
    altText: string
  }
  title: string
}
export default function Board() {
  const [board, setBoard] = React.useState<Board[]>(BoardData)

  return (
    <div className={styles.board}>
      { board.map((item: Board, index: number) => {
        return (
          <div key={index} className={styles.boardTile}>
            <img src={item.img.src} alt={item.img.altText} />
            <p>{item.title}</p>
          </div>
        )})
      }
    </div>
  );
}
