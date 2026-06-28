import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Interrupt({ onComplete }) {
  const [phase, setPhase] = useState('intro') // 'intro' -> 'name' -> 'leaving'

  useEffect(() => {
    const nameTimeout = setTimeout(() => setPhase('name'), 400)
    const leaveTimeout = setTimeout(() => setPhase('leaving'), 1400)
    const doneTimeout = setTimeout(() => onComplete(), 2100)

    return () => {
      clearTimeout(nameTimeout)
      clearTimeout(leaveTimeout)
      clearTimeout(doneTimeout)
    }
  }, [onComplete])

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Top half */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'leaving' ? '-100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-[50.5vh] border-b"
        style={{
          backgroundColor: '#0F0E0D',
          borderColor: 'rgba(242, 239, 232, 0.1)'
        }}
      />
      {/* Bottom half */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'leaving' ? '100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-[50.5vh] border-t"
        style={{
          backgroundColor: '#0F0E0D',
          borderColor: 'rgba(242, 239, 232, 0.1)'
        }}
      />

      {/* Loading bar across the horizontal split */}
      <motion.div
        className="absolute left-0 h-px z-20"
        style={{ top: '50%', backgroundColor: '#C8392B' }}
        initial={{ width: '0%' }}
        animate={{ width: phase === 'leaving' ? '100%' : phase === 'name' ? '65%' : '0%' }}
        transition={{ duration: phase === 'leaving' ? 0.3 : 1.0, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Shared layout name */}
      <motion.h1
        layoutId="yonatan-name"
        animate={{ opacity: phase === 'leaving' ? 0 : phase === 'name' ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 font-display italic font-light tracking-tight leading-none text-center uppercase"
        style={{ 
          color: '#F2EFE8',
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          letterSpacing: '0.02em'
        }}
      >
        yonatan afewerk
      </motion.h1>
    </motion.div>
  )
}
