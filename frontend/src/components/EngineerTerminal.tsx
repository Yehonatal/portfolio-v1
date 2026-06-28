import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, File, Folder, FolderOpen, Play, CheckCircle, RefreshCw, Moon, Sun, ArrowLeft, ArrowUpRight } from 'lucide-react'
import projectsData from '../data/projects.json'

type CommandLog = {
  command: string
  output: React.ReactNode
}

type EngineerTerminalProps = {
  onBackToPersona: () => void
  onInspectProject?: (projectId: string) => void
}

const TerminalFileViewer = ({ text, filename }: { text: string; filename: string }) => {
  const lines = text.split('\n')
  
  return (
    <div className="flex flex-col h-full text-xs font-mono text-emerald-400/90 select-text">
      {/* Simulation Command Prompt */}
      <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-3 mb-4 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-bold">&gt;</span>
          <span>cat {filename}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LINES: {lines.length}</span>
          <span>SIZE: {new Blob([text]).size} B</span>
        </div>
      </div>

      {/* Body with simulated CRT glow and scan lines */}
      <div className="flex-1 overflow-auto space-y-0.5 pr-2 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={filename}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.02 }
              }
            }}
            className="space-y-0.5"
          >
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -5 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex gap-4 hover:bg-zinc-900/30 px-2 py-0.5 rounded transition-colors group"
              >
                <span className="w-8 text-zinc-700 text-right select-none text-[10px] group-hover:text-emerald-500/40">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {line}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const fileContents: Record<string, string> = {
  'about_bio.md': `# Yonatan Afewerk - Software Engineer

I specialize in crafting high-performance, responsive web applications with clean architecture. Currently working full-time at Swenetix Tech PLC (formerly Addis Software PLC) since Mar 2026, building enterprise systems, MERN stack products, and custom Odoo modules.

## Bio details
- **Location:** Addis Ababa, Ethiopia
- **Current Role:** Full Time Software Engineer @ Swenetix Tech PLC
- **Focus:** Fullstack Systems, Web Architectures & Odoo Module Design
- **Style:** Clean, monospaced, highly efficient solutions.`,

  'projects.json': JSON.stringify(projectsData.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    techUsed: p.techUsed,
    description: p.description
  })), null, 2),

  'tech_capabilities.sh': `#!/bin/bash
echo "Loading skill directory..."
echo "--------------------------"
echo "LANGUAGES:  Python | JavaScript | TypeScript | SQL"
echo "FRONTEND:   React | Next.js | HTML | CSS | Tailwind CSS | Redux | Redux Toolkit | Redux-Saga"
echo "BACKEND:    Node.js | Express.js | RESTful APIs | WebSockets | JWT Authentication"
echo "DATABASES:  MongoDB | PostgreSQL | MySQL | Supabase | Drizzle ORM"
echo "DEV_TOOLS:  Git | GitHub | Docker | Postman | CI/CD (GitHub Actions)"
echo "--------------------------"
echo "Status: ALL MODULES READY"`,

  'publications.txt': `MEDIUM JOURNAL ENTRIES:
--------------------------------------------------------------------------------
1. What’s the “thing” holding me back?
   URL: https://medium.com/@yonatanafewerk/whats-the-thing-holding-me-back-a0b5ed338576
   DESC: A reflection on breaking free from the traps of mediocrity and aiming for greatness.

2. I still think about you.
   URL: https://medium.com/@yonatanafewerk/i-still-think-about-you-39b65cb94b0d
   DESC: An exploration of memory, emotional resonance, and dealing with distress.

3. Pure bliss hidden in Music.
   URL: https://medium.com/@yonatanafewerk/pure-bliss-hidden-in-music-ca37e2ec34c3
   DESC: Exploring how music intertwines with our deepest memories and emotional experiences.

4. Is it too late?
   URL: https://medium.com/@yonatanafewerk/is-it-too-late-962fcc1ff6ba
   DESC: Finding the strength to publish ideas, grow daily, and conquer self-doubt.`,

  'contact_info.env': `PORTFOLIO_OWNER="Yonatan Afewerk"
EMAIL="yonatanafewerk@gmail.com"
GITHUB="https://github.com/Yehonatal"
LINKEDIN="https://www.linkedin.com/in/yonatan-afewerk/"
TELEGRAM="https://t.me/yonatanafewerk"
AVAILABILITY="PART_TIME_FREELANCE_OR_CONTRACT"
STATUS="READY_TO_DEPLOY"`
}

