import React from "react"
import { Tomato } from "./types"
import styles from "./tomato.module.css"

interface tomatoProps {
  tomatoes: Tomato[]
}
export default function Tomato(props: tomatoProps) {
  return (
    <>
      {props.tomatoes.map(tomato => (
        <div
          key={tomato.x + tomato.y + tomato.rotate}
          className={tomato.splatter ? styles.tomatoSplatter : styles.tomato}
          style={{
            left: `${tomato.x}%`,
            bottom: `${tomato.y}%`,
            transform: `rotateZ(${tomato.rotate}deg)`,
          }}
        ></div>
      ))
      }
    </>
  )
}
