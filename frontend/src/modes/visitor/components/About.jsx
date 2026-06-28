import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { VISITOR_DATA } from '../data/visitorData'
import { useCountUp } from '../hooks/useCountUp'

// ─── Large stat with dramatic reveal ───
function BigStat({ value, label, suffix = '', delay = 0, color = 'var(--ink)' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="space-y-2"
    >
      <span 
        className="block font-display italic font-light text-[clamp(3rem,7vw,5.5rem)] leading-none tabular-nums"
        style={{ color }}
      >
        {value}{suffix}
      </span>
      <span className="block text-[8px] font-mono tracking-[0.2em] text-ink-faded uppercase font-bold">
        {label}
      </span>
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })
  const { count, ref: countRef } = useCountUp(VISITOR_DATA.linesOfCode, 3000)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.5"]
  })
  const headerX = useTransform(scrollYProgress, [0, 1], [-60, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  const tools = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Tailwind', 'Figma']

  return (
    <section ref={containerRef} className="py-24 md:py-32 w-full px-6 md:p-12 relative overflow-hidden select-none">
      {/* Section Header — cinematic slide-in */}
      <motion.div
        style={{ x: headerX, opacity: headerOpacity }}
        className="w-full mb-16 md:mb-20"
      >
        <div className="flex items-end gap-6 border-b border-ink-faded/15 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-ink-faded uppercase">
            ABOUT
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="flex-1 h-px bg-ink-faded/10"
          />
          <span className="text-[10px] font-mono tracking-widest text-ink-faded uppercase">
            THE PERSON
          </span>
        </div>
      </motion.div>

      {/* Stats row — dramatic large numbers */}
      <div ref={countRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-28">
        <BigStat value={count.toLocaleString()} label="LINES WRITTEN" delay={0} />
        <BigStat value="4" suffix="+" label="YEARS CODING" delay={0.1} color="#C8392B" />
        <BigStat value="12" suffix="+" label="PROJECTS SHIPPED" delay={0.2} />
        <BigStat value="∞" label="CURIOSITY" delay={0.3} color="#C8392B" />
      </div>

      {/* Story + tools */}
      <div className="grid grid-cols-12 gap-8 md:gap-16 w-full max-w-6xl">
        {/* Bio text — personal, unique content */}
        <div className="col-span-12 md:col-span-7 space-y-8">
          {[
            "Started writing code as a way to automate tedious things. Stayed because building software turned out to be the closest thing to architecture that doesn't require a hard hat.",
            "Most days you'll find me somewhere between a database migration and a design system refactor — figuring out how to make machines feel less mechanical and interfaces feel more human.",
            "Outside of code: reading about linguistics, tinkering with NLP for Ethiopic scripts, and occasionally convincing myself that this side project will be the one I actually finish."
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.15 }}
              className={`font-body text-base md:text-lg font-light leading-[1.9] select-text ${
                i === 2 ? 'text-ink opacity-60' : 'text-ink opacity-85'
              }`}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Tools + aesthetic element */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-[9px] font-mono tracking-[0.25em] text-ink-faded uppercase block mb-6 font-bold">DAILY TOOLS</span>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
                  className="group flex items-center gap-3 py-2 border-b border-ink-faded/10"
                >
                  <motion.div
                    whileHover={{ scaleX: 3, backgroundColor: '#C8392B' }}
                    transition={{ duration: 0.3 }}
                    className="w-2 h-px bg-ink-faded/30"
                  />
                  <span className="text-[10px] font-mono text-ink opacity-60 tracking-wider uppercase group-hover:opacity-100 group-hover:text-[#C8392B] transition-all duration-300">
                    {tool}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.04 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="hidden md:block mt-12 text-right"
          >
            <span className="font-display italic text-[8rem] leading-none text-ink select-none">
              YA
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