const EngineerTerminal = ({ onBackToPersona, onInspectProject }: EngineerTerminalProps) => {
  const [activeFile, setActiveFile] = useState<string>('about_bio.md')
  const [terminalInput, setTerminalInput] = useState<string>('')
  const [terminalLogs, setTerminalLogs] = useState<CommandLog[]>([
    { command: 'systemctl start yonatan-shell', output: 'Starting Yonatan Shell Engine v1.1.0...' },
    { command: 'check-status', output: 'Status: Connected. System integrity 100%. Ready for inspection.' }
  ])
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'src': true,
    'data': true
  })

  const [selectedCodexProject, setSelectedCodexProject] = useState<string>(projectsData[0]?.id || '')
  const [diagnosticRunning, setDiagnosticRunning] = useState<boolean>(false)

  const runCodexDiagnostic = (projectId: string) => {
    if (diagnosticRunning) return
    setDiagnosticRunning(true)
    setTerminalLogs(prev => [
      ...prev,
      { command: `diagnose --project ${projectId}`, output: `Initializing Codex integrity scan for [${projectId}]...` }
    ])
    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        { command: '', output: `[SUCCESS] Codex scan complete for ${projectId}. Code coverage: 98.4%. Dependencies verified. Zero critical issues found.` }
      ])
      setDiagnosticRunning(false)
      if (onInspectProject) {
        onInspectProject(projectId)
      }
    }, 1200)
  }

  const logsEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of terminal when logs update
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs])

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase()
    let out: React.ReactNode = ''

    if (trimmed === 'clear') {
      setTerminalLogs([])
      return
    }

    if (trimmed === 'help') {
      out = (
        <div className="space-y-1 text-emerald-400/90 font-mono text-left">
          <p>Available commands:</p>
          <p>  <span className="font-bold text-white">ls</span> : list files in directory</p>
          <p>  <span className="font-bold text-white">cat [file_name]</span> : output file contents (e.g. cat projects.json)</p>
          <p>  <span className="font-bold text-white">clear</span> : clear screen logs</p>
          <p>  <span className="font-bold text-white">skills</span> : run capabilities check script</p>
          <p>  <span className="font-bold text-white">contact</span> : load contact env file</p>
          <p>  <span className="font-bold text-white">switch</span> : reset profile options screen</p>
        </div>
      )
    } else if (trimmed === 'ls') {
      out = (
        <div className="flex gap-4 font-mono text-blue-400 text-left">
          <span>about_bio.md</span>
          <span>projects.json</span>
          <span>tech_capabilities.sh</span>
          <span>publications.txt</span>
          <span>contact_info.env</span>
        </div>
      )
    } else if (trimmed.startsWith('cat ')) {
      const filename = trimmed.substring(4).trim()
      const matchingKey = Object.keys(fileContents).find(k => k.toLowerCase() === filename)
      if (matchingKey) {
        setActiveFile(matchingKey)
        out = <pre className="whitespace-pre-wrap font-mono text-zinc-100 text-left">{fileContents[matchingKey]}</pre>
      } else {
        out = <span className="text-red-400 text-left">Error: file '{filename}' not found. Type 'ls' to see files.</span>
      }
    } else if (trimmed === 'skills') {
      setActiveFile('tech_capabilities.sh')
      out = <pre className="whitespace-pre-wrap font-mono text-yellow-400 text-left">{fileContents['tech_capabilities.sh']}</pre>
    } else if (trimmed === 'contact') {
      setActiveFile('contact_info.env')
      out = <pre className="whitespace-pre-wrap font-mono text-cyan-400 text-left">{fileContents['contact_info.env']}</pre>
    } else if (trimmed === 'switch') {
      onBackToPersona()
      return
    } else if (trimmed === '') {
      out = ''
    } else {
      out = <span className="text-red-400 text-left">Command '{cmdStr}' not recognized. Type 'help' for command directory.</span>
    }

    setTerminalLogs(prev => [...prev, { command: cmdStr, output: out }])
  }

  const handleFileClick = (filename: string) => {
    setActiveFile(filename)
    executeCommand(`cat ${filename}`)
  }

  const handleFolderClick = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(terminalInput)
    setTerminalInput('')
  }

  return (
    <div className="w-full h-full font-mono text-sm flex flex-col bg-zinc-950 text-emerald-400 relative select-none">
      {/* Laser scan line overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_97%,rgba(16,185,129,0.02))] z-30" />

      {/* Editor Title Bar */}
      <div className="h-11 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 text-xs text-zinc-400 shrink-0 select-none">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBackToPersona}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>SWITCH_PORT</span>
          </button>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-500" />
            <span className="font-bold text-zinc-300">IDE_CODEX_SESSION v1.1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-[50vh]">
        {/* VSCODE File tree sidebar */}
        <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col p-4 text-zinc-400 select-none text-xs">
          <div className="flex items-center justify-between text-zinc-500 uppercase tracking-wider text-[10px] font-bold pb-3 border-b border-zinc-900 mb-3">
            <span>Explorer</span>
            <span>SRC</span>
          </div>

          <div className="space-y-1">
            {/* Root workspace */}
            <div className="flex items-center gap-1.5 text-zinc-300 font-bold py-1">
              <FolderOpen size={13} className="text-blue-400" />
              <span>yonatan-dev</span>
            </div>

            {/* Subfolders & files */}
            <div className="pl-3 space-y-1">
              <div 
                onClick={() => handleFolderClick('src')}
                className="flex items-center gap-1.5 hover:text-zinc-200 cursor-pointer py-0.5"
              >
                {openFolders['src'] ? <FolderOpen size={13} className="text-yellow-500" /> : <Folder size={13} className="text-yellow-500" />}
                <span className="font-semibold text-zinc-400">components</span>
              </div>
              
              {openFolders['src'] && (
                <div className="pl-4 space-y-1 border-l border-zinc-900 ml-1.5">
                  <div 
                    onClick={() => handleFileClick('tech_capabilities.sh')}
                    className={`flex items-center gap-1.5 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'tech_capabilities.sh' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <File size={11} className="text-zinc-500" />
                    <span>tech_capabilities.sh</span>
                  </div>
                </div>
              )}

              <div 
                onClick={() => handleFolderClick('data')}
                className="flex items-center gap-1.5 hover:text-zinc-200 cursor-pointer py-0.5"
              >
                {openFolders['data'] ? <FolderOpen size={13} className="text-yellow-500" /> : <Folder size={13} className="text-yellow-500" />}
                <span className="font-semibold text-zinc-400">data</span>
              </div>

              {openFolders['data'] && (
                <div className="pl-4 space-y-1 border-l border-zinc-900 ml-1.5">
                  <div 
                    onClick={() => handleFileClick('projects.json')}
                    className={`flex items-center gap-1.5 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'projects.json' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <File size={11} className="text-zinc-500" />
                    <span>projects.json</span>
                  </div>
                  <div 
                    onClick={() => handleFileClick('publications.txt')}
                    className={`flex items-center gap-1.5 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'publications.txt' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <File size={11} className="text-zinc-500" />
                    <span>publications.txt</span>
                  </div>
                </div>
              )}

              {/* Top-level files */}
              <div 
                onClick={() => handleFileClick('about_bio.md')}
                className={`flex items-center gap-1.5 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'about_bio.md' ? 'text-emerald-400 font-bold' : ''}`}
              >
                <File size={11} className="text-zinc-500" />
                <span>about_bio.md</span>
              </div>

              <div 
                onClick={() => handleFileClick('contact_info.env')}
                className={`flex items-center gap-1.5 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'contact_info.env' ? 'text-emerald-400 font-bold' : ''}`}
              >
                <File size={11} className="text-zinc-500" />
                <span>contact_info.env</span>
              </div>
            </div>
          </div>
        </div>

        {/* EDITOR TEXT VIEW */}
        <div className="flex-1 flex flex-col bg-zinc-950 overflow-auto border-r border-zinc-900">
          {/* Active File Tab Indicator */}
          <div className="h-8 bg-zinc-900/60 border-b border-zinc-900 flex items-center px-4 gap-2 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500/80"></span>
            <span className="text-[10px] text-zinc-400 font-bold tracking-wider">{activeFile}</span>
          </div>

          <div className="p-6 text-zinc-300 font-mono text-xs overflow-auto flex-1 select-text">
            {activeFile !== 'projects.json' ? (
              <TerminalFileViewer text={fileContents[activeFile] || ''} filename={activeFile} />
            ) : (
              <div className="h-full flex flex-col md:flex-row gap-6 p-2 text-zinc-300 font-mono">
                {/* Visualizer sidebar for projects list */}
                <div className="w-full md:w-56 border-r border-zinc-900 pr-4 flex flex-col gap-2 shrink-0 overflow-y-auto">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">// Codex Node Directory</span>
                  {projectsData.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedCodexProject(p.id)}
                      className={`text-left text-xs px-3 py-2 border transition-all cursor-pointer flex items-center justify-between group ${
                        selectedCodexProject === p.id
                          ? 'bg-emerald-500/10 border-emerald-500/55 text-emerald-400 font-bold'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30'
                      }`}
                    >
                      <span className="truncate text-[11px]">{p.title}</span>
                      <span className="text-[8px] text-zinc-500 group-hover:text-emerald-400">
                        {selectedCodexProject === p.id ? '[ACTIVE]' : 'select()'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected project details visualization */}
                {(() => {
                  const proj = projectsData.find(p => p.id === selectedCodexProject) || projectsData[0]
                  if (!proj) return <div className="text-zinc-500">No project selected.</div>
                  return (
                    <div className="flex-1 flex flex-col justify-between gap-6 overflow-y-auto pr-2">
                      <div className="space-y-6">
                        {/* Title header bar */}
                        <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 relative overflow-hidden flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="absolute top-0 right-0 text-[35px] font-black text-emerald-500/5 pointer-events-none uppercase">
                            CODEX_{proj.id}
                          </div>
                          <div>
                            <span className="block text-[8px] text-emerald-400/70 uppercase tracking-widest font-bold">Node ID: {proj.id} // Category: {proj.category}</span>
                            <h2 className="text-xl font-bold text-white tracking-tight">{proj.title}</h2>
                          </div>
                          
                          <button
                            onClick={() => runCodexDiagnostic(proj.id)}
                            disabled={diagnosticRunning}
                            className={`px-4 py-1.5 border border-emerald-500 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                              diagnosticRunning ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <Play size={10} className={diagnosticRunning ? 'animate-pulse' : ''} />
                            <span>{diagnosticRunning ? 'Scanning...' : 'Run Diagnostics'}</span>
                          </button>
                        </div>

                        {/* Description section */}
                        <div className="space-y-2">
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">// System Abstract</span>
                          <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-4 border border-zinc-900 whitespace-pre-wrap">
                            {proj.description}
                          </p>
                        </div>

                        {/* Tech matrix tags */}
                        <div className="space-y-3">
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">// Integrated Ecosystem</span>
                          <div className="flex flex-wrap gap-2">
                            {proj.techUsed.map((t) => (
                              <span key={t} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-emerald-400/90 text-[10px] uppercase font-bold tracking-wider">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Diagnostics & Stats info graph */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="border border-zinc-900 bg-zinc-950 p-4 space-y-2">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">// Repository Reference</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-zinc-400 truncate">{proj.repoLink}</span>
                              <a 
                                href={proj.repoLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-emerald-400 hover:text-white shrink-0"
                              >
                                <ArrowUpRight size={13} />
                              </a>
                            </div>
                          </div>

                          <div className="border border-zinc-900 bg-zinc-950 p-4 space-y-2">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">// Live Session Link</span>
                            <div className="flex items-center gap-2">
                              {proj.liveLink ? (
                                <>
                                  <span className="text-xs text-zinc-400 truncate">{proj.liveLink}</span>
                                  <a 
                                    href={proj.liveLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-emerald-400 hover:text-white shrink-0"
                                  >
                                    <ArrowUpRight size={13} />
                                  </a>
                                </>
                              ) : (
                                <span className="text-xs text-zinc-600 italic">No live deployment configured</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer diagnostic logs placeholder inside visualizer */}
                      <div className="border-t border-dashed border-zinc-900 pt-4 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                        <span>CODEX_HOST_PORT: 3000</span>
                        <span>DOCKER_CONTAINER_STATUS: ACTIVE</span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </div>

        {/* INTERACTIVE CODING TERMINAL (Right split) */}
        <div className="w-1/3 bg-black flex flex-col overflow-auto p-4 border-l border-zinc-900 font-mono text-[11px]">
          <div className="flex items-center justify-between text-zinc-600 text-[10px] font-bold border-b border-zinc-900 pb-2 mb-2 select-none">
            <span>Terminal Shell</span>
            <span>bash</span>
          </div>

          <div className="flex-grow space-y-4 overflow-y-auto mb-4 select-text">
            {terminalLogs.map((log, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-start gap-1 text-zinc-400">
                  <span className="text-emerald-500/80">yonatan-dev:~$</span>
                  <span className="text-white font-bold">{log.command}</span>
                </div>
                {log.output && (
                  <div className="pl-3 text-zinc-300 whitespace-pre-wrap border-l border-zinc-800 mb-1 leading-relaxed">
                    {log.output}
                  </div>
                )}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Prompt input field */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 border-t border-zinc-900 pt-3">
            <span className="text-emerald-500 select-none">yonatan-dev:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-grow bg-transparent text-white font-mono focus:outline-none border-0 p-0 text-[11px]"
              placeholder="type 'help' for commands..."
              autoFocus
            />
          </form>
        </div>
      </div>
      
      {/* Bottom Status bar */}
      <div className="h-6 bg-zinc-900 border-t border-zinc-800 text-[10px] text-zinc-400 px-4 flex items-center justify-between shrink-0 select-none font-sans font-semibold">
        <div className="flex items-center gap-4">
          <span className="bg-emerald-500 text-black px-1.5 font-bold uppercase tracking-wider rounded-sm text-[8px]">bash</span>
          <span className="text-zinc-500 tracking-wider">ln 1, col 1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            branch: main
          </span>
        </div>
      </div>
    </div>
  )
}

export default EngineerTerminal
