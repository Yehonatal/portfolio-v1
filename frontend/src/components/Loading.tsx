import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const Loading = ({ onComplete }: { onComplete?: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [themeText, setThemeText] = useState('loading')

  useEffect(() => {
    // Read theme strictly on client side to prevent hydration mismatches
    const stored = localStorage.getItem('theme') || localStorage.getItem('visitor-theme')
    if (stored === 'light' || stored === 'dark') {
      setThemeText(stored)
    } else {
      setThemeText(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }

    const duration = 1200 // 1.2s loading
    const interval = 20
    const step = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          if (onComplete) {
            setTimeout(onComplete, 100)
          }
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  const getLogMessage = (prog: number) => {
    if (prog < 25) return 'Initializing profile assets...'
    if (prog < 50) return 'Configuring relational stack mapping...'
    if (prog < 75) return 'Securing developer session terminal...'
    if (prog < 95) return 'Finalizing UX micro-interactions...'
    return 'System ready.'
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 select-none bg-[#fafafa] dark:bg-[#070708] text-[#18181b] dark:text-[#f4f4f5] transition-colors duration-500">
      {/* Blueprint grid lines (styled natively in CSS based on .dark class to avoid flash) */}
      <div className="absolute inset-0 loader-grid pointer-events-none" />

      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full filter blur-[100px] pointer-events-none opacity-20 transition-all duration-1000 bg-emerald-500/5 dark:bg-emerald-500/10" />

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Top bar info */}
        <div className="flex justify-between items-center text-[9px] font-mono tracking-widest opacity-60">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SESSION_BOOT</span>
          </div>
        </div>

        {/* Center Progress Circle & Indicator */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-black/5 dark:stroke-white/5"
                strokeWidth="1.5"
                fill="transparent"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-emerald-500"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * progress) / 100}
                transition={{ ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex items-baseline gap-0.5">
              <span className="text-2xl font-black font-display tracking-tighter tabular-nums">
                {Math.round(progress)}
              </span>
              <span className="text-[10px] font-mono opacity-60">%</span>
            </div>
          </div>
        </div>

        {/* Bottom Console logs output */}
        <div className="border rounded-xl p-4 font-mono text-[10px] space-y-2.5 bg-white dark:bg-[#0c0c0e]/80 border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 border-b pb-2 text-[9px] opacity-50 border-current/10">
            <Terminal size={11} className="text-emerald-500" />
            <span>SHELL_ENVIRONMENT_LOGS</span>
          </div>

          <div className="space-y-1 text-left">
            <p className="flex justify-between">
              <span className="opacity-50">SYS_INDEX:</span>
              <span className="text-emerald-500 font-bold">READY</span>
            </p>
            <p className="flex justify-between">
              <span className="opacity-50">THEME_MAP:</span>
              <span className="uppercase">{themeText}</span>
            </p>
            <p className="text-emerald-500/80 leading-normal truncate">
              &gt; {getLogMessage(progress)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
