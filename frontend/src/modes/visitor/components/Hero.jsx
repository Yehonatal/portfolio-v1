import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { VISITOR_DATA } from '../data/visitorData'
import { useFlowField } from '../hooks/useFlowField'

// ─── Staggered character reveal with elastic overshoot ───
function RevealChar({ char, index, delay }) {
  return (
    <motion.span
      initial={{ y: '130%', opacity: 0, scaleY: 1.4 }}
      animate={{ y: '0%', opacity: 1, scaleY: 1 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1], 
        delay: delay + index * 0.045,
      }}
      className="inline-block"
      style={{ transformOrigin: 'bottom center' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

function AnimatedName({ text, delay = 0 }) {
  return (
    <span className="inline-flex overflow-hidden" style={{ perspective: '800px' }}>
      {text.split('').map((char, i) => (
        <RevealChar key={i} char={char} index={i} delay={delay} />
      ))}
    </span>
  )
}

// ─── Infinite horizontal marquee ───
function Marquee({ items, speed = 35, reverse = false }) {
  const tripled = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden whitespace-nowrap pointer-events-none select-none w-full">
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ['-33.333%', '0%'] : ['0%', '-33.333%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0 mx-8">
            <span className="text-ink opacity-[0.035] font-display italic text-[clamp(2rem,5vw,4.5rem)] font-light uppercase tracking-widest">
              {item}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero({ onBackToPersona, theme, toggleTheme }) {
  const [time, setTime] = useState("")
  const containerRef = useRef(null)
  const flowCanvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize the generative flow field
  useFlowField(flowCanvasRef)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // ─── Scroll transforms ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const nameOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const nameY = useTransform(scrollYProgress, [0, 0.45], [0, -150])
  const nameScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.88])
  const metaOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // ─── Parallax for name offset ───
  const mouseXVal = useMotionValue(0)
  const mouseYVal = useMotionValue(0)

  useEffect(() => {
    const handleMove = (e) => {
      mouseXVal.set(e.clientX - window.innerWidth / 2)
      mouseYVal.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseXVal, mouseYVal])

  const sx = useSpring(mouseXVal, { stiffness: 35, damping: 20 })
  const sy = useSpring(mouseYVal, { stiffness: 35, damping: 20 })

  const xFirst = useTransform(sx, v => `${v * 0.018}vw`)
  const yFirst = useTransform(sy, v => `${v * 0.01}vh`)
  const xLast = useTransform(sx, v => `${v * -0.012}vw`)
  const yLast = useTransform(sy, v => `${v * 0.013}vh`)

  // ─── Rotating descriptors ───
  const descriptors = ["builds systems", "crafts interfaces", "ships fast", "thinks in types", "makes art"]
  const [dIdx, setDIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setDIdx(p => (p + 1) % descriptors.length), 2400)
    return () => clearInterval(interval)
  }, [])

  const marqueeWords = [
    'SOFTWARE ENGINEER', 'CREATIVE DEVELOPER', 'FULLSTACK',
    'OPEN SOURCE', 'ADDIS ABABA', 'DESIGN SYSTEMS', 'TYPESCRIPT', 'REACT'
  ]

  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none">

      {/* ━━━ LAYER 0: Generative flow field canvas ━━━ */}
      <motion.canvas
        ref={flowCanvasRef}
        style={{ opacity: canvasOpacity }}
        className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
      />

      {/* ━━━ LAYER 1: Marquee text bands behind the name ━━━ */}
      <motion.div
        style={{ opacity: canvasOpacity }}
        className="absolute inset-0 flex flex-col justify-center gap-4 z-[1] pointer-events-none overflow-hidden"
      >
        <Marquee items={marqueeWords} speed={50} />
        <Marquee items={[...marqueeWords].reverse()} speed={60} reverse />
        <Marquee items={marqueeWords} speed={45} />
      </motion.div>

      {/* ━━━ LAYER 2: Top bar ━━━ */}
      <motion.div
        style={{ opacity: metaOpacity }}
        className="grid grid-cols-12 w-full text-[10px] tracking-widest font-mono text-ink relative z-10"
      >
        <div className="col-span-6 uppercase font-medium flex flex-wrap gap-4 items-center">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            PORTFOLIO // 2026
          </motion.span>
          {onBackToPersona && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              onClick={onBackToPersona}
              className="underline cursor-none hover:opacity-75 focus:outline-none"
              data-cursor="link"
            >
              [BACK TO PORTAL]
            </motion.button>
          )}
        </div>
        <div className="col-span-6 text-right font-medium flex items-center justify-end gap-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            onClick={toggleTheme}
            className="underline cursor-none hover:opacity-75 focus:outline-none uppercase font-bold"
            data-cursor="link"
          >
            [{theme === 'light' ? 'DARK' : 'LIGHT'} MODE]
          </motion.button>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="tabular-nums"
          >
            {time} EAT
          </motion.span>
        </div>
      </motion.div>

      {/* ━━━ LAYER 3: The Name — centrepiece ━━━ */}
      <motion.div
        style={{ opacity: nameOpacity, y: nameY, scale: nameScale }}
        layoutId="yonatan-name"
        className="my-auto flex flex-col gap-0 w-full relative z-10"
      >
        {/* Red signature line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isLoaded ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="h-[2px] w-20 md:w-32 bg-[#C8392B] mb-4 md:mb-6"
        />

        {/* YONATAN */}
        <motion.div style={{ x: xFirst, y: yFirst }}>
          <h1
            className="font-display italic font-light tracking-[-0.04em] leading-[0.8] text-[clamp(4.5rem,14vw,12rem)] uppercase text-ink select-text mix-blend-multiply dark:mix-blend-screen"
            data-cursor="text"
          >
            <AnimatedName text={VISITOR_DATA.name.first} delay={0.4} />
          </h1>
        </motion.div>

        {/* AFEWERK — indented */}
        <motion.div style={{ x: xLast, y: yLast }} className="md:ml-[15vw]">
          <h1
            className="font-display italic font-light tracking-[-0.04em] leading-[0.8] text-[clamp(4.5rem,14vw,12rem)] uppercase text-ink select-text mix-blend-multiply dark:mix-blend-screen"
            data-cursor="text"
          >
            <AnimatedName text={VISITOR_DATA.name.last} delay={0.75} />
          </h1>
        </motion.div>

        {/* Closing line — right-aligned */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isLoaded ? 1 : 0 }}
          transition={{ delay: 2.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'right' }}
          className="h-px w-full bg-ink-faded/15 mt-6 md:mt-8"
        />
      </motion.div>

      {/* ━━━ LAYER 4: Bottom metadata bar ━━━ */}
      <motion.div
        style={{ opacity: metaOpacity }}
        className="grid grid-cols-12 w-full items-end relative z-10"
      >
        {/* Left: titles + rotating descriptor */}
        <div className="col-span-7 md:col-span-5 space-y-2">
          {VISITOR_DATA.title.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 + i * 0.1, duration: 0.5 }}
              className="block text-[10px] font-mono text-ink uppercase font-medium tracking-widest"
            >
              [{t}]
            </motion.span>
          ))}

          <div className="h-5 overflow-hidden mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={dIdx}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 0.45 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="block text-[10px] font-mono text-ink-faded tracking-widest uppercase"
              >
                — {descriptors[dIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: location + scroll arrow */}
        <motion.div
          className="col-span-5 col-start-8 flex flex-col items-end gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <span className="text-[8px] font-mono text-ink-faded tracking-[0.2em] uppercase">
            {VISITOR_DATA.location}
          </span>

          <div className="flex items-center gap-3 text-[9px] font-mono text-ink uppercase font-semibold tracking-widest">
            <motion.div
              className="w-px h-8 bg-[#C8392B]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
            />
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-end"
            >
              <span className="text-[8px]">SCROLL</span>
              <span className="text-[#C8392B] text-sm font-bold leading-none">↓</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
