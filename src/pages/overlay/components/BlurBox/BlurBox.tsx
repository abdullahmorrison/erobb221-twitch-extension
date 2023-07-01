import React, { useEffect, useRef } from 'react'

import styles from './blurBox.module.css'

export default function BlurBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const [isDrawing, setIsDrawing] = React.useState(false)

  const canvasOffsetX = useRef(0)
  const canvasOffsetY = useRef(0)
  const startX = useRef(0)
  const startY = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if(canvas === null) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const context = canvas.getContext('2d')
    if(context === null) return

    contextRef.current = context

    const canvasOffset = canvas.getBoundingClientRect()
    canvasOffsetX.current = canvasOffset.left
    canvasOffsetY.current = canvasOffset.top
  }, [])

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    //clear blur box if user does ctrl + left-click without dragging
    if(event.ctrlKey && event.button === 0) clearBlurBox()

    const context = contextRef.current
    if(context === null || !event.ctrlKey) return

    setIsDrawing(true)
    startX.current = event.clientX - canvasOffsetX.current
    startY.current = event.clientY - canvasOffsetY.current
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const context = contextRef.current
    if(context === null || !event.ctrlKey) return

    if(!isDrawing) return

    const x = event.clientX - canvasOffsetX.current
    const y = event.clientY - canvasOffsetY.current

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.strokeRect(startX.current, startY.current, x - startX.current, y - startY.current)
    context.filter = 'blur(20px)'
    context.fillRect(startX.current, startY.current, x - startX.current, y - startY.current)
    context.fillStyle = '#e6d5b8'
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearBlurBox = () => {
    const context = contextRef.current
    if(context === null) return

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }

  return(
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    ></canvas>
  )
}
