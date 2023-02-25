import React from 'react'
import Overlay from './components/overlay'

import styles from './app.module.css'

export default function App(){
  return (
    <div className={styles.app}>
      <Overlay />
    </div>
  )
}
