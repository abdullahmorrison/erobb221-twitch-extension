import React from 'react'
import styles from './hideExtensionModal.module.css'

interface HideExtensionModalProps {
  showHideExtensionModal: boolean
  hideExtension: () => void
  cancel: () => void
}
export default function HideExtensionModal(props: HideExtensionModalProps) {
  return (
    <div className={`${styles.container} ${props.showHideExtensionModal? undefined : styles.hidden}`}
      onClick={(event)=>event.target == event.currentTarget? props.cancel() : null}
    >
      <div className={styles.modal}>
        <span className={styles.close} onClick={props.cancel}>&times;</span>
        <div className={styles.title}>Are You Sure You Want To Hide The Extension?</div>
        <div className={styles.description}>
          <p>
            You won't be able to see the bingo game and the tomatoes being thrown.
          </p>
          <p>
            You can show it again by pressing the same keys:
            <span className={styles.codeSnippet}>
              <code>alt</code> + <code>shift</code> + <code>left-click</code>
            </span>
            on the screen.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.confirm}`} onClick={props.hideExtension}>Hide</button>
          <button className={styles.button} onClick={props.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
