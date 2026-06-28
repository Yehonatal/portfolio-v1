import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'

const steps = [
  { 
    id: "01", phase: "DISSECT", label: "Problem", 
    verb: "Listen. Read. Decode.",
    detail: "Before writing a single line, I sit with the problem until I can explain it to someone who doesn't code. I map the system topology, trace data flows, and find the pressure points that will crack under scale.",
    artifact: "architecture diagrams, constraint maps",
    color: "#C8392B", icon: "⌁",
    bgPattern: "radial-gradient(circle at 20% 50%, rgba(200,57,43,0.06) 0%, transparent 50%)"
  },
  { 
    id: "02", phase: "SHATTER", label: "Break It", 
    verb: "Question everything.",
    detail: "I intentionally stress assumptions. What if this endpoint gets 10,000 concurrent requests? What if the user has 5ms of patience? Breaking things on purpose reveals the real requirements hiding behind the spec.",
    artifact: "stress-test logs, failure analysis",
    color: "#E85D40", icon: "◉",
    bgPattern: "radial-gradient(circle at 80% 30%, rgba(232,93,64,0.06) 0%, transparent 50%)"
  },
  { 
    id: "03", phase: "PROTOTYPE", label: "Build the Wrong Thing", 
    verb: "Move fast. Learn faster.",
    detail: "The first version is always wrong — and that's the point. Rapid prototypes in throwaway branches prove out the hardest technical risks first. I build to discover what I don't know.",
    artifact: "spike branches, technical RFCs",
    color: "#F59E0B", icon: "△",
    bgPattern: "radial-gradient(circle at 50% 80%, rgba(245,158,11,0.06) 0%, transparent 50%)"
  },
  { 
    id: "04", phase: "ENGINEER", label: "Build the Right Thing", 
    verb: "Precision meets craft.",
    detail: "Armed with prototype learnings, I write production-grade code — proper TypeScript types, comprehensive error handling, and obsessive attention to the developer experience of every API surface.",
    artifact: "typed modules, test suites, CI/CD",
    color: "#10B981", icon: "◆",
    bgPattern: "radial-gradient(circle at 70% 40%, rgba(16,185,129,0.06) 0%, transparent 50%)"
  },
  { 
    id: "05", phase: "SHIP", label: "Ship It Anyway", 
    verb: "Done beats perfect.",
    detail: "I deploy incrementally with feature flags, monitor real-user metrics, and iterate based on production data — not hypothetical scenarios. The best feedback comes from real users.",
    artifact: "deployment manifests, monitoring",
    color: "#6366F1", icon: "▸",
    bgPattern: "radial-gradient(circle at 30% 60%, rgba(99,102,241,0.06) 0%, transparent 50%)"
  },
]

