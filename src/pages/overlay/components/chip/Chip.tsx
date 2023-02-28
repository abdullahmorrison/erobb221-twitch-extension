import React from "react";

import ChipData from "../../../../assets/chip.json"

import styles from "./chip.module.css";

interface Chip{
  img: {
    src: string;
    alt: string;
  }
}
export default function Chip() {
  const [chip]= React.useState<Chip>(ChipData);

  return (
    <div className={styles.chip}>
      <img src={chip.img.src} alt={chip.img.alt} draggable={false} />
    </div>
  );
}
