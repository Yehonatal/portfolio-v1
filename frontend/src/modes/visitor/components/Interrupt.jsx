import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const statusMessages = [
  { threshold: 0, text: "INIT_SYSTEM_CORE..." },
  { threshold: 20, text: "PARSING_PORTFOLIO_ARCS..." },
  { threshold: 45, text: "COMPILING_VECTOR_FIELDS..." },
  { threshold: 70, text: "SPAWNING_FLOW_PARTICLES..." },
  { threshold: 90, text: "ESTABLISHING_CONTEXT..." }
]

export default function Interrupt({ theme, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('intro') // 'intro' -> 'leaving'
  const isDark = theme === 'dark'

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      if (current < 100) {
        const remaining = 100 - current
        let increment = 1
        if (remaining > 80) {
          increment = Math.floor(Math.random() * 3) + 2
        } else if (remaining > 50) {
          increment = Math.floor(Math.random() * 2) + 2
        } else if (remaining > 20) {
          increment = Math.floor(Math.random() * 2) + 1
        } else {
          increment = 1
        }
        current = Math.min(100, current + increment)
        setProgress(current)
      } else {
        clearInterval(interval)
        setTimeout(() => setPhase('leaving'), 600)
        setTimeout(() => onComplete(), 1400)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [onComplete])

  // Get current active status message
  const activeStatus = [...statusMessages].reverse().find(msg => progress >= msg.threshold)?.text || ""

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none"
    >
      {/* ━━━ LAYER 0: Grid lines background on the curtains ━━━ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loader-scan {
          0% { transform: translateY(-50vh); }
          100% { transform: translateY(50vh); }
        }
        .loader-grid-lines {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, ${isDark ? 'rgba(242, 239, 232, 0.02)' : 'rgba(15, 14, 13, 0.02)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? 'rgba(242, 239, 232, 0.02)' : 'rgba(15, 14, 13, 0.02)'} 1px, transparent 1px);
        }
      `}} />

      {/* ━━━ LAYER 1: Dual-layered split curtains (Parallax sliding door) ━━━ */}
      {/* Outer top curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'leaving' ? '-100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className={`absolute top-0 left-0 w-full h-[50vh] z-10 border-b ${
          isDark 
            ? 'bg-[#0B0A09] border-[#F2EFE8]/5' 
            : 'bg-[#F2EFE8] border-[#0F0E0D]/5'
        }`}
      >
        <div className="absolute inset-0 loader-grid-lines" />
      </motion.div>
      
      {/* Outer bottom curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'leaving' ? '100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className={`absolute bottom-0 left-0 w-full h-[50vh] z-10 border-t ${
          isDark 
            ? 'bg-[#0B0A09] border-[#F2EFE8]/5' 
            : 'bg-[#F2EFE8] border-[#0F0E0D]/5'
        }`}
      >
        <div className="absolute inset-0 loader-grid-lines" />
      </motion.div>

      {/* Inner top secondary curtain (reveals slightly later/faster for 3D depth) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'leaving' ? '-100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
        className={`absolute top-0 left-0 w-full h-[50vh] border-b border-[#C8392B]/10 z-0 ${
          isDark ? 'bg-[#0F0E0D]' : 'bg-[#E5E2DA]'
        }`}
      />

      {/* Inner bottom secondary curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: phase === 'leaving' ? '100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: 0.05 }}
        className={`absolute bottom-0 left-0 w-full h-[50vh] border-t border-[#C8392B]/10 z-0 ${
          isDark ? 'bg-[#0F0E0D]' : 'bg-[#E5E2DA]'
        }`}
      />

      {/* Laser line splits across the middle */}
      <motion.div
        className="absolute left-0 h-[2px] z-30"
        style={{ top: 'calc(50% - 1px)', backgroundColor: '#C8392B' }}
        initial={{ width: '0%', opacity: 1 }}
        animate={{ 
          width: phase === 'leaving' ? '100%' : `${progress}%`,
          opacity: phase === 'leaving' ? 0 : 1
        }}
        transition={{ duration: phase === 'leaving' ? 0.35 : 0.05, ease: 'easeOut' }}
      />

      {/* ━━━ LAYER 2: Central UI details block ━━━ */}
      <motion.div
        animate={{ opacity: phase === 'leaving' ? 0 : 1, y: phase === 'leaving' ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex flex-col items-center gap-6 text-center px-6"
      >
        {/* Tech header indicator */}
        <div className={`flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] ${
          isDark ? 'text-[#F2EFE8]/40' : 'text-[#0F0E0D]/40'
        }`}>
          <span>PORTAL_INITIALIZATION</span>
          <span>//</span>
          <span>SYS_BOOT_v1.0.4</span>
        </div>

        {/* Large name logo with slide-up reveal */}
        <h1 
          className={`font-display italic font-light tracking-tight leading-none uppercase ${
            isDark ? 'text-[#F2EFE8]' : 'text-[#0F0E0D]'
          }`}
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}
        >
          yonatan afewerk
        </h1>

        {/* Dynamic status and progress counter */}
        <div className="flex flex-col items-center gap-2 mt-4 min-w-[280px]">
          {/* Progress bar wrap */}
          <div className={`w-full h-[3px] rounded-full overflow-hidden relative ${
            isDark 
              ? 'bg-[#F2EFE8]/5 border border-[#F2EFE8]/10' 
              : 'bg-[#0F0E0D]/5 border border-[#0F0E0D]/10'
          }`}>
            <motion.div 
              className={`absolute left-0 top-0 h-full rounded-full ${
                isDark ? 'bg-[#F2EFE8]/60' : 'bg-[#0F0E0D]/60'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={`flex justify-between items-center w-full font-mono text-[9px] mt-1 tracking-wider ${
            isDark ? 'text-[#F2EFE8]/60' : 'text-[#0F0E0D]/60'
          }`}>
            {/* Status message */}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeStatus}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="text-[#C8392B] font-bold"
              >
                {activeStatus}
              </motion.span>
            </AnimatePresence>

            {/* Percentage */}
            <span className={`tabular-nums font-semibold ${
              isDark ? 'text-[#F2EFE8]/80' : 'text-[#0F0E0D]/80'
            }`}>
              [{String(progress).padStart(3, '0')}%]
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