// ─── Single step card with scroll-triggered reveal ───
function StepBlock({ step, idx, activeId, setActiveId }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const isActive = activeId === step.id

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
      onClick={() => setActiveId(isActive ? null : step.id)}
      className="relative cursor-pointer group"
      style={{ background: isActive ? step.bgPattern : 'none' }}
    >
      {/* Colored left border that grows on hover/active */}
      <motion.div
        animate={{ 
          height: isActive ? '100%' : '0%',
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-[3px] rounded-full"
        style={{ backgroundColor: step.color }}
      />

      <div className="py-8 md:py-12 pl-8 md:pl-14 pr-4 md:pr-8 border-b border-ink-faded/10">
        {/* Top row: icon + phase + number */}
        <div className="flex items-center gap-4 mb-3">
          <motion.span
            animate={{ 
              color: isActive ? step.color : 'var(--ink)',
              scale: isActive ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-light select-none"
          >
            {step.icon}
          </motion.span>
          <motion.span
            animate={{ 
              backgroundColor: isActive ? step.color : 'transparent',
              color: isActive ? '#F2EFE8' : step.color,
            }}
            transition={{ duration: 0.3 }}
            className="text-[9px] font-mono px-2.5 py-1 rounded-sm uppercase tracking-[0.2em] font-bold border"
            style={{ borderColor: step.color }}
          >
            {step.phase}
          </motion.span>
          <span className="text-[9px] font-mono text-ink-faded tracking-widest">{step.id}/05</span>
          <div className="flex-1" />
          <motion.span
            animate={{ rotate: isActive ? 45 : 0, color: isActive ? step.color : 'var(--ink-faded)' }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            +
          </motion.span>
        </div>

        {/* Title */}
        <motion.h3
          animate={{ x: isActive ? 8 : 0 }}
          transition={{ duration: 0.3 }}
          className="font-display italic font-light text-[clamp(1.5rem,3.5vw,2.5rem)] text-ink leading-tight mb-1"
        >
          {step.label}
        </motion.h3>

        {/* Verb */}
        <p className="font-mono text-[10px] tracking-widest text-ink-faded uppercase mb-2">
          {step.verb}
        </p>

        {/* Expandable content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 max-w-2xl">
                <p className="text-sm md:text-base font-light leading-[1.8] text-ink opacity-80 select-text mb-4">
                  {step.detail}
                </p>
                <div className="flex items-center gap-3 text-[8px] font-mono text-ink-faded uppercase tracking-widest">
                  <span style={{ color: step.color }}>●</span>
                  <span>{step.artifact}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Scroll-linked progress visualization ───
function ScrollProgress({ containerRef, activeId }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const activeStep = steps.find(s => s.id === activeId)
  const activeColor = activeStep?.color || 'var(--ink-faded)'
  
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="sticky top-1/4 flex flex-col items-center gap-6">
      {/* Vertical progress bar */}
      <div className="relative w-px h-48 bg-ink-faded/10 overflow-hidden rounded-full">
        <motion.div
          style={{ height: progressHeight }}
          className="absolute top-0 left-0 w-full rounded-full transition-colors duration-500"
          animate={{ backgroundColor: activeColor }}
        />
      </div>

      {/* Step dots */}
      <div className="flex flex-col gap-4 items-center">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            animate={{
              scale: activeId === step.id ? 1.5 : 1,
              backgroundColor: activeId === step.id ? step.color : 'var(--ink)',
              opacity: activeId === step.id ? 1 : 0.15,
            }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>

      {/* Active label */}
      <AnimatePresence mode="wait">
        {activeStep && (
          <motion.span
            key={activeStep.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-[7px] font-mono tracking-[0.2em] uppercase text-center"
            style={{ color: activeStep.color }}
          >
            {activeStep.phase}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Quote */}
      <div className="border-t border-ink-faded/15 pt-4 max-w-[140px] mt-4">
        <p className="text-[8px] font-mono text-ink-faded leading-relaxed text-center italic">
          "most of the best work happens in the 'wrong thing' phase."
        </p>
      </div>
    </div>
  )
}

export default function Process() {
  const containerRef = useRef(null)
  const [activeId, setActiveId] = useState("01")
  const sectionInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

  // Header scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.5"]
  })
  const headerX = useTransform(scrollYProgress, [0, 1], [-60, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section ref={containerRef} className="py-24 md:py-32 w-full px-6 md:p-12 relative overflow-hidden select-none">
      {/* Section Header — matching WorkArchive style */}
      <motion.div
        style={{ x: headerX, opacity: headerOpacity }}
        className="w-full mb-12 md:mb-20"
      >
        <div className="flex items-end gap-6 border-b border-ink-faded/15 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-ink-faded uppercase">
            THE METHODOLOGY
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
            HOW I WORK
          </span>
        </div>
      </motion.div>

      {/* Intro statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-3xl mb-16 md:mb-20"
      >
        <p className="font-display italic font-light text-[clamp(1.2rem,2.2vw,1.8rem)] leading-[1.5] text-ink opacity-85">
          Every project follows the same arc — from chaos to clarity. I don't believe in linear processes. I believe in{' '}
          <span className="text-[#C8392B]">controlled collisions</span> between ideas.
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-8 md:gap-16 w-full max-w-6xl mx-auto">
        {/* Steps */}
        <div className="col-span-12 lg:col-span-9">
          {steps.map((step, idx) => (
            <StepBlock
              key={step.id}
              step={step}
              idx={idx}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </div>

        {/* Sticky side progress */}
        <div className="col-span-3 hidden lg:flex justify-center">
          <ScrollProgress containerRef={containerRef} activeId={activeId} />
        </div>
      </div>

      {/* Mobile quote */}
      <div className="w-full text-center pt-16 lg:hidden">
        <p className="font-display italic font-light text-[clamp(1rem,2vw,1.5rem)] text-ink-faded">
          &ldquo;most of the best work happens in the &lsquo;wrong thing&rsquo; phase.&rdquo;
        </p>
      </div>
    </section>
  )
}
