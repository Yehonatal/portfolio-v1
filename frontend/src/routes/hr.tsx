import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import RecruiterDashboard from '@/modes/hr/RecruiterDashboard'

export const Route = createFileRoute('/hr')({
  component: HRPage,
})

function HRPage() {
  const navigate = useNavigate({ from: '/hr' })

  // Sync persona to localStorage when loading this page
  useEffect(() => {
    localStorage.setItem('portfolio-persona', 'hr')
  }, [])

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') || localStorage.getItem('visitor-theme')
      if (stored === 'light' || stored === 'dark') return stored
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemDark ? 'dark' : 'light'
    }
    return 'dark'
  })

  // Sync theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.99, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen"
    >
      <RecruiterDashboard
        theme={theme}
        toggleTheme={toggleTheme}
        onBackToPersona={() => {
          localStorage.removeItem('portfolio-persona')
          navigate({ to: '/' })
        }}
      />
    </motion.div>
  )
}
