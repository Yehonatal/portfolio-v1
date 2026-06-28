import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, ChevronLeft, ChevronRight, Globe, Cpu, Calendar, RotateCw, ExternalLink, ArrowUpRight
} from 'lucide-react'
import { Github } from 'lucide-react'
import type { Project } from '@/types/types'

type ProjectDetailsModalProps = {
  activeProject: Project | null
  isMobile: boolean
  activeProjectIndex: number
  totalProjectsCount: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ProjectDetailsModal({
  activeProject,
  isMobile,
  activeProjectIndex,
  totalProjectsCount,
  onClose,
  onPrev,
  onNext,
}: ProjectDetailsModalProps) {
  const [loadLive, setLoadLive] = useState(false)
  const [showWarning, setShowWarning] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setLoadLive(false)
    setActiveImageIndex(0)
    setShowWarning(true)
  }, [activeProject?.id])

  if (!activeProject) return null

  const prevImage = (e: React.MouseEvent, imagesCount: number) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount)
  }

  const nextImage = (e: React.MouseEvent, imagesCount: number) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev + 1) % imagesCount)
  }

  if (isMobile) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[140]">
          {/* Dim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Bottom Sheet Drawer - Flat & Borderless */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-x-0 bottom-0 z-[150] h-[85vh] bg-[var(--color-card)] rounded-t-3xl flex flex-col overflow-hidden"
          >
            {/* Drag indicator handle */}
            <div className="w-full flex justify-center py-3 shrink-0">
              <div className="w-12 h-1 bg-[var(--color-secondary)] rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 z-20 p-2 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>

            {/* Scrolling Sheet Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-6">
              {/* Slider screenshots or interactive browser frame */}
              {activeProject.images && activeProject.images.length > 0 && (
                <div className="relative w-full aspect-[16/10] bg-[var(--color-secondary)] rounded-xl overflow-hidden flex items-center justify-center mt-2">
                  {loadLive && activeProject.liveLink ? (
                    <div className="relative w-full h-full bg-white flex flex-col">
                      {/* Top browser bar */}
                      <div className="h-8 bg-[var(--color-secondary)] flex items-center justify-between px-3 shrink-0">
                        <span className="text-[7.5px] font-mono text-[var(--color-muted-foreground)] truncate max-w-[50%]">
                          {activeProject.liveLink}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="p-0.5 text-[var(--color-foreground)]">
                            <ExternalLink size={10} />
                          </a>
                          <button onClick={() => setIframeKey(prev => prev + 1)} className="p-0.5 text-[var(--color-foreground)]">
                            <RotateCw size={10} />
                          </button>
                          <button onClick={() => setLoadLive(false)} className="px-1.5 py-0.5 bg-[var(--color-card)] rounded text-[6.5px] font-bold uppercase">
                            Slides
                          </button>
                        </div>
                      </div>
                      <div className="relative flex-1 bg-white">
                        {showWarning && (
                          <div className="absolute bottom-2 right-2 left-2 z-10 p-2 bg-amber-500 text-[8.5px] text-white flex justify-between items-center rounded-lg">
                            <span>Embedding blocked? Try opening directly.</span>
                            <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="underline font-bold">Open</a>
                          </div>
                        )}
                        <iframe 
                          key={iframeKey}
                          src={activeProject.liveLink}
                          title={activeProject.title}
                          className="w-full h-full border-0 bg-white"
                          sandbox="allow-scripts allow-same-origin allow-popups"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full p-2 flex items-center justify-center">
                      <img 
                        src={activeProject.images[activeImageIndex]} 
                        alt={`${activeProject.title} screenshot`} 
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded" 
                      />
                      {activeProject.images.length > 1 && (
                        <>
                          <button onClick={(e) => prevImage(e, activeProject.images.length)} className="absolute left-2 p-1.5 rounded-full bg-[var(--color-card)]/80 text-[var(--color-foreground)]">
                            <ChevronLeft size={13} />
                          </button>
                          <button onClick={(e) => nextImage(e, activeProject.images.length)} className="absolute right-2 p-1.5 rounded-full bg-[var(--color-card)]/80 text-[var(--color-foreground)]">
                            <ChevronRight size={13} />
                          </button>
                        </>
                      )}
                      {activeProject.liveLink && (
                        <button
                          onClick={() => setLoadLive(true)}
                          className="absolute bottom-3 px-3 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[8px] font-bold uppercase tracking-wider flex items-center gap-1"
                        >
                          <Globe size={10} />
                          Interact Live
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Project controls/cycling - Flat */}
              <div className="flex justify-between items-center pb-1">
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Project {activeProjectIndex + 1} of {totalProjectsCount}
                </span>
                <div className="flex gap-1.5">
                  <button onClick={onPrev} className="p-1.5 bg-[var(--color-secondary)] rounded text-[var(--color-foreground)] active:scale-95 transition-transform">
                    <ChevronLeft size={13} />
                  </button>
                  <button onClick={onNext} className="p-1.5 bg-[var(--color-secondary)] rounded text-[var(--color-foreground)] active:scale-95 transition-transform">
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>

              {/* Meta tag details - Flat Pills */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/80 px-2.5 py-1 rounded-md">
                  <Cpu size={10} />
                  {activeProject.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/80 px-2.5 py-1 rounded-md">
                  <Calendar size={10} />
                  {activeProject.date.split('-')[0]}
                </span>
              </div>

              {/* Details metadata */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-[var(--color-foreground)] font-display">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-[var(--color-muted-foreground)]">
                  {activeProject.description}
                </p>
              </div>

              {/* Tech stack tags - Flat Badges */}
              <div className="space-y-1.5">
                <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Engineered With
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeProject.techUsed.map(t => (
                    <span key={t} className="text-[8px] font-mono font-semibold uppercase text-[var(--color-foreground)] bg-[var(--color-secondary)] px-2.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Actions source/live links - Flat */}
              <div className="flex gap-2.5 pt-2">
                {activeProject.liveLink && (
                  <a
                    href={activeProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-1.5 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[10px] font-bold uppercase tracking-wider"
                  >
                    Live Link
                    <Globe size={11} />
                  </a>
                )}
                {activeProject.repoLink && (
                  <a
                    href={activeProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-1.5 py-3 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] text-[10px] font-bold uppercase tracking-wider"
                  >
                    Source Code
                    <Github size={11} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }

  // Desktop Modal Overlay - Completely Flat & Borderless Editorial View
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-[var(--color-background)]/90 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.96, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[var(--color-card)] w-full max-w-[96vw] xl:max-w-[95vw] rounded-2xl overflow-hidden flex flex-col md:flex-row md:h-[88vh] md:max-h-[900px] relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] transition-colors cursor-pointer focus:outline-none"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Image Slider Section or Interactive Iframe - Borderless design */}
          {activeProject.images && activeProject.images.length > 0 && (
            <div className="relative w-full md:w-[66%] aspect-[16/10] md:aspect-auto md:h-full bg-[var(--color-secondary)]/50 overflow-hidden shrink-0 select-none flex items-center justify-center">
              {loadLive && activeProject.liveLink ? (
                <div className="relative w-[95%] max-w-full aspect-[16/10] max-h-[80vh] rounded-xl overflow-hidden bg-white flex flex-col shrink-0">
                  {/* Browser Window Chrome Topbar */}
                  <div className="h-10 bg-[var(--color-secondary)] flex items-center justify-between px-4 select-none shrink-0">
                    <div className="flex items-center gap-1.5 w-16">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80" />
                    </div>

                    {/* Address Bar */}
                    <div className="flex-1 max-w-[50%] bg-[var(--color-card)] px-3 py-1 rounded text-[9px] text-[var(--color-muted-foreground)] font-mono flex items-center justify-between gap-1 select-all truncate">
                      <span className="truncate">
                        <span className="opacity-40">https://</span>
                        {activeProject.liveLink.replace(/^https?:\/\//, '')}
                      </span>
                      <button
                        onClick={() => setIframeKey(prev => prev + 1)}
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors cursor-pointer focus:outline-none shrink-0"
                        title="Reload interactive window"
                      >
                        <RotateCw size={10} />
                      </button>
                    </div>

                    {/* Control buttons */}
                    <div className="flex items-center gap-1.5">
                      <a
                        href={activeProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-2.5 py-1.5 rounded hover:opacity-90 transition-opacity"
                        title="Open site fullscreen"
                      >
                        <span>Fullscreen</span>
                        <ArrowUpRight size={10} />
                      </a>
                      <button
                        onClick={() => setLoadLive(false)}
                        className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--color-foreground)] bg-[var(--color-card)] rounded hover:bg-[var(--color-secondary)] transition-colors cursor-pointer"
                      >
                        Screenshots
                      </button>
                    </div>
                  </div>

                  {/* Content Area containing Iframe */}
                  <div className="relative flex-1 bg-white">
                    {showWarning && (
                      <div className="absolute bottom-3 right-3 z-10 max-w-[280px] md:max-w-sm p-2.5 rounded-lg bg-amber-500 text-[10px] text-white flex items-center justify-between gap-2">
                        <span className="leading-tight">If page is blank, embedding is blocked by security headers.</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={activeProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-bold hover:text-amber-200 transition-colors"
                          >
                            Open Direct
                          </a>
                          <button
                            onClick={() => setShowWarning(false)}
                            className="text-white hover:text-amber-200 cursor-pointer focus:outline-none shrink-0"
                            title="Dismiss"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      </div>
                    )}

                    <iframe
                      key={iframeKey}
                      src={activeProject.liveLink}
                      title={activeProject.title}
                      className="w-full h-full border-0 bg-white"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full p-4 md:p-6 flex items-center justify-center">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    src={activeProject.images[activeImageIndex]}
                    alt={`${activeProject.title} preview`}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                  />

                  {/* Left/Right Slider Controls */}
                  {activeProject.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => prevImage(e, activeProject.images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--color-card)]/85 text-[var(--color-foreground)] hover:bg-[var(--color-secondary)] transition-colors cursor-pointer z-10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => nextImage(e, activeProject.images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--color-card)]/85 text-[var(--color-foreground)] hover:bg-[var(--color-secondary)] transition-colors cursor-pointer z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Dots indicator list */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full z-10">
                        {activeProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                              idx === activeImageIndex ? 'bg-white w-3' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Load Live Interactive site overlay */}
                  {activeProject.liveLink && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                      <button
                        onClick={() => setLoadLive(true)}
                        className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Interact Live Site
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Info Detail Section */}
          <div className="w-full md:w-[34%] p-6 md:p-8 overflow-y-auto flex flex-col justify-between md:h-full gap-6">
            <div className="space-y-6">
              {/* Project index header and Prev/Next navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]/15 pr-12">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Project {activeProjectIndex + 1} of {totalProjectsCount}
                </span>
                <div className="flex items-center gap-1.5 z-20">
                  <button
                    onClick={onPrev}
                    className="p-1 rounded bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                    title="Previous Project"
                  >
                    <ChevronLeft size={12} />
                  </button>
                  <button
                    onClick={onNext}
                    className="p-1 rounded bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                    title="Next Project"
                  >
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Meta details row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/85 px-2.5 py-1 rounded-md">
                  <Cpu className="w-3 h-3 text-[var(--color-muted-foreground)]" />
                  {activeProject.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/85 px-2.5 py-1 rounded-md">
                  <Calendar className="w-3 h-3 text-[var(--color-muted-foreground)]" />
                  {activeProject.date.split('-')[0]}
                </span>
              </div>

              {/* Title & description */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-[var(--color-foreground)] leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-[var(--color-muted-foreground)] font-light">
                  {activeProject.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="space-y-2">
                <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Engineered With
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techUsed?.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono font-semibold uppercase tracking-[0.05em] text-[var(--color-foreground)] bg-[var(--color-secondary)] px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Row - Flat Fills */}
            <div className="flex flex-wrap gap-3 pt-3 border-t border-[var(--color-border)]/15 shrink-0">
              {activeProject.liveLink && (
                <a
                  href={activeProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.08em] transition-all"
                >
                  Live Preview
                  <Globe className="w-3.5 h-3.5" />
                </a>
              )}
              {activeProject.repoLink && (
                <a
                  href={activeProject.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:opacity-80 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.08em] transition-all"
                >
                  Source Code
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
