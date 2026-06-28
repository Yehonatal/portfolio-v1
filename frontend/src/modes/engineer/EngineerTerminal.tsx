import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Play, ArrowLeft, ArrowUpRight } from 'lucide-react'
import projectsData from '../../data/projects.json'

type CommandLog = {
  command: string
  output: React.ReactNode
}

type EngineerTerminalProps = {
  onBackToPersona: () => void
  onInspectProject?: (projectId: string) => void
}

const FedoraLogo = () => {
  return (
    <div className="font-mono text-[9px] leading-[1.05] text-left text-sky-400 select-none my-1 flex flex-col items-center">
      <pre>
        {`  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣦⡀⠒⢶⣄⠀⠀⠀⠀⠀⠀⠀
⠀⢰⣶⣷⣶⣶⣤⣄⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⡆⠀⠀⠀⠀⠀⠀
⠀⢿⣿⣿⣿⣿⡟⢁⣄⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀
⠀⠘⣿⣿⣿⣿⣧⡈⠻⢷⣦⣄⡉⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠻⣿⣿⣿⣿⣶⣄⡈⠙⠻⢷⣶⣤⣄⣈⡉⠛⠛⠛⠃⢠⣀⣀⡀⠀⠀⠀
⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣶⣦⣤⣍⣉⠙⠛⠛⠛⠿⠃⢸⣿⣿⣿⣷⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣿⣿⣿⣿⣧⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠻⠏⠀⠉⠻⢿⣿⣿⣿⣿⠿⠋⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
      </pre>
    </div>
  )
}

const ClaudeWelcomeDashboard = ({
  onOpenFile,
}: {
  onOpenFile: (filename: string) => void
}) => {
  return (
    <div className="flex flex-col gap-5 text-xs font-mono select-none h-full overflow-y-auto pr-2">
      {/* Simulation Command Prompt */}
      <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-2.5 mb-2 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-bold">&gt;</span>
          <span>bash welcome_banner.sh</span>
        </div>
        <div className="flex items-center gap-4">
          <span>HOST: localhost</span>
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left Side Welcome Box */}
        <div className="lg:col-span-2 border border-dashed border-[#3c6eb4]/40 rounded p-4 flex flex-col justify-between items-center bg-[#070708]/30 min-h-[250px] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[40px] font-black text-[#3c6eb4]/5 pointer-events-none uppercase tracking-widest font-sans">
            FEDORA
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-[#3c6eb4] font-bold tracking-widest uppercase">
              YONATAN DEV
            </span>
            <h2 className="text-sm font-bold text-zinc-200">
              Welcome, Explorer!
            </h2>
          </div>

          <FedoraLogo />

          <div className="text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-400">Fedora OS • Ready</p>
            <p className="font-mono text-zinc-600">
              /home/yonatan/portfolio-v1
            </p>
          </div>
        </div>

        {/* Right Side Stack */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Top Activity Box */}
          <div className="border border-dashed border-zinc-800 rounded p-4 bg-[#070708]/30 flex flex-col justify-between flex-1">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pb-2 border-b border-zinc-900 mb-2">
              Recent activity
            </div>
            <div className="space-y-2 text-zinc-400">
              <div
                className="flex justify-between items-center hover:text-white transition-colors cursor-pointer"
                onClick={() => onOpenFile('about_bio.md')}
              >
                <span>Updated biography memory node</span>
                <span className="text-[10px] text-zinc-600 font-bold">
                  1m ago
                </span>
              </div>
              <div
                className="flex justify-between items-center hover:text-white transition-colors cursor-pointer"
                onClick={() => onOpenFile('projects.json')}
              >
                <span>Refactored project list dataset</span>
                <span className="text-[10px] text-zinc-600 font-bold">
                  15m ago
                </span>
              </div>
              <div
                className="flex justify-between items-center hover:text-white transition-colors cursor-pointer"
                onClick={() => onOpenFile('tech_capabilities.sh')}
              >
                <span>Verified technical skill set matrices</span>
                <span className="text-[10px] text-zinc-600 font-bold">
                  3h ago
                </span>
              </div>
              <div
                className="flex justify-between items-center hover:text-white transition-colors cursor-pointer"
                onClick={() => onOpenFile('contact_info.env')}
              >
                <span>Configured API environment tokens</span>
                <span className="text-[10px] text-zinc-600 font-bold">
                  1d ago
                </span>
              </div>
              <div
                className="flex justify-between items-center hover:text-white transition-colors cursor-pointer"
                onClick={() => onOpenFile('publications.txt')}
              >
                <span>Imported latest publication links</span>
                <span className="text-[10px] text-zinc-600 font-bold">
                  1w ago
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Shortcuts Box */}
          <div className="border border-dashed border-zinc-800 rounded p-4 bg-[#070708]/30 flex flex-col justify-between">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pb-2 border-b border-zinc-900 mb-2">
              Interactive Commands
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-zinc-400 text-[10px]">
              <div>
                <span className="text-[#3c6eb4] font-bold">ls</span>
                <span className="text-zinc-600"> - list files</span>
              </div>
              <div>
                <span className="text-[#3c6eb4] font-bold">skills</span>
                <span className="text-zinc-600"> - capability list</span>
              </div>
              <div>
                <span className="text-[#3c6eb4] font-bold">cat [file]</span>
                <span className="text-zinc-600"> - read code</span>
              </div>
              <div>
                <span className="text-[#3c6eb4] font-bold">contact</span>
                <span className="text-zinc-600"> - env variables</span>
              </div>
              <div>
                <span className="text-[#3c6eb4] font-bold">clear</span>
                <span className="text-zinc-600"> - clear logs</span>
              </div>
              <div>
                <span className="text-[#3c6eb4] font-bold">switch</span>
                <span className="text-zinc-600"> - switch portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DiagnosticScanOverlay = ({
  projectId,
  onComplete,
  onCancel,
}: {
  projectId: string
  onComplete: (id: string) => void
  onCancel: () => void
}) => {
  const [logs, setLogs] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  // Use a ref for onComplete to prevent interval resetting if the callback changes reference
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setLogs([])
    setProgress(0)

    const steps = [
      `$ audit --packages /home/yonatan/portfolio-v1`,
      `[INFO] Checking package.json for vulnerabilities...`,
      `[SUCCESS] 0 vulnerabilities found in 42 dependencies.`,
      `$ tsc --noEmit --project tsconfig.json`,
      `[INFO] Validating TypeScript compiler flags...`,
      `[SUCCESS] Typechecking passed. Zero compile-time errors.`,
      `$ eslint --ext .js,.ts,.tsx src/`,
      `[INFO] Linting source directory...`,
      `[SUCCESS] ESLint verification passed. Clean structure.`,
      `$ vitest run --coverage`,
      `[SUCCESS] 24/24 unit tests passed. Code coverage: 98.4%.`,
      `$ build-diagnostic --target ${projectId}`,
      `[INFO] Packaging node build integrity check...`,
      `[SUCCESS] INTEGRITY SCAN COMPLETE. LAUNCHING VIEWPORT...`,
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs((prev) => [...prev, steps[currentStep]])
        setProgress(Math.round(((currentStep + 1) / steps.length) * 100))
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          onCompleteRef.current(projectId)
        }, 300)
      }
    }, 180)

    return () => clearInterval(interval)
  }, [projectId])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-[250] select-none font-mono"
    >
      <div className="bg-[#050506] w-full max-w-2xl h-[400px] rounded-lg border border-emerald-500/50 flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="h-9 bg-[#0f0f12] border-b border-emerald-500/20 flex items-center justify-between px-3 shrink-0 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">
              kitty: runner — diagnose_node://{projectId}.spec
            </span>
          </div>
          <button
            onClick={onCancel}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            [ESC] CANCEL
          </button>
        </div>

        {/* Logs terminal body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-[11px] text-left text-zinc-300">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={
                log?.startsWith('$')
                  ? 'text-white font-bold'
                  : log?.includes('SUCCESS')
                    ? 'text-emerald-400'
                    : log?.includes('INFO')
                      ? 'text-zinc-500'
                      : 'text-zinc-300'
              }
            >
              {log}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="border-t border-emerald-500/20 p-3 bg-[#0a0a0c]">
          <div className="flex justify-between items-center text-[9px] text-zinc-500 mb-1 font-bold">
            <span>DIAGNOSTIC PROCESS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-zinc-900/60 h-2 rounded overflow-hidden border border-zinc-800">
            <motion.div
              className="bg-emerald-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TerminalFileViewer = ({
  text,
  filename,
}: {
  text: string
  filename: string
}) => {
  const lines = text.split('\n')

  return (
    <div className="flex flex-col h-full text-xs font-mono text-emerald-400/90 select-text">
      {/* Simulation Command Prompt */}
      <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-2.5 mb-3 select-none shrink-0">
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
                transition: { staggerChildren: 0.015 },
              },
            }}
            className="space-y-0.5"
          >
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -5 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex gap-4 hover:bg-zinc-900/30 px-2 py-0.5 rounded transition-colors group"
              >
                <span className="w-8 text-zinc-700 text-right select-none text-[10px] group-hover:text-emerald-500/40 font-bold">
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
  'dashboard.sh': `#!/bin/bash
# Welcome banner initialization script
bash welcome_banner.sh`,

  'about_bio.md': `# Yonatan Afewerk - Software Engineer

I specialize in crafting high-performance, responsive web applications with clean architecture. Currently working full-time at Swenetix Tech PLC (formerly Addis Software PLC) since Mar 2026, building enterprise systems, MERN stack products, and custom Odoo modules.

## Bio details
- **Location:** Addis Ababa, Ethiopia
- **Current Role:** Full Time Software Engineer @ Swenetix Tech PLC
- **Focus:** Fullstack Systems, Web Architectures & Odoo Module Design
- **Style:** Clean, monospaced, highly efficient solutions.`,

  'projects.json': JSON.stringify(
    projectsData.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      techUsed: p.techUsed,
      description: p.description,
    })),
    null,
    2,
  ),

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
STATUS="READY_TO_DEPLOY"`,
}

const EngineerTerminal = ({
  onBackToPersona,
  onInspectProject,
}: EngineerTerminalProps) => {
  const [activeFile, setActiveFile] = useState<string>('dashboard.sh')
  const [terminalInput, setTerminalInput] = useState<string>('')
  const [terminalLogs, setTerminalLogs] = useState<CommandLog[]>([
    {
      command: 'systemctl start yonatan-shell',
      output: 'Starting Yonatan Shell Engine ...',
    },
    {
      command: 'check-status',
      output:
        'Status: Connected. System integrity 100%. Ready for inspection. Type "help" for a list of command flags.',
    },
  ])
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    src: true,
    data: true,
  })

  const [selectedCodexProject, setSelectedCodexProject] = useState<string>(
    projectsData[0]?.id || '',
  )
  const [diagnosticRunning, setDiagnosticRunning] = useState<boolean>(false)
  const [showScannerProject, setShowScannerProject] = useState<string | null>(
    null,
  )

  const runCodexDiagnostic = useCallback((projectId: string) => {
    if (diagnosticRunning) return
    setDiagnosticRunning(true)
    setShowScannerProject(projectId)
  }, [diagnosticRunning])

  const handleScannerComplete = useCallback((projectId: string) => {
    setDiagnosticRunning(false)
    setShowScannerProject(null)
    setTerminalLogs((prev) => [
      ...prev,
      {
        command: `diagnose --project ${projectId}`,
        output: `[SUCCESS] Codex scan complete for ${projectId}. Code coverage: 98.4%. Dependencies verified. Zero critical issues found.`,
      },
    ])
    if (onInspectProject) {
      onInspectProject(projectId)
    }
  }, [onInspectProject])

  const handleScannerCancel = useCallback(() => {
    setDiagnosticRunning(false)
    setShowScannerProject(null)
  }, [])

  const logsEndRef = useRef<HTMLDivElement>(null)

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

    if (trimmed === 'help' || trimmed === '/help') {
      out = (
        <div className="space-y-1 text-emerald-400 font-mono text-left">
          <p className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">
            // CLI COMMAND LIST
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">ls</span> : list available
            repository files
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">cat [file_name]</span> : open
            & display file inside buffer
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">clear</span> : wipe terminal
            scrollback logs
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">skills</span> : review
            developer capability registry
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">contact</span> : retrieve
            contact credentials env file
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">
              diagnose [project_id]
            </span>{' '}
            : scan project node build details
          </p>
          <p>
            {' '}
            <span className="font-bold text-white">switch</span> : exit terminal
            mode and return to portal
          </p>
        </div>
      )
    } else if (trimmed === 'ls' || trimmed === '/ls') {
      out = (
        <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-left">
          <span
            className="text-emerald-400 hover:underline cursor-pointer"
            onClick={() => handleFileClick('dashboard.sh')}
          >
            dashboard.sh*
          </span>
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => handleFileClick('about_bio.md')}
          >
            about_bio.md
          </span>
          <span
            className="text-yellow-400 hover:underline cursor-pointer"
            onClick={() => handleFileClick('projects.json')}
          >
            projects.json
          </span>
          <span
            className="text-emerald-400 hover:underline cursor-pointer"
            onClick={() => handleFileClick('tech_capabilities.sh')}
          >
            tech_capabilities.sh*
          </span>
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => handleFileClick('publications.txt')}
          >
            publications.txt
          </span>
          <span
            className="text-red-400 hover:underline cursor-pointer"
            onClick={() => handleFileClick('contact_info.env')}
          >
            contact_info.env
          </span>
        </div>
      )
    } else if (trimmed.startsWith('cat ')) {
      const filename = trimmed.substring(4).trim()
      const matchingKey = Object.keys(fileContents).find(
        (k) => k.toLowerCase() === filename,
      )
      if (matchingKey) {
        setActiveFile(matchingKey)
        out = (
          <span className="text-emerald-400">
            [SUCCESS] Switched active Neovim buffer to '{matchingKey}'.
          </span>
        )
      } else {
        out = (
          <span className="text-red-400 text-left">
            Error: file '{filename}' not found. Type 'ls' to see files.
          </span>
        )
      }
    } else if (trimmed === 'skills' || trimmed === '/skills') {
      setActiveFile('tech_capabilities.sh')
      out = (
        <span className="text-emerald-400">
          [SUCCESS] Opened technical capabilities tree in active buffer.
        </span>
      )
    } else if (trimmed === 'contact' || trimmed === '/contact') {
      setActiveFile('contact_info.env')
      out = (
        <span className="text-emerald-400">
          [SUCCESS] Opened contact configuration env in active buffer.
        </span>
      )
    } else if (trimmed.startsWith('diagnose ')) {
      const projId = trimmed.substring(9).trim()
      const proj = projectsData.find((p) => p.id.toLowerCase() === projId)
      if (proj) {
        out = (
          <span className="text-emerald-400">
            Triggering diagnostic scan for node {proj.id}...
          </span>
        )
        runCodexDiagnostic(proj.id)
      } else {
        out = (
          <span className="text-red-400">
            Error: Project ID '{projId}' not recognized. Click projects.json for
            options.
          </span>
        )
      }
    } else if (trimmed === 'switch' || trimmed === '/switch') {
      onBackToPersona()
      return
    } else if (trimmed === '') {
      out = ''
    } else {
      out = (
        <span className="text-red-400 text-left">
          Command '{cmdStr}' not recognized. Type 'help' for command directory.
        </span>
      )
    }

    setTerminalLogs((prev) => [...prev, { command: cmdStr, output: out }])
  }

  const handleFileClick = (filename: string) => {
    setActiveFile(filename)
    setTerminalLogs((prev) => [
      ...prev,
      {
        command: `cat ${filename}`,
        output: <span className="text-emerald-500/80">Buffer switched.</span>,
      },
    ])
  }

  const handleFolderClick = (folder: string) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }))
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

      {/* Terminal Title Bar */}
      <div className="h-10 bg-[#0f0f11] border-b border-zinc-900 flex items-center justify-between px-4 text-xs text-zinc-400 shrink-0 select-none">
        <div className="flex items-center gap-5">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          </div>
          <div className="h-4 w-px bg-zinc-900" />
          <button
            onClick={onBackToPersona}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[10px] font-bold text-zinc-400"
          >
            <ArrowLeft size={11} />
            <span>SWITCH_PORTAL</span>
          </button>
        </div>
        <div className="flex items-center gap-2 select-none">
          <Terminal size={12} className="text-emerald-500" />
          <span className="font-bold text-[10px] text-zinc-500 tracking-wider">
            kitty: yonatan@dev-server:~ (main)
          </span>
        </div>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-[50vh]">
        {/* NEOCIM SIDEBAR (NvimTree style) */}
        <div className="w-60 bg-[#070708]/80 border-r border-dashed border-zinc-900 flex flex-col p-3 text-zinc-400 select-none text-[11px] shrink-0">
          <div className="flex items-center justify-between text-zinc-600 uppercase tracking-widest text-[9px] font-bold pb-2 border-b border-zinc-900 mb-2">
            <span>NvimTree [1]</span>
            <span>UTF-8</span>
          </div>

          <div className="space-y-0.5 select-none text-left">
            <div className="flex items-center gap-1.5 text-zinc-300 font-bold py-0.5">
              <span>󰙅 portfolio-v1/</span>
            </div>

            <div className="pl-3 space-y-0.5">
              {/* components folder */}
              <div
                onClick={() => handleFolderClick('src')}
                className="flex items-center gap-1.5 hover:text-zinc-200 cursor-pointer py-0.5"
              >
                <span className="text-zinc-600 font-bold">
                  {openFolders['src'] ? '▼' : '▶'}
                </span>
                <span className="text-zinc-400">📁 components</span>
              </div>

              {openFolders['src'] && (
                <div className="pl-4 border-l border-zinc-900/60 ml-2 space-y-0.5">
                  <div
                    onClick={() => handleFileClick('tech_capabilities.sh')}
                    className={`flex items-center gap-1 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'tech_capabilities.sh' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <span className="text-emerald-500 font-bold">├──</span>
                    <span> tech_capabilities.sh</span>
                  </div>
                </div>
              )}

              {/* data folder */}
              <div
                onClick={() => handleFolderClick('data')}
                className="flex items-center gap-1.5 hover:text-zinc-200 cursor-pointer py-0.5"
              >
                <span className="text-zinc-600 font-bold">
                  {openFolders['data'] ? '▼' : '▶'}
                </span>
                <span className="text-zinc-400">📁 data</span>
              </div>

              {openFolders['data'] && (
                <div className="pl-4 border-l border-zinc-900/60 ml-2 space-y-0.5">
                  <div
                    onClick={() => handleFileClick('projects.json')}
                    className={`flex items-center gap-1 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'projects.json' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <span className="text-emerald-500 font-bold">├──</span>
                    <span> projects.json</span>
                  </div>
                  <div
                    onClick={() => handleFileClick('publications.txt')}
                    className={`flex items-center gap-1 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'publications.txt' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <span className="text-emerald-500 font-bold">└──</span>
                    <span> publications.txt</span>
                  </div>
                </div>
              )}

              {/* Top files */}
              <div
                onClick={() => handleFileClick('dashboard.sh')}
                className={`flex items-center gap-1 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'dashboard.sh' ? 'text-emerald-400 font-bold' : ''}`}
              >
                <span className="text-zinc-600 font-bold">├──</span>
                <span> dashboard.sh</span>
              </div>

              <div
                onClick={() => handleFileClick('about_bio.md')}
                className={`flex items-center gap-1 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'about_bio.md' ? 'text-emerald-400 font-bold' : ''}`}
              >
                <span className="text-zinc-600 font-bold">├──</span>
                <span> about_bio.md</span>
              </div>

              <div
                onClick={() => handleFileClick('contact_info.env')}
                className={`flex items-center gap-1 py-0.5 cursor-pointer hover:text-white transition-colors ${activeFile === 'contact_info.env' ? 'text-emerald-400 font-bold' : ''}`}
              >
                <span className="text-zinc-600 font-bold">└──</span>
                <span> contact_info.env</span>
              </div>
            </div>
          </div>
        </div>

        {/* NEOCIM WORKSPACE / BUFFER (Center panel) */}
        <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden border-r border-dashed border-zinc-900 relative">
          {/* Diagnostic Overlay Scanner inside overlay popup */}
          <AnimatePresence>
            {showScannerProject && (
              <DiagnosticScanOverlay
                projectId={showScannerProject}
                onComplete={handleScannerComplete}
                onCancel={handleScannerCancel}
              />
            )}
          </AnimatePresence>

          {/* Bufferline Tabs */}
          <div className="h-8 bg-[#09090b] border-b border-zinc-900 flex items-center px-2 select-none gap-0.5 overflow-x-auto shrink-0">
            {Object.keys(fileContents).map((file, idx) => {
              const isActive = activeFile === file
              return (
                <button
                  key={file}
                  onClick={() => handleFileClick(file)}
                  className={`h-full px-3 text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border-r border-zinc-900 ${
                    isActive
                      ? 'bg-zinc-900 text-emerald-400 border-b-2 border-emerald-500 font-black'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className="text-zinc-600">{idx + 1}</span>
                  <span>{file}</span>
                </button>
              )
            })}
          </div>

          {/* Content area */}
          <div className="p-5 text-zinc-300 font-mono text-xs overflow-auto flex-1 select-text relative">
            {activeFile === 'dashboard.sh' ? (
              <ClaudeWelcomeDashboard onOpenFile={handleFileClick} />
            ) : activeFile !== 'projects.json' ? (
              <TerminalFileViewer
                text={fileContents[activeFile] || ''}
                filename={activeFile}
              />
            ) : (
              /* Custom btop layout inside projects.json buffer */
              <div className="h-full flex flex-col gap-4 text-zinc-300 font-mono select-none">
                {/* Simulated command banner */}
                <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">&gt;</span>
                    <span>btop --filter node_directory</span>
                  </div>
                  <span>SESSION: 01</span>
                </div>

                <div className="flex-1 grid grid-cols-1 xl:grid-cols-5 gap-4 overflow-hidden">
                  {/* Left Column: Projects tree process table [1] */}
                  <div className="xl:col-span-2 border border-dashed border-zinc-800 rounded p-3 flex flex-col bg-[#070708]/30 overflow-hidden">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block pb-2 border-b border-zinc-900 mb-2">
                      // [1] Node Registry
                    </span>
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-left text-[10.5px]">
                      <div className="grid grid-cols-6 font-bold text-zinc-500 border-b border-zinc-900/60 pb-1 mb-1 select-none">
                        <span className="col-span-3">PROJECT TITLE</span>
                        <span className="col-span-2">CAT</span>
                        <span className="text-right">INTEG</span>
                      </div>
                      {projectsData.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedCodexProject(p.id)}
                          className={`w-full grid grid-cols-6 px-1.5 py-1.5 border transition-all cursor-pointer text-left rounded ${
                            selectedCodexProject === p.id
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                              : 'border-transparent hover:bg-zinc-900/30 text-zinc-400'
                          }`}
                        >
                          <span className="col-span-3 truncate flex items-center gap-1.5">
                            <span
                              className={
                                selectedCodexProject === p.id
                                  ? 'text-emerald-500'
                                  : 'text-zinc-700'
                              }
                            >
                              &gt;
                            </span>
                            {p.title}
                          </span>
                          <span className="col-span-2 truncate text-zinc-500">
                            {p.category.toLowerCase()}
                          </span>
                          <span className="text-right text-[10px] text-emerald-400 font-bold">
                            98.4%
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Specifications Detail View */}
                  {(() => {
                    const proj =
                      projectsData.find((p) => p.id === selectedCodexProject) ||
                      projectsData[0]
                    if (!proj)
                      return (
                        <div className="xl:col-span-3 text-zinc-600">
                          No project selected.
                        </div>
                      )

                    return (
                      <div className="xl:col-span-3 flex flex-col gap-4 overflow-y-auto pr-1">
                        {/* Box [2] Project abstract details */}
                        <div className="border border-dashed border-zinc-800 rounded p-4 bg-[#070708]/30 flex flex-col gap-3">
                          <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">
                              // [2] SPECIFICATION MATRIX
                            </span>
                            <button
                              onClick={() => runCodexDiagnostic(proj.id)}
                              disabled={diagnosticRunning}
                              className={`px-3 py-1 bg-[#3c6eb4] text-white border border-[#3c6eb4]/60 text-[9px] font-bold uppercase tracking-wider hover:bg-[#3c6eb4]/80 transition-colors cursor-pointer flex items-center gap-1 rounded ${
                                diagnosticRunning
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }`}
                            >
                              <Play size={8} className="fill-current" />
                              <span>
                                {diagnosticRunning
                                  ? 'Scanning...'
                                  : 'Run Diagnostics'}
                              </span>
                            </button>
                          </div>

                          <div className="space-y-1.5 text-left">
                            <span className="block text-[8px] text-zinc-600 uppercase font-bold tracking-wider">
                              Node ID / Title
                            </span>
                            <div className="text-xs text-white font-bold">
                              {proj.id.toUpperCase()} : {proj.title}
                            </div>
                          </div>

                          <div className="space-y-1.5 text-left">
                            <span className="block text-[8px] text-zinc-600 uppercase font-bold tracking-wider">
                              Synopsis
                            </span>
                            <p className="text-[11px] text-zinc-400 leading-relaxed bg-zinc-950/40 p-2.5 border border-zinc-900/60 rounded select-text whitespace-pre-wrap">
                              {proj.description}
                            </p>
                          </div>
                        </div>

                        {/* Box [3] Integrated ecosystem */}
                        <div className="border border-dashed border-zinc-800 rounded p-4 bg-[#070708]/30 flex flex-col gap-2.5 text-left">
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block pb-1 border-b border-zinc-900">
                            // [3] INTEGRATION GRAPH
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.techUsed.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 bg-zinc-900 border border-zinc-800/80 text-emerald-400/90 text-[10px] uppercase font-bold tracking-wider rounded-sm"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Grid row: refs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-dashed border-zinc-800 rounded p-3 bg-[#070708]/30 text-left">
                            <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest block mb-1">
                              git repository
                            </span>
                            <div className="flex items-center gap-1.5 select-text text-[10.5px]">
                              <span className="text-zinc-400 truncate">
                                {proj.repoLink}
                              </span>
                              <a
                                href={proj.repoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 hover:text-white shrink-0"
                              >
                                <ArrowUpRight size={12} />
                              </a>
                            </div>
                          </div>
                          <div className="border border-dashed border-zinc-800 rounded p-3 bg-[#070708]/30 text-left">
                            <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest block mb-1">
                              live server
                            </span>
                            <div className="flex items-center gap-1.5 select-text text-[10.5px]">
                              {proj.liveLink ? (
                                <>
                                  <span className="text-zinc-400 truncate">
                                    {proj.liveLink}
                                  </span>
                                  <a
                                    href={proj.liveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-400 hover:text-white shrink-0"
                                  >
                                    <ArrowUpRight size={12} />
                                  </a>
                                </>
                              ) : (
                                <span className="text-zinc-600 italic">
                                  offline
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Neovim Bottom Statusline (lualine layout) */}
          <div className="h-6 bg-[#09090b] flex items-center justify-between shrink-0 select-none text-[10px] font-sans font-bold">
            <div className="flex items-center h-full">
              <span className="bg-emerald-500 text-black px-3.5 py-0.5 h-full flex items-center font-black uppercase text-[9px] tracking-wider select-none shrink-0">
                NORMAL
              </span>
              <span className="bg-zinc-800 text-zinc-300 px-3 h-full flex items-center gap-1 text-[9.5px] select-none shrink-0 font-mono">
                 main
              </span>
              <span className="text-zinc-500 px-3 truncate select-none text-[9.5px] font-mono">
                📂 src/{activeFile}
              </span>
            </div>
            <div className="flex items-center h-full text-[9.5px] font-mono text-zinc-500">
              <span className="px-3 border-r border-zinc-900">UTF-8</span>
              <span className="px-3 border-r border-zinc-900">
                {activeFile.endsWith('.sh')
                  ? 'sh'
                  : activeFile.endsWith('.json')
                    ? 'json'
                    : 'markdown'}
              </span>
              <span className="bg-zinc-800 text-zinc-300 px-3.5 h-full flex items-center font-bold">
                 ln 1, col 1
              </span>
            </div>
          </div>
        </div>

        {/* BASH SHELL TERMINAL PANEL (Right split) */}
        <div className="w-1/3 bg-black flex flex-col overflow-hidden p-3.5 border-l border-dashed border-zinc-900 font-mono text-[11px] relative shrink-0">
          <div className="flex items-center justify-between text-zinc-600 text-[9px] font-bold border-b border-zinc-900 pb-2 mb-2 select-none">
            <span>Terminal Shell</span>
            <span>bash v5.2</span>
          </div>

          {/* CRT scanlines effect within bash panel */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_98%,rgba(16,185,129,0.01))] z-10" />

          {/* Logs lists */}
          <div className="flex-grow space-y-3.5 overflow-y-auto mb-3 select-text text-left pr-1 scrollbar-thin">
            {terminalLogs.map((log, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-start gap-1 text-zinc-500">
                  <span className="text-[#3c6eb4] font-bold">
                    yonatan-dev:~$
                  </span>
                  <span className="text-white font-bold">{log.command}</span>
                </div>
                {log.output && (
                  <div className="pl-3.5 text-zinc-400 whitespace-pre-wrap border-l border-zinc-900/60 mb-0.5 leading-relaxed font-mono text-[10.5px]">
                    {log.output}
                  </div>
                )}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Bash CLI Command Form Prompt */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-1.5 border-t border-zinc-900/80 pt-2 shrink-0"
          >
            <span className="text-[#3c6eb4] font-bold select-none">
              yonatan-dev:~$
            </span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-grow bg-transparent text-white font-mono focus:outline-none border-0 p-0 text-[11px] caret-emerald-500"
              placeholder="type 'help'..."
              autoFocus
            />
          </form>
        </div>
      </div>

      {/* OS Status Footer Bar */}
      <div className="h-6 bg-[#0f0f11] border-t border-zinc-900 text-[9px] text-zinc-500 px-4 flex items-center justify-between shrink-0 select-none font-sans font-bold uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="bg-[#3c6eb4] text-black px-1.5 py-0.5 font-bold rounded-sm text-[8px]">
            bash
          </span>
          <span className="text-zinc-600">docker_daemon: active</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Cpu Load: 4%</span>
          <span>Mem: 4.81gb / 16.0gb</span>
          <span className="flex items-center gap-1 text-emerald-500 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            status: online
          </span>
        </div>
      </div>
    </div>
  )
}

export default EngineerTerminal
