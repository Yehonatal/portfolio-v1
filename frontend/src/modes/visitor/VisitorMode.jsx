import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VISITOR_DATA } from './data/visitorData'

// Component imports
import Interrupt from './components/Interrupt'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import WorkArchive from './components/WorkArchive'
import Process from './components/Process'
import About from './components/About'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import TerminalOverlay from './components/TerminalOverlay'

// Hooks
import { useInkTrail } from './hooks/useInkTrail'

let consoleLogged = false

export default function VisitorMode({ onBackToPersona }) {
  const [interruptDone, setInterruptDone] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('visitor-theme') || 'light'
    }
    return 'light'
  })

  const [terminalOpen, setTerminalOpen] = useState(false)
  const canvasRef = useRef(null)

  // Initialize canvas ink trail
  useInkTrail(canvasRef)

  // SSR-safe check for sessionStorage and reduced motion on mount
  useEffect(() => {
    // Fire console easter egg exactly once
    if (!consoleLogged) {
      console.log(
        `%c${VISITOR_DATA.consoleMessage}`,
        "color: #C8392B; font-family: monospace; font-size: 14px; font-weight: bold; line-height: 1.5;"
      )
      consoleLogged = true
    }

    const skip = sessionStorage.getItem('interrupt-done') === 'true'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (skip || reduceMotion) {
      setInterruptDone(true)
    }
  }, [])

  // Manage document body class list for visitor-mode-active
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('visitor-mode-active')
    
    // Store original dark theme state
    const wasDark = root.classList.contains('dark')
    
    return () => {
      root.classList.remove('visitor-mode-active')
      // Restore original dark/light theme state
      if (wasDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [])

  // React to theme changes and update CSS root tokens
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.style.setProperty('--paper', '#F2EFE8')
      root.style.setProperty('--ink', '#0F0E0D')
      root.style.setProperty('--ink-rgb', '15, 14, 13')
      root.style.setProperty('--ink-faded', 'rgba(15, 14, 13, 0.35)')
      root.style.setProperty('--paper-dark', '#1A1816')
      root.style.setProperty('--ink-light', '#F2EFE8')
      
      // Sync global theme class to prevent text-color inheritance clashes
      root.classList.remove('dark')
    } else {
      root.style.setProperty('--paper', '#0F0E0D')
      root.style.setProperty('--ink', '#F2EFE8')
      root.style.setProperty('--ink-rgb', '242, 239, 232')
      root.style.setProperty('--ink-faded', 'rgba(242, 239, 232, 0.35)')
      root.style.setProperty('--paper-dark', '#F2EFE8')
      root.style.setProperty('--ink-light', '#0F0E0D')
      
      // Sync global theme class to prevent text-color inheritance clashes
      root.classList.add('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('visitor-theme', nextTheme)
  }

  // Set up dynamic fonts, listeners, console messages and titles
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--font-display', "'Playfair Display', Georgia, serif")
    root.style.setProperty('--font-body', "'Inter', system-ui, sans-serif")
    root.style.setProperty('--font-mono', "'JetBrains Mono', monospace")

    // Load Google Webfonts dynamically
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap'
    document.head.appendChild(link)

    // Set up tab title cycling
    const titles = ["Yonatan Afewerk", "Software Engineer", "Creative Developer", "↑ scroll up"]
    let titleIndex = 0
    const originalTitle = document.title

    const titleInterval = setInterval(() => {
      document.title = titles[titleIndex % titles.length]
      titleIndex++
    }, 3000)

    // Keyboard listener for terminal hotkey
    const handleKeyDown = (e) => {
      if (e.key === 't' || e.key === 'T') {
        setTerminalOpen(true)
      }
      if (e.key === 'Escape') {
        setTerminalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      // Cleanup tokens
      root.style.removeProperty('--paper')
      root.style.removeProperty('--ink')
      root.style.removeProperty('--ink-rgb')
      root.style.removeProperty('--ink-faded')
      root.style.removeProperty('--paper-dark')
      root.style.removeProperty('--ink-light')
      root.style.removeProperty('--font-display')
      root.style.removeProperty('--font-body')
      root.style.removeProperty('--font-mono')

      // Remove fonts
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }

      // Restore tab title
      clearInterval(titleInterval)
      document.title = originalTitle

      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Web Audio API tactile UI Sound Effects
  useEffect(() => {
    let audioCtx = null

    const initAudio = () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
    }

    const playSound = (type) => {
      try {
        initAudio()
        if (!audioCtx || audioCtx.state === 'suspended') return

        const osc = audioCtx.createOscillator()
        const gainNode = audioCtx.createGain()
        osc.connect(gainNode)
        gainNode.connect(audioCtx.destination)

        const now = audioCtx.currentTime

        if (type === 'hover') {
          // Soft high-frequency micro tic
          osc.type = 'sine'
          osc.frequency.setValueAtTime(1600, now)
          osc.frequency.exponentialRampToValueAtTime(1000, now + 0.01)
          gainNode.gain.setValueAtTime(0.005, now) // extremely quiet
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.01)
          osc.start(now)
          osc.stop(now + 0.01)
        } else if (type === 'click') {
          // Tactile woodblock-like tick
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(650, now)
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.02)
          gainNode.gain.setValueAtTime(0.03, now)
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)
          osc.start(now)
          osc.stop(now + 0.02)
        }
      } catch (e) {
        // AudioContext blocked
      }
    }

    const handleGlobalClick = (e) => {
      const target = e.target
      if (!target) return
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-cursor="link"]') ||
        target.closest('.cursor-pointer')
      ) {
        playSound('click')
      }
    }

    let lastHoveredElement = null
    const handleGlobalMouseOver = (e) => {
      const target = e.target
      if (!target) return
      
      const clickable = target.closest('a') || 
                        target.closest('button') || 
                        target.closest('[data-cursor="link"]') ||
                        target.closest('.cursor-pointer')

      if (clickable && clickable !== lastHoveredElement) {
        lastHoveredElement = clickable
        playSound('hover')
      } else if (!clickable) {
        lastHoveredElement = null
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('mouseover', handleGlobalMouseOver)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('mouseover', handleGlobalMouseOver)
      if (audioCtx) {
        audioCtx.close()
      }
    }
  }, [])

  const handleInterruptComplete = useCallback(() => {
    setInterruptDone(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('interrupt-done', 'true')
    }
  }, [])

  return (
    <div 
      className="min-h-screen w-full relative overflow-x-hidden transition-colors duration-500"
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        fontFamily: 'var(--font-body)',
        cursor: 'none',
        scrollbarWidth: 'none'
      }}
    >
      {/* Global CSS Style sandbox block */}
      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          background-color: var(--paper) !important;
          color: var(--ink) !important;
          cursor: none !important;
          scrollbar-width: none !important;
          transition: background-color 0.5s ease, color 0.5s ease;
          overflow-x: hidden;
        }
        a, button, [data-cursor], input {
          cursor: none !important;
        }
        ::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          height: 0px !important;
        }
        .visitor-grid-lines {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(var(--ink-rgb), 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--ink-rgb), 0.02) 1px, transparent 1px);
        }
      `}} />

      {/* Global Interactive Elements cursor trail */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-screen h-screen z-0 pointer-events-none" 
      />

      {/* Fine technical blueprint grid background */}
      <div className="absolute inset-0 visitor-grid-lines pointer-events-none z-0" />

      {/* Custom Spring Cursor */}
      <CustomCursor />

      {/* Full-screen Loading Interrupt screen */}
      <AnimatePresence>
        {!interruptDone && (
          <Interrupt onComplete={handleInterruptComplete} />
        )}
      </AnimatePresence>

      {/* Scrollable exhibition sections */}
      {interruptDone && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full flex flex-col relative z-10"
        >
          <Hero onBackToPersona={onBackToPersona} theme={theme} toggleTheme={toggleTheme} />
          <Manifesto />
          <WorkArchive />
          <Process />
          <About />
          <Contact theme={theme} />
        </motion.main>
      )}

      {/* Keyboard console interface overlay */}
      <AnimatePresence>
        {terminalOpen && (
          <TerminalOverlay onClose={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
