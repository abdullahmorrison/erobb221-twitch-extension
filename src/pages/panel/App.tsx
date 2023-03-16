import React from 'react'
import Panel from './components/panel'

import styles from './app.module.css'

export default function App(){
  return (
    <div className={styles.app}>
      <Panel/>
    </div>
  )
}

