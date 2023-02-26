import React from "react";
import styles from "./board.module.css";

export default function Board() {
  return (
    <div className={styles.board}>
      {
        <div className={styles.boardTile}>
          <img src="" alt="Image" />
          <p>Example of Tile Item</p>
        </div>
      }
    </div>
  );
}
