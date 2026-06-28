import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import VisitorMode from '@/modes/visitor/VisitorMode'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'
import MobileApp from '@/components/MobileApp'
import projectsData from '@/data/projects.json'

type ProjectSearch = {
  project?: string
}

export const Route = createFileRoute('/visitor')({
  validateSearch: (search: Record<string, unknown>): ProjectSearch => {
    return {
      project: (search.project as string) || undefined,
    }
  },
  component: VisitorPage,
})

function VisitorPage() {
  const navigate = useNavigate({ from: '/visitor' })
  const { project: projectQueryId } = Route.useSearch()

  // Sync persona to localStorage when loading this page
  useEffect(() => {
    localStorage.setItem('portfolio-persona', 'visitor')
  }, [])

  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') || localStorage.getItem('visitor-theme')
      if (stored === 'light' || stored === 'dark') return stored
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemDark ? 'dark' : 'light'
    }
    return 'dark'
  })

  // Ethiopia time updater
  const [localTime, setLocalTime] = useState('')
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Addis_Ababa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      setLocalTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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

  // Observe viewport size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Mobile App specific states
  const [mobileTab, setMobileTab] = useState<'home' | 'works' | 'skills' | 'writing' | 'contact'>('home')
  const [selectedCategory, setSelectedCategory] = useState('Featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDeckIndex, setActiveDeckIndex] = useState(0)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yonatanafewerk@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  // Category listing
  const categories = ['Featured', 'All', ...Array.from(new Set(projectsData.map(p => p.category)))]

  // Filter projects based on selected category
  const filteredProjects = projectsData.filter(project => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Featured') return project.featured
    return project.category === selectedCategory
  })

  // Find active project from query param
  const activeProject = projectsData.find(p => p.id === projectQueryId)
  const activeProjectIndex = filteredProjects.findIndex(p => p.id === projectQueryId)

  const handleNextProject = () => {
    if (activeProjectIndex === -1 || filteredProjects.length <= 1) return
    const nextIndex = (activeProjectIndex + 1) % filteredProjects.length
    navigate({ search: { project: filteredProjects[nextIndex].id } })
  }

  const handlePrevProject = () => {
    if (activeProjectIndex === -1 || filteredProjects.length <= 1) return
    const prevIndex = (activeProjectIndex - 1 + filteredProjects.length) % filteredProjects.length
    navigate({ search: { project: filteredProjects[prevIndex].id } })
  }

  // Lock background scroll when modal is active
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProject])

  if (isMobile) {
    return (
      <>
        <MobileApp
          theme={theme}
          toggleTheme={toggleTheme}
          localTime={localTime}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredProjects={filteredProjects as any}
          activeDeckIndex={activeDeckIndex}
          setActiveDeckIndex={setActiveDeckIndex}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          mobileTab={mobileTab}
          setMobileTab={setMobileTab}
          emailCopied={emailCopied}
          handleCopyEmail={handleCopyEmail}
          onInspectProject={(projectId) => navigate({ search: { project: projectId } })}
        />
        <ProjectDetailsModal
          activeProject={activeProject as any}
          isMobile={true}
          activeProjectIndex={activeProjectIndex}
          totalProjectsCount={filteredProjects.length}
          onClose={() => navigate({ search: { project: undefined } })}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
        />
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen"
    >
      <VisitorMode
        theme={theme}
        toggleTheme={toggleTheme}
        onBackToPersona={() => {
          localStorage.removeItem('portfolio-persona')
          navigate({ to: '/' })
        }}
      />
      {activeProject && (
        <ProjectDetailsModal
          activeProject={activeProject as any}
          isMobile={false}
          variant="modern"
          activeProjectIndex={activeProjectIndex}
          totalProjectsCount={filteredProjects.length}
          onClose={() => navigate({ search: { project: undefined } })}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
        />
      )}
    </motion.div>
  )
}
