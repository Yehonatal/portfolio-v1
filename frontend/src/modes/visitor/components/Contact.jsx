import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion'
import { VISITOR_DATA } from '../data/visitorData'

function EmailCopy({ email }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    try {
      navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {}
  }

  return (
    <motion.button
      onClick={copy}
      className="bg-none border-none cursor-none font-mono text-[clamp(0.85rem,1.3vw,1.1rem)] text-inherit uppercase tracking-[0.15em] mt-10 focus:outline-none relative group"
      data-cursor="link"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? "copied" : "email"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {copied ? "→ copied to clipboard" : email}
        </motion.span>
      </AnimatePresence>
      {/* Animated underline */}
      <motion.div
        className="h-px bg-current mt-2 opacity-30"
        initial={{ scaleX: 0.3 }}
        whileHover={{ scaleX: 1, opacity: 0.6 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.button>
  )
}

// ─── Word-by-word reveal CTA ───
function CTAReveal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" })
  
  const lines = [
    { words: ["Let's", "make"], delay: 0 },
    { words: ["something"], delay: 0.2 },
  ]

  return (
    <div ref={ref}>
      <h2
        className="font-display italic font-light text-[clamp(3rem,9vw,8rem)] text-center leading-[0.9] select-text tracking-tight"
        data-cursor="text"
      >
        {lines.map((line, lIdx) => (
          <span key={lIdx} className="block">
            {line.words.map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden mr-[0.2em]">
                <motion.span
                  initial={{ y: '120%', rotateZ: 3 }}
                  animate={isInView ? { y: '0%', rotateZ: 0 } : {}}
                  transition={{
                    duration: 1.0,
                    ease: [0.22, 1, 0.36, 1],
                    delay: line.delay + wIdx * 0.08
                  }}
                  className="inline-block"
                  style={{ transformOrigin: 'bottom left' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
        
        {/* THE RED WORD — separate line for maximum impact */}
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: '120%', rotateZ: -2 }}
            animate={isInView ? { y: '0%', rotateZ: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="inline-block"
            style={{ transformOrigin: 'bottom right' }}
          >
            <motion.span
              className="inline-block text-[#C8392B]"
              whileHover={{ 
                x: [0, -4, 4, -3, 3, 0],
                letterSpacing: '0.02em',
              }}
              transition={{ duration: 0.4 }}
            >
              impossible.
            </motion.span>
          </motion.span>
        </span>
      </h2>
    </div>
  )
}

export default function Contact({ theme }) {
  const containerRef = useRef(null)
  const [isInverted, setIsInverted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInverted(latest > 0.35)
  })

  // Horizontal lines that sweep across during the inversion
  const lineScale1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const lineScale2 = useTransform(scrollYProgress, [0.30, 0.55], [0, 1])
  const lineScale3 = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])

  return (
    <motion.section
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden select-none p-6 md:p-12 transition-colors duration-700 ${
        isInverted
          ? 'bg-[var(--ink)] text-[var(--paper)]'
          : 'bg-[var(--paper)] text-[var(--ink)]'
      }`}
    >
      {/* Dramatic sweep lines during transition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[lineScale1, lineScale2, lineScale3].map((scale, i) => (
          <motion.div
            key={i}
            style={{ 
              scaleX: scale, 
              transformOrigin: i % 2 === 0 ? 'left' : 'right',
              top: `${30 + i * 20}%`,
            }}
            className={`absolute left-0 w-full h-px ${
              isInverted ? 'bg-[var(--paper)]' : 'bg-[var(--ink)]'
            } opacity-[0.06]`}
          />
        ))}
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Section label */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-[9px] font-mono tracking-[0.3em] uppercase mb-16 md:mb-20"
      >
        CONTACT &mdash; LET'S TALK
      </motion.span>

      {/* CTA Heading */}
      <CTAReveal />

      {/* Email */}
      <EmailCopy email={VISITOR_DATA.email} />

      {/* Social links */}
      <motion.nav
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center gap-8 font-mono text-[10px] tracking-[0.2em] mt-14 uppercase font-semibold"
      >
        {[
          { label: 'GITHUB', url: VISITOR_DATA.links.github },
          { label: 'LINKEDIN', url: VISITOR_DATA.links.linkedin },
        ].map((link, i) => (
          <React.Fragment key={link.label}>
            {i > 0 && <span className="opacity-20">◆</span>}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity text-inherit group"
              data-cursor="link"
            >
              <span className="group-hover:text-[#C8392B] transition-colors duration-300">{link.label}</span>
            </a>
          </React.Fragment>
        ))}
      </motion.nav>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <span className="text-[8px] font-mono tracking-[0.2em] uppercase">
          DESIGNED &amp; BUILT BY {VISITOR_DATA.name.first} {VISITOR_DATA.name.last} &mdash; 2026
        </span>
      </motion.div>
    </motion.section>
  )
}
