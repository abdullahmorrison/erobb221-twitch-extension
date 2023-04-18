import React from 'react'
import Overlay from './components/overlay'
import useChatCommand from './chatCommand'

import styles from './app.module.css'

export default function App(){
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(false)
  const [isExtensionOpen, setIsExtensionOpen] = React.useState(false)
  const sleepTimer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const [command, setCommand] = useChatCommand()
  React.useEffect(() => {
    if (command === 'bingo') {
      showOverlay(2)
      setCommand('')
    }
  }, [command])

  const showOverlay = (seconds: number) => {
    setIsOverlayVisible(true)
    if(sleepTimer.current) clearTimeout(sleepTimer.current)

    sleepTimer.current = setTimeout(() => {
      setIsOverlayVisible(false)
      setIsExtensionOpen(false)
    }, seconds*1000)
  }

  return (
    <div
      className={styles.app}
      onMouseMove={()=>showOverlay(5)}
      onMouseLeave={()=>setIsOverlayVisible(false)}
      onClick={(event)=>isExtensionOpen && event.target == event.currentTarget? setIsExtensionOpen(false) : null}
    >
      <Overlay
        isOverlayVisible={isOverlayVisible}
        isExtensionOpen={isExtensionOpen}
        setIsExtensionOpen={setIsExtensionOpen}
      />
    </div>
  )
}
