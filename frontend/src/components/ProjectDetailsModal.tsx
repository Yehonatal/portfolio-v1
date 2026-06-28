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
  variant?: 'modern' | 'terminal'
  activeProjectIndex: number
  totalProjectsCount: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ProjectDetailsModal({
  activeProject,
  isMobile,
  variant,
  activeProjectIndex,
  totalProjectsCount,
  onClose,
  onPrev,
  onNext,
}: ProjectDetailsModalProps) {
  const [loadLive, setLoadLive] = useState(variant === 'terminal' && !!activeProject?.liveLink)
  const [showWarning, setShowWarning] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setLoadLive(variant === 'terminal' && !!activeProject?.liveLink)
    setActiveImageIndex(0)
    setShowWarning(true)
  }, [activeProject?.id, variant])

  useEffect(() => {
    if (variant !== 'terminal' || !activeProject) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (e.key === 'Escape') {
        onClose()
      } else if (key === 'p' || e.key === 'ArrowLeft') {
        onPrev()
      } else if (key === 'n' || e.key === 'ArrowRight') {
        onNext()
      } else if (key === 'l' && activeProject.liveLink) {
        window.open(activeProject.liveLink, '_blank')
      } else if (key === 's' && activeProject.repoLink) {
        window.open(activeProject.repoLink, '_blank')
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [variant, activeProject, onClose, onPrev, onNext])

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
        <motion.div className="fixed inset-0 z-[140]">
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
        </motion.div>
      </AnimatePresence>
    )
  }

  if (variant === 'terminal') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 font-mono select-none"
        >
          {/* Laser scan line overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_97%,rgba(16,185,129,0.02))] z-10" />
          
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#050506] w-full max-w-[90vw] xl:max-w-7xl h-[88vh] max-h-[850px] rounded-lg border border-emerald-500/50 flex flex-col relative shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden"
          >
            {/* Terminal Top Window Title Bar */}
            <div className="h-10 bg-[#0f0f12] border-b border-emerald-500/20 flex items-center justify-between px-4 shrink-0 select-none text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div className="h-4 w-px bg-zinc-800 mx-1.5" />
                <span className="text-emerald-400 font-bold">kitty: server_host — diagnose_node://{activeProject.id}.spec</span>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-[10px] font-bold"
              >
                [ESC] CLOSE_SESSION
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden p-4 gap-4 text-emerald-400 text-xs">
              {/* Left Column - Screenshots and logs */}
              <div className="flex-[3] flex flex-col gap-4 overflow-hidden">
                {/* Simulated Monitor Box */}
                <div className="flex-1 border border-dashed border-emerald-500/30 rounded p-3 flex flex-col bg-[#070708] relative overflow-hidden">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pb-2 border-b border-zinc-900 mb-2 flex justify-between select-none">
                    <span>[ MONITOR DISPLAY ]</span>
                    {activeProject.images && activeProject.images.length > 1 && (
                      <span>SCREEN {activeImageIndex + 1} OF {activeProject.images.length}</span>
                    )}
                  </div>
                  
                  {/* Image/Iframe container */}
                  <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black/40 rounded border border-zinc-900">
                    {loadLive && activeProject.liveLink ? (
                      <div className="w-full h-full flex flex-col">
                        <div className="h-8 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between px-3 select-none">
                          <span className="text-[10px] text-zinc-500 truncate max-w-[60%] font-mono">
                            curl --head {activeProject.liveLink}
                          </span>
                          <button onClick={() => setLoadLive(false)} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] hover:text-white">
                            Slides
                          </button>
                        </div>
                        <iframe
                          key={iframeKey}
                          src={activeProject.liveLink}
                          title={activeProject.title}
                          className="w-full h-full border-0 bg-white"
                          sandbox="allow-scripts allow-same-origin allow-popups"
                        />
                      </div>
                    ) : (
                      <>
                        <img
                          src={activeProject.images?.[activeImageIndex]}
                          alt={activeProject.title}
                          className="max-w-full max-h-full object-contain rounded brightness-90 hover:brightness-100 transition-all"
                        />
                        {activeProject.images && activeProject.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => prevImage(e, activeProject.images.length)}
                              className="absolute left-2 p-1 bg-zinc-900/80 border border-zinc-800 rounded text-emerald-400 hover:text-white"
                            >
                              &lt;
                            </button>
                            <button
                              onClick={(e) => nextImage(e, activeProject.images.length)}
                              className="absolute right-2 p-1 bg-zinc-900/80 border border-zinc-800 rounded text-emerald-400 hover:text-white"
                            >
                              &gt;
                            </button>
                          </>
                        )}
                        {activeProject.liveLink && (
                          <button
                            onClick={() => setLoadLive(true)}
                            className="absolute bottom-3 px-3 py-1.5 bg-emerald-500 text-black text-[9px] font-bold uppercase tracking-wider rounded border border-emerald-400 hover:bg-emerald-400 transition-colors"
                          >
                            Interact Live
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Vite Compiler Logs Simulation Box */}
                <div className="h-32 border border-dashed border-emerald-500/30 rounded p-3 bg-[#070708] flex flex-col text-[10px] select-text">
                  <div className="text-zinc-500 uppercase tracking-widest font-bold pb-1.5 border-b border-zinc-900 mb-1.5">
                    [ SERVER ENGINE LOGS ]
                  </div>
                  <div className="flex-1 overflow-auto text-zinc-400 space-y-0.5 pr-1 font-mono">
                    <p className="text-zinc-500">[SYSTEM] Node {activeProject.id} integrity scan OK</p>
                    <p className="text-emerald-500">➜ Local: http://localhost:3000/node/{activeProject.id}</p>
                    <p className="text-zinc-500">➜ Network: use --host to expose connection</p>
                    <p className="text-zinc-500">➜ lint: ESLint audit passed with 0 errors, 0 warnings</p>
                    <p className="text-yellow-500">➜ coverage: 98.4% coverage (24 test modules verified)</p>
                    <p className="text-zinc-500">➜ build: client bundle output size 148kB gzip</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Spec Details */}
              <div className="flex-[2] flex flex-col gap-4 overflow-y-auto">
                {/* Identification Section */}
                <div className="border border-dashed border-emerald-500/30 rounded p-4 bg-[#070708] flex flex-col gap-2.5">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pb-1.5 border-b border-zinc-900">
                    [ MAN PAGE: INDEX ]
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white tracking-tight">{activeProject.title}</h3>
                    <div className="flex gap-4 text-[10px] text-zinc-500">
                      <span>CAT: {activeProject.category}</span>
                      <span>DATE: {activeProject.date.split('-')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="text-[11px] text-zinc-300 leading-relaxed space-y-2 select-text">
                    <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-wider">// SYNOPSIS</span>
                    <p className="bg-zinc-950/40 p-2.5 border border-zinc-900 rounded whitespace-pre-wrap">
                      {activeProject.description}
                    </p>
                  </div>
                </div>

                {/* Integration Matrix (Dependencies Tree) */}
                <div className="border border-dashed border-emerald-500/30 rounded p-4 bg-[#070708] flex flex-col gap-2.5">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pb-1.5 border-b border-zinc-900">
                    [ ECOSYSTEM INTEGRITY ]
                  </div>
                  <div className="text-[10px] text-zinc-400 select-text font-mono space-y-0.5 pl-1">
                    <p className="text-zinc-600">dependencies:</p>
                    {activeProject.techUsed.map((tech, idx) => {
                      const isLast = idx === activeProject.techUsed.length - 1
                      return (
                        <p key={tech} className="flex gap-2">
                          <span className="text-zinc-600">{isLast ? '└──' : '├──'}</span>
                          <span className="text-emerald-400 font-bold">{tech.toLowerCase()}</span>
                          <span className="text-zinc-600">@latest</span>
                        </p>
                      )
                    })}
                  </div>
                </div>

                {/* Operations / Shortcuts Panel */}
                <div className="border border-dashed border-emerald-500/30 rounded p-4 bg-[#070708] flex flex-col gap-3">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pb-1.5 border-b border-zinc-900">
                    [ OPERATIONS & SHORTCUTS ]
                  </div>
                  <div className="flex flex-col gap-2">
                    {activeProject.liveLink && (
                      <a
                        href={activeProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 border border-emerald-500/40 rounded hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-center transition-all font-bold text-xs"
                      >
                        [ L ] DEPLOYMENT URL &rarr;
                      </a>
                    )}
                    {activeProject.repoLink && (
                      <a
                        href={activeProject.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 border border-zinc-800 rounded hover:border-emerald-500/80 hover:text-emerald-300 text-center transition-all text-zinc-400 text-xs"
                      >
                        [ S ] SOURCE REPOSITORY &rarr;
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={onPrev}
                      className="py-1.5 border border-zinc-800 rounded hover:border-zinc-700 hover:text-white transition-colors cursor-pointer text-center text-[10px]"
                    >
                      [ P ] PREVIOUS
                    </button>
                    <button
                      onClick={onNext}
                      className="py-1.5 border border-zinc-800 rounded hover:border-zinc-700 hover:text-white transition-colors cursor-pointer text-center text-[10px]"
                    >
                      [ N ] NEXT NODE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini status bar */}
            <div className="h-6 bg-[#0f0f12] border-t border-emerald-500/20 text-[9px] text-zinc-500 px-4 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <span className="text-emerald-500 font-bold">STATUS: INSPECTING</span>
                <span>NODE_INDEX: {activeProjectIndex + 1}/{totalProjectsCount}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>BUFFER: UTF-8</span>
                <span>KEYBOARD: ARROWS/P/N/L/S/ESC</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
