import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { VISITOR_DATA } from '../data/visitorData'

// ─── Scroll-linked word that lights up as you read ───
function ScrollWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  const y = useTransform(progress, [start, Math.min(end + 0.02, 1)], [4, 0])

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.35em] transition-colors duration-200"
    >
      {word}
    </motion.span>
  )
}

export default function Manifesto() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"]
  })

  const fullText = "I build things that sit at the edge of what software is supposed to do. From Addis Ababa, working everywhere. Equal parts engineer and creative — the tension between those two things is where all the interesting work lives."
  const words = fullText.split(' ')

  // Decorative line reveal
  const lineScale = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  // Giant quote mark parallax
  const quoteY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.06, 0.06, 0])

  // Accent word indices — "edge", "Addis Ababa", "tension", "interesting"
  const accentWords = new Set([9, 20, 21, 28, 35])

  return (
    <section
      ref={containerRef}
      className="min-h-[120vh] w-full px-6 md:px-12 relative overflow-hidden select-none flex items-center"
    >
      {/* Giant decorative quote mark */}
      <motion.span
        style={{ y: quoteY, opacity: quoteOpacity }}
        className="absolute -top-20 -left-4 md:left-12 text-[25rem] md:text-[38rem] font-display italic text-ink leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </motion.span>

      <div className="grid grid-cols-12 gap-4 w-full relative z-10 max-w-7xl mx-auto">
        {/* Left label column */}
        <div className="hidden md:flex md:col-span-3 lg:col-span-4 items-start justify-end pr-12 pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-end gap-6 sticky top-1/3"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] text-ink-faded uppercase">MANIFESTO</span>
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: 'top' }}
              className="w-px h-40 bg-ink-faded/30"
            />
            <span className="text-[8px] font-mono tracking-[0.2em] text-ink-faded uppercase writing-vertical hidden lg:block"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              SCROLL TO READ
            </span>
          </motion.div>
        </div>

        {/* Main text column — large scroll-linked words */}
        <div className="col-span-12 md:col-span-9 lg:col-span-8 py-24 md:py-32">
          <p className="font-display italic font-light text-[clamp(1.8rem,4vw,3.8rem)] leading-[1.3] text-ink select-text">
            {words.map((word, i) => {
              const start = i / words.length
              const end = (i + 1) / words.length
              return (
                <React.Fragment key={i}>
                  {/* Line breaks for rhythm */}
                  {(i === 11 || i === 17 || i === 24) && <br className="hidden md:block" />}
                  <ScrollWord
                    word={
                      accentWords.has(i)
                        ? <span className="text-[#C8392B]">{word}</span>
                        : word
                    }
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                </React.Fragment>
              )
            })}
          </p>

          {/* Metadata footer */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.75, 0.95], [0, 1]) }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] font-mono tracking-widest text-ink uppercase pt-12 gap-3 border-t border-ink-faded/15 mt-16"
          >
            <span>ADDIS ABABA, ETHIOPIA</span>
            <span className="hidden sm:inline text-ink-faded">&middot;</span>
            <span>AVAILABLE WORLDWIDE</span>
            <span className="hidden sm:inline text-ink-faded">&middot;</span>
            <motion.span 
              className="font-semibold text-[#C8392B]"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {VISITOR_DATA.availability}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
