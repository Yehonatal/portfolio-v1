import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'framer-motion'
import projectsData from '../../../data/projects.json'

// Parse and sort selected projects
const selectedProjects = projectsData
  .filter(p => p.selected)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(p => ({
    id: p.id,
    name: p.title,
    year: p.date ? p.date.split('-')[0] : '2026',
    role: p.role || 'Software Engineering',
    description: p.description,
    stack: p.techUsed || [],
    liveUrl: p.liveLink || '',
    codeUrl: p.repoLink || '',
    imagePath: p.images && p.images.length > 0 ? p.images[0] : '',
    images: p.images || []
  }))

// ─── Cinematic project row ───
const ProjectRow = React.memo(({ project, idx, expandedId, setExpandedId, setHoveredProject, setActiveProject }) => {
  const isExpanded = expandedId === project.id
  const [isHovered, setIsHovered] = useState(false)
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const rowRef = useRef(null)
  const isInView = useInView(rowRef, { once: true, margin: "-5% 0px" })

  const handleRowClick = () => {
    const nextId = isExpanded ? null : project.id
    setExpandedId(nextId)
    setActiveProject(nextId ? project : null)
  }

  // Auto-cycle images when expanded
  useEffect(() => {
    if (!isExpanded || !project.images || project.images.length <= 1) return
    const interval = setInterval(() => {
      setActiveImageIdx(prev => (prev + 1) % project.images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isExpanded, project.images])

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: expandedId ? (isExpanded ? 1 : 0.2) : 1,
        y: 0
      } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
      className="relative w-full group"
      onMouseEnter={() => { setIsHovered(true); setHoveredProject(project) }}
      onMouseLeave={() => { setIsHovered(false); setHoveredProject(null) }}
    >
      {/* Hover glow strip */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8392B]"
      />

      {/* Main Row */}
      <div
        onClick={handleRowClick}
        className="flex flex-wrap items-baseline justify-between py-6 md:py-8 px-4 md:px-10 cursor-pointer select-none gap-4 border-b border-ink-faded/15"
      >
        {/* Left: Index + Name */}
        <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-[200px]">
          <motion.span
            animate={{ color: isHovered ? '#C8392B' : 'var(--ink-faded)' }}
            className="text-[10px] font-mono tracking-widest"
          >
            {String(idx + 1).padStart(2, '0')}
          </motion.span>
          <motion.span
            animate={{ 
              x: isHovered ? 12 : 0,
              letterSpacing: isHovered ? '0.02em' : '-0.01em',
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic font-light tracking-tight text-[clamp(1.6rem,4vw,2.8rem)] text-ink leading-none"
          >
            {project.name}
          </motion.span>
        </div>

        {/* Right: Role + Year + Arrow */}
        <div className="flex items-center gap-8 md:gap-12 font-mono text-[9px] tracking-widest uppercase text-ink-faded">
          <span className="hidden md:inline">{project.role}</span>
          <span>{project.year}</span>
          <motion.span
            animate={{ 
              x: isHovered ? 8 : 0, 
              rotate: isExpanded ? 90 : 0,
              color: isHovered ? '#C8392B' : 'var(--ink)',
            }}
            transition={{ duration: 0.25 }}
            className="text-sm"
          >
            →
          </motion.span>
        </div>
      </div>

      {/* ─── Expanded Cinematic Panel ─── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-10 pb-12 pt-6">
              {/* Full-width hero image */}
              <div className="w-full relative overflow-hidden rounded-lg mb-8 bg-[var(--paper-dark)]/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={project.images[activeImageIdx] || project.imagePath}
                    src={project.images[activeImageIdx] || project.imagePath}
                    alt={`${project.name} screenshot ${activeImageIdx + 1}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-auto max-h-[50vh] object-contain mx-auto block"
                  />
                </AnimatePresence>

                {/* Image counter */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setActiveImageIdx(i) }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === activeImageIdx ? 'bg-white w-4' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-12 gap-6 md:gap-12">
                {/* Description */}
                <div className="col-span-12 md:col-span-7 space-y-6">
                  <p className="text-sm md:text-base font-light leading-[1.8] text-ink opacity-85 max-w-2xl select-text">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex gap-8 text-[10px] font-mono font-bold tracking-widest uppercase">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ink hover:text-[#C8392B] transition-colors group/link"
                        data-cursor="link"
                      >
                        <motion.span className="inline-block group-hover/link:translate-x-1 transition-transform">→</motion.span>
                        LIVE SITE
                      </a>
                    )}
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ink hover:text-[#C8392B] transition-colors group/link"
                        data-cursor="link"
                      >
                        <motion.span className="inline-block group-hover/link:translate-x-1 transition-transform">→</motion.span>
                        SOURCE
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="col-span-12 md:col-span-5 space-y-4">
                  <h4 className="text-[9px] font-mono tracking-[0.25em] text-ink-faded uppercase font-bold">STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, tIdx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tIdx * 0.05 }}
                        className="text-[9px] font-mono px-3 py-1.5 rounded-sm bg-[var(--ink)]/[0.04] text-ink border border-ink-faded/15 uppercase tracking-wider font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

ProjectRow.displayName = 'ProjectRow'

// ─── Main Work Archive ───
const WorkArchive = React.memo(() => {
  const [expandedId, setExpandedId] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const sectionRef = useRef(null)

  const bgProject = hoveredProject || activeProject

  // Floating preview card
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX + 30)
      mouseY.set(e.clientY + 30)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Section scroll progress for the header animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.5"]
  })
  const headerX = useTransform(scrollYProgress, [0, 1], [-60, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 w-full px-6 md:p-12 relative overflow-visible select-none">
      {/* Full-viewport background image on hover/select */}
      <AnimatePresence>
        {bgProject && bgProject.imagePath && (
          <motion.div
            key={bgProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 pointer-events-none z-0"
          >
            <img
              src={bgProject.imagePath}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'blur(3px) saturate(0.2)', opacity: 0.1 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(to bottom, var(--paper) 0%, transparent 20%, transparent 80%, var(--paper) 100%),
                  linear-gradient(to right, var(--paper) 0%, transparent 25%, transparent 75%, var(--paper) 100%)
                `
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section header with scroll-linked slide-in */}
      <motion.div 
        style={{ x: headerX, opacity: headerOpacity }}
        className="w-full mb-16 relative z-10"
      >
        <div className="flex items-end gap-6 border-b border-ink-faded/15 pb-4">
          <span className="text-[10px] font-mono tracking-widest text-ink-faded uppercase">
            SELECTED WORK
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
            2024&ndash;2026
          </span>
        </div>
      </motion.div>

      {/* Project rows */}
      <div className="flex flex-col w-full relative z-10">
        {selectedProjects.map((proj, idx) => (
          <ProjectRow
            key={proj.id}
            project={proj}
            idx={idx}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            setHoveredProject={setHoveredProject}
            setActiveProject={setActiveProject}
          />
        ))}
      </div>

      {/* Floating preview card */}
      <AnimatePresence>
        {hoveredProject && !expandedId && (
          <motion.div
            style={{ position: 'fixed', left: springX, top: springY, pointerEvents: 'none', zIndex: 80 }}
            initial={{ opacity: 0, scale: 0.7, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 3 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-72 h-44 rounded-lg overflow-hidden shadow-2xl border border-[var(--ink)]/10 backdrop-blur-md hidden md:block"
          >
            <img
              src={hoveredProject.imagePath}
              alt={hoveredProject.name}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(0.6) brightness(0.85) contrast(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
              <span className="text-[10px] font-mono text-white tracking-widest uppercase font-bold">{hoveredProject.name}</span>
              <span className="text-[8px] font-mono text-white/60 tracking-wider uppercase">{hoveredProject.year}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
})

WorkArchive.displayName = 'WorkArchive'
export default WorkArchive
