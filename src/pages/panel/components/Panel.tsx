import React from "react";

import Board from "../../../global/board/Board";
import Instructions from "../../../global/instructions/Instructions";
import Streamer from "../../../assets/streamer.json";
import styles from "./panel.module.css";

export default function Panel() {
  const [streamer] = React.useState(Streamer)
  const [isInstructionsOpen, setIsInstructionsOpen] = React.useState(false)

  return (
    <div className={styles.panel}>
      <title>
          <h1>{streamer.name} Bingo </h1>
          <button className={styles.help} onClick={()=>setIsInstructionsOpen(true)}>?</button>
      </title>

      {isInstructionsOpen ? <Instructions closeInstructions={()=>setIsInstructionsOpen(false)} /> : null}

      <Board/>
    </div>
  );
}
