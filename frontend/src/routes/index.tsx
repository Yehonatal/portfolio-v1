import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Github, Linkedin, Send, ArrowUpRight, ChevronDown, ChevronUp, 
  BookOpen, MessageSquare, X, ChevronLeft, ChevronRight, Globe, Cpu, 
  Calendar, Sun, Moon, Terminal, Briefcase, RefreshCw
} from 'lucide-react'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import TechStack, { categories as techCategories } from '@/components/TechStack'
import Education from '@/components/Education'
import projectsData from '@/data/projects.json'
import blogsData from '@/data/blogs.json'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import MobileApp from '@/components/MobileApp'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'
import Footer from '@/components/Footer'
import EngineerTerminal from '@/components/EngineerTerminal'
import RecruiterDashboard from '@/components/RecruiterDashboard'
import InteractiveStage from '@/components/InteractiveStage'
import VisitorMode from '@/modes/visitor/VisitorMode'

type ProjectSearch = {
  project?: string
}

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: (search: Record<string, unknown>): ProjectSearch => {
    return {
      project: (search.project as string) || undefined,
    }
  },
})

const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'writing', label: 'writing' },
  { id: 'contact', label: 'contact' },
]

function App() {
  const navigate = useNavigate({ from: '/' })
  const { project: projectQueryId } = Route.useSearch()

  const [hoveredPersona, setHoveredPersona] = useState<'engineer' | 'hr' | 'visitor' | null>(null)
  
  // Persona state
  const [persona, setPersona] = useState<'engineer' | 'hr' | 'visitor' | null>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-persona') as any) || null
    }
    return null
  })
  
  const [selectedCategory, setSelectedCategory] = useState('Featured')
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') || localStorage.getItem('visitor-theme')
      if (stored === 'light' || stored === 'dark') return stored
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemDark ? 'dark' : 'light'
    }
    return 'dark'
  })
  const [palette, setPalette] = useState<'mono' | 'cyber' | 'warm' | 'organic'>('mono')

  // Curated premium artist palettes
  const palettes = {
    mono: {
      light: {
        bg: '#fafafa',
        fg: '#18181b',
        primary: '#71717a',
        secondary: '#f4f4f5',
        border: '#e4e4e7',
        muted: '#a1a1aa'
      },
      dark: {
        bg: '#080809',
        fg: '#fafafa',
        primary: '#a1a1aa',
        secondary: '#18181b',
        border: '#27272a',
        muted: '#71717a'
      }
    },
    cyber: {
      light: {
        bg: '#faf5ff',
        fg: '#581c87',
        primary: '#c084fc',
        secondary: '#faf5ff',
        border: '#e9d5ff',
        muted: '#d8b4fe'
      },
      dark: {
        bg: '#05020c',
        fg: '#f5f3ff',
        primary: '#a78bfa',
        secondary: '#120a21',
        border: '#2e1065',
        muted: '#c084fc'
      }
    },
    warm: {
      light: {
        bg: '#fbf9f1',
        fg: '#451a03',
        primary: '#b45309',
        secondary: '#fef3c7',
        border: '#fde68a',
        muted: '#d97706'
      },
      dark: {
        bg: '#140c06',
        fg: '#fef3c7',
        primary: '#f59e0b',
        secondary: '#251205',
        border: '#451a03',
        muted: '#b45309'
      }
    },
    organic: {
      light: {
        bg: '#f4f7f6',
        fg: '#064e3b',
        primary: '#059669',
        secondary: '#ecfdf5',
        border: '#a7f3d0',
        muted: '#34d399'
      },
      dark: {
        bg: '#030a08',
        fg: '#ecfdf5',
        primary: '#10b981',
        secondary: '#071612',
        border: '#064e3b',
        muted: '#059669'
      }
    }
  }

  // Sync theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Sync custom palette variables to document root
  useEffect(() => {
    const selected = palettes[palette][theme]
    const root = document.documentElement
    root.style.setProperty('--color-background', selected.bg)
    root.style.setProperty('--color-foreground', selected.fg)
    root.style.setProperty('--color-primary', selected.primary)
    root.style.setProperty('--color-secondary', selected.secondary)
    root.style.setProperty('--color-border', selected.border)
    root.style.setProperty('--color-muted-foreground', selected.muted)
  }, [palette, theme])

  // Clear dynamic palette styles when exiting visitor mode
  useEffect(() => {
    const root = document.documentElement
    if (persona && persona !== 'visitor') {
      root.style.removeProperty('--color-background')
      root.style.removeProperty('--color-foreground')
      root.style.removeProperty('--color-primary')
      root.style.removeProperty('--color-secondary')
      root.style.removeProperty('--color-border')
      root.style.removeProperty('--color-muted-foreground')
    }
  }, [persona])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Smooth tab switch
  const handleNavClick = (id: string) => {
    setActiveSection(id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Layout selection state
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab, setMobileTab] = useState<'home' | 'works' | 'skills' | 'writing' | 'contact'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [emailCopied, setEmailCopied] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const [activeDeckIndex, setActiveDeckIndex] = useState(0)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [skillsCategory, setSkillsCategory] = useState<'frontend' | 'backend' | 'database' | 'devops'>('frontend')

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)
  }
  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % projectsData.length)
  }

  // Reset deck index when category changes
  useEffect(() => {
    setActiveDeckIndex(0)
  }, [selectedCategory])

  // Addis Ababa time updater
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

  // SSR-safe viewport observation
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Find active project from query param
  const activeProject = projectsData.find(p => p.id === projectQueryId)

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

  // Copy email helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yonatanafewerk@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  // Extract unique categories from projects data
  const categories = ['Featured', 'All', ...Array.from(new Set(projectsData.map(p => p.category)))]

  // Filter projects based on selected category
  const filteredProjects = projectsData.filter(project => {
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Featured') return project.featured
    return project.category === selectedCategory
  })

  // Index and handlers for cycling projects inside the popup modal
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

  // Collapsible display limit
  const DISPLAY_LIMIT = 6
  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, DISPLAY_LIMIT)

  // Render Mobile-First View
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

  // 1. Selector/Persona views if not on mobile
  if (!isMobile) {
    const isDarkTheme = theme === 'dark'

    return (
      <AnimatePresence mode="wait">
        {persona === null && (
          <motion.div
            key="portal-selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`min-h-screen w-full relative flex items-center justify-center p-6 transition-colors duration-500 select-none ${
              isDarkTheme ? 'bg-[#070708] text-[#f4f4f5]' : 'bg-[#fafafa] text-[#18181b]'
            }`}
          >
            {/* Floating Theme Switcher */}
            <div className="absolute top-6 right-6 z-20">
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3.5 py-2 border rounded-full text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                  isDarkTheme 
                    ? 'bg-[#0c0c0e]/85 border-white/10 hover:border-white/20 text-white/75 hover:text-white'
                    : 'bg-white/80 border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950 shadow-sm'
                }`}
              >
                {isDarkTheme ? (
                  <>
                    <Sun size={11} className="text-amber-400" />
                    <span>LIGHT</span>
                  </>
                ) : (
                  <>
                    <Moon size={11} className="text-indigo-500" />
                    <span>DARK</span>
                  </>
                )}
              </button>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes portal-scan {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
              }
              .portal-grid-lines {
                background-size: 50px 50px;
                background-image: 
                  linear-gradient(to right, ${isDarkTheme ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.025)'} 1px, transparent 1px),
                  linear-gradient(to bottom, ${isDarkTheme ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.025)'} 1px, transparent 1px);
              }
            `}} />

            {/* Technical blueprint grid background */}
            <div className="absolute inset-0 portal-grid-lines pointer-events-none z-0" />

            {/* Laser scan line */}
            <div 
              className={`absolute left-0 w-full h-[1px] pointer-events-none z-0 ${
                isDarkTheme ? 'bg-gradient-to-r from-transparent via-white/5 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'
              }`}
              style={{
                animation: 'portal-scan 8s linear infinite',
              }}
            />

            {/* Dynamic color-shifting radial glow based on hover state */}
            <motion.div
              animate={{
                background: hoveredPersona === 'engineer'
                  ? `radial-gradient(circle at 50% 50%, ${isDarkTheme ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.05)'} 0%, transparent 60%)`
                  : hoveredPersona === 'hr'
                  ? `radial-gradient(circle at 50% 50%, ${isDarkTheme ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.05)'} 0%, transparent 60%)`
                  : hoveredPersona === 'visitor'
                  ? `radial-gradient(circle at 50% 50%, ${isDarkTheme ? 'rgba(200,57,43,0.08)' : 'rgba(200,57,43,0.05)'} 0%, transparent 60%)`
                  : isDarkTheme
                  ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 65%)'
                  : 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.02) 0%, transparent 65%)',
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 z-0 pointer-events-none"
            />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl w-full text-center space-y-12 relative z-10"
            >
              {/* Header */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <h1 className={`text-4xl md:text-6xl font-extralight font-display tracking-tight leading-none ${
                  isDarkTheme ? 'text-white' : 'text-zinc-900'
                }`}>
                  Identify <span className="font-semibold italic text-[#C8392B]">context</span>.
                </h1>
                <p className={`text-xs md:text-sm font-light max-w-md mx-auto leading-relaxed ${
                  isDarkTheme ? 'text-white/40' : 'text-zinc-500'
                }`}>
                  Configure the workspace session based on your target objectives.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {[
                  {
                    id: 'engineer' as const,
                    title: 'Engineer',
                    subtitle: 'DEVELOPER / ARCHITECT',
                    desc: 'A full monospaced IDE terminal context. Review directory structures, run scripts, explore data endpoints, and read developer logs.',
                    icon: <Terminal size={18} />,
                    color: '#10b981',
                    accentBg: 'rgba(16,185,129,0.15)',
                    features: ['IDE File System', 'Live Interactive REPL', 'Source Code Access']
                  },
                  {
                    id: 'hr' as const,
                    title: 'Recruiter / HR',
                    subtitle: 'TALENT ACQUISITION',
                    desc: 'Clean, structured curriculum vitae dashboard context. Optimized for scanning experience history, skill trees, and direct CV download.',
                    icon: <Briefcase size={18} />,
                    color: '#3b82f6',
                    accentBg: 'rgba(59,130,246,0.15)',
                    features: ['Professional Timeline', 'CV Download Link', 'Capability Matrix']
                  },
                  {
                    id: 'visitor' as const,
                    title: 'General Visitor',
                    subtitle: 'CREATIVE PORTFOLIO',
                    desc: 'An immersive digital design showcase context. Interactive Perlin flow fields, typography-first layouts, and smooth transition mechanics.',
                    icon: <Globe size={18} />,
                    color: '#C8392B',
                    accentBg: 'rgba(200,57,43,0.15)',
                    features: ['Interactive Flow Field', 'Selected Work Exhibition', 'Process Methodology']
                  }
                ].map((item, idx) => {
                  const isHovered = hoveredPersona === item.id;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                      whileHover={{ y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => setHoveredPersona(item.id)}
                      onMouseLeave={() => setHoveredPersona(null)}
                      onClick={() => {
                        setPersona(item.id)
                        localStorage.setItem('portfolio-persona', item.id)
                      }}
                      className={`border p-6 text-left rounded-xl cursor-pointer flex flex-col justify-between min-h-[380px] group relative overflow-hidden transition-all duration-300 ${
                        isDarkTheme ? 'bg-[#0c0c0e]' : 'bg-white shadow-sm'
                      }`}
                      style={{
                        borderColor: isHovered 
                          ? item.color 
                          : isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
                        boxShadow: isHovered ? `0 10px 30px -15px ${item.color}` : 'none'
                      }}
                    >
                      <div className="absolute inset-0 portal-grid-lines opacity-10 pointer-events-none" />

                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center justify-between">
                          <div 
                            className="p-2.5 rounded-lg transition-colors"
                            style={{ 
                              backgroundColor: isHovered ? item.accentBg : (isDarkTheme ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'),
                              color: isHovered ? item.color : (isDarkTheme ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)')
                            }}
                          >
                            {item.icon}
                          </div>
                          <span className={`text-[9px] font-mono tracking-widest ${
                            isDarkTheme ? 'text-white/20' : 'text-zinc-300'
                          }`}>
                            [0{idx + 1}]
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h3 className={`text-xl font-display font-semibold tracking-tight ${
                            isDarkTheme ? 'text-white' : 'text-zinc-950'
                          }`}>
                            {item.title}
                          </h3>
                          <span 
                            className="block text-[8px] font-mono tracking-widest transition-colors font-bold"
                            style={{ color: isHovered ? item.color : (isDarkTheme ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)') }}
                          >
                            // {item.subtitle}
                          </span>
                        </div>

                        <p className={`text-[11px] leading-relaxed font-light ${
                          isDarkTheme ? 'text-white/50' : 'text-zinc-600'
                        }`}>
                          {item.desc}
                        </p>

                        <div className="space-y-1.5 pt-2">
                          {item.features.map(feat => (
                            <div key={feat} className={`flex items-center gap-2 text-[9px] font-mono ${
                              isDarkTheme ? 'text-white/40' : 'text-zinc-500'
                            }`}>
                              <span style={{ color: isHovered ? item.color : (isDarkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)') }}>↳</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div 
                        className="text-[9px] font-mono font-bold uppercase tracking-widest pt-6 flex items-center gap-2 transition-all"
                        style={{ 
                          color: isHovered ? item.color : (isDarkTheme ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)'),
                          transform: isHovered ? 'translateX(4px)' : 'none'
                        }}
                      >
                        <span>load_session()</span>
                        <span>&rarr;</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {persona === 'engineer' && (
          <motion.div
            key="engineer-terminal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 w-screen h-screen z-50 bg-[#0c0c0d] overflow-hidden select-none"
          >
            <EngineerTerminal
              onBackToPersona={() => {
                setPersona(null)
                localStorage.removeItem('portfolio-persona')
              }}
              onInspectProject={(id) => navigate({ search: { project: id } })}
            />
            <ProjectDetailsModal
              activeProject={activeProject as any}
              isMobile={false}
              activeProjectIndex={activeProjectIndex}
              totalProjectsCount={filteredProjects.length}
              onClose={() => navigate({ search: { project: undefined } })}
              onPrev={handlePrevProject}
              onNext={handleNextProject}
            />
          </motion.div>
        )}

        {persona === 'hr' && (
          <motion.div
            key="hr-dashboard"
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
                setPersona(null)
                localStorage.removeItem('portfolio-persona')
              }}
            />
          </motion.div>
        )}

        {persona === 'visitor' && (
          <motion.div
            key="visitor-mode"
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
                setPersona(null)
                localStorage.removeItem('portfolio-persona')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }


  return null
}
