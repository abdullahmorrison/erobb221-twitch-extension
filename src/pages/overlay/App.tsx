import React from 'react'
import Overlay from './components/overlay'

import styles from './app.module.css'

export default function App(){
  const [showOverlay, setShowOverlay] = React.useState(false)

  return (
    <div
      className={styles.app}
      onMouseMove={setShowOverlay.bind(null, true)}
      onMouseLeave={setShowOverlay.bind(null, false)}
    >
      <Overlay
        showOverlay={showOverlay}
      />
    </div>
  )
}
