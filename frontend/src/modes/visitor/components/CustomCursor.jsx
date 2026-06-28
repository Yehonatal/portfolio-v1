import React from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '../hooks/useCursor'

export default function CustomCursor() {
  const {
    mouseX,
    mouseY,
    springX,
    springY,
    isHoveringText,
    isHoveringClickable,
    isDrawing,
    isHidden
  } = useCursor()

  const opacity = isHidden ? 0 : 1

  return (
    <>
      {/* Outer Ring lagging behind cursor using spring coordinates */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          border: '1.5px solid #FFFFFF',
          mixBlendMode: 'difference',
          opacity: opacity,
        }}
        animate={{
          width: isHoveringClickable ? 56 : (isHoveringText ? 48 : 24),
          height: isHoveringClickable ? 56 : (isHoveringText ? 48 : 24),
          backgroundColor: isHoveringClickable 
            ? 'rgba(255, 255, 255, 1)' 
            : (isHoveringText ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)'),
          borderRadius: '9999px',
          borderWidth: isHoveringClickable ? '2px' : '1.5px',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      />

      {/* Inner Dot following exactly */}
      <motion.div
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          borderRadius: '9999px',
          opacity: isHoveringClickable ? 0 : opacity,
          width: isHoveringText ? 3 : 5,
          height: isHoveringText ? 3 : 5,
        }}
        transition={{ duration: 0.05 }}
      />
    </>
  )
}
