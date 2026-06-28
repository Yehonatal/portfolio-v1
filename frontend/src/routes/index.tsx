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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
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
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

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

  // 1. Selector view if no persona chosen yet
  if (!isMobile && persona === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)] select-none">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full text-center space-y-12"
        >
          {/* Header */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--primary)] uppercase font-bold">
              PORTAL SESSION CONFIGURATION
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-[var(--foreground)] leading-none">
              Choose your profile.
            </h1>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)] font-light max-w-md mx-auto leading-relaxed">
              Select the workspace profile that best matches your target goal today. You can hot-swap at any time.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {[
              {
                id: 'engineer' as const,
                title: 'Engineer',
                subtitle: '// Terminal IDE',
                desc: '100% monospaced shell console. Click file explorers, execute live commands, and read code indices.',
                icon: <Terminal size={20} className="text-[var(--primary)]" />
              },
              {
                id: 'hr' as const,
                title: 'Recruiter / HR',
                subtitle: '// Corporate CV',
                desc: 'Clean, structured curriculum vitae dashboard. High readability outlines, direct timeline indices, and resume downloads.',
                icon: <Briefcase size={20} className="text-[var(--primary)]" />
              },
              {
                id: 'visitor' as const,
                title: 'General Visitor',
                subtitle: '// Immersive Design',
                desc: 'Creative designer showcase with dynamic grids, hover card micro-motions, and curated visual sections.',
                icon: <Globe size={20} className="text-[var(--primary)]" />
              }
            ].map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setPersona(item.id)
                  localStorage.setItem('portfolio-persona', item.id)
                }}
                className="bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/60 p-6 text-left rounded-xl cursor-pointer transition-colors duration-250 flex flex-col justify-between gap-6 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="p-2.5 bg-[var(--secondary)] rounded-lg w-fit group-hover:bg-[var(--primary)]/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-[var(--foreground)] font-display flex items-center gap-1.5">
                      {item.title}
                    </h3>
                    <span className="block text-[8px] font-mono tracking-wider text-[var(--muted-foreground)]">
                      {item.subtitle}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  load_session() &rarr;
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  // 2. Engineer terminal mode
  if (!isMobile && persona === 'engineer') {
    return (
      <div className="fixed inset-0 w-screen h-screen z-50 bg-[#0c0c0d] overflow-hidden select-none">
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
      </div>
    )
  }

  // 3. Recruiter CV dashboard mode
  if (!isMobile && persona === 'hr') {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <RecruiterDashboard
          onBackToPersona={() => {
            setPersona(null)
            localStorage.removeItem('portfolio-persona')
          }}
        />
      </div>
    )
  }

  // 4. General visitor mode
  if (!isMobile && persona === 'visitor') {
    return (
      <VisitorMode
        onBackToPersona={() => {
          setPersona(null)
          localStorage.removeItem('portfolio-persona')
        }}
      />
    )
  }

  // Render Desktop Layout (Default & SSR safe)
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col justify-between p-6 md:p-10 bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 selection:bg-[var(--color-foreground)] selection:text-[var(--color-background)]">
      <InteractiveStage section={activeSection} />
      
      {/* Self-contained CSS Marquee Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .glass-chamber {
          background: rgba(var(--color-secondary), 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}} />

      {/* Background Typography Marquee */}
      <div className="absolute top-[35%] left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.035] dark:opacity-[0.025] transition-opacity">
        <div className="animate-marquee-scroll flex text-8xl font-black font-display tracking-[0.25em] uppercase whitespace-nowrap text-[var(--color-primary)]">
          <span>YONATAN AFEWERK • SYSTEM ARCHITECT • FULLSTACK ENGINEER • CREATIVE DEVELOPER • SWENETIX TECH PLC • ADDIS ABABA •&nbsp;</span>
          <span>YONATAN AFEWERK • SYSTEM ARCHITECT • FULLSTACK ENGINEER • CREATIVE DEVELOPER • SWENETIX TECH PLC • ADDIS ABABA •&nbsp;</span>
        </div>
      </div>

      {/* 3rd Space Header */}
      <header className="relative z-10 w-full flex items-center justify-between border-b border-[var(--color-border)]/35 pb-5">
        <div className="flex items-center gap-3">
          <span className="font-display font-black text-sm uppercase tracking-[0.2em] text-[var(--color-foreground)]">
            yonatan.
          </span>
          <span className="hidden md:inline-block text-[8px] font-mono px-2.5 py-0.5 rounded bg-[var(--color-secondary)] border border-[var(--color-border)] text-[var(--color-muted-foreground)] uppercase tracking-widest">
            ONLINE // {localTime ? 'ADDIS ABABA' : 'OFFLINE'}
          </span>
        </div>
        
        {/* Artistic Control Center */}
        <div className="flex items-center gap-6">
          {/* Palette Selector */}
          <div className="hidden lg:flex items-center gap-3 bg-[var(--color-secondary)]/50 border border-[var(--color-border)]/55 px-3 py-1.5 rounded-full">
            <span className="text-[7px] font-mono text-[var(--color-muted-foreground)] uppercase tracking-widest mr-1">PALETTE:</span>
            {[
              { id: 'mono', label: 'MONO' },
              { id: 'cyber', label: 'CYBER' },
              { id: 'warm', label: 'BOHO' },
              { id: 'organic', label: 'FOREST' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPalette(p.id as any)}
                className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  palette === p.id
                    ? 'bg-[var(--color-foreground)] text-[var(--color-background)] font-bold shadow-sm'
                    : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Switch Profile Switcher */}
            <button
              onClick={() => {
                setPersona(null)
                localStorage.removeItem('portfolio-persona')
              }}
              className="text-[9px] font-mono tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw size={11} /> CHANGE PROFILE
            </button>
            
            <span className="text-[var(--color-border)] text-xs">|</span>
            
            {/* Minimal Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="text-[9px] font-mono tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] uppercase transition-colors cursor-pointer"
            >
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Exhibition Deck (Center Frame) */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-6 w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-fit py-6 px-4"
          >
            {/* Double-Layer Card container for parallax 3D feel */}
            <div className="relative group max-w-4xl mx-auto w-full">
              {/* Back Drop shadow sheet */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-muted-foreground)]/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 border border-[var(--color-primary)]/10 rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 pointer-events-none" />

              {/* Main active interactive content card */}
              <div className="relative bg-[var(--color-background)]/85 border border-[var(--color-border)]/65 rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl transition-colors duration-500 min-h-[380px] flex flex-col justify-center animate-fade-in">
                {activeSection === 'about' && (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center w-full">
                    <div className="md:col-span-3 space-y-6">
                      <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-primary)] uppercase block">01 / INTRODUCTION</span>
                      <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight leading-tight text-[var(--color-foreground)]">
                        Building scalable architectures with <span className="font-semibold italic text-[var(--color-primary)]">clean code</span> and <span className="font-semibold italic text-[var(--color-muted-foreground)]">visual precision</span>.
                      </h1>
                      <p className="text-[11px] font-mono leading-relaxed text-[var(--color-muted-foreground)] max-w-lg">
                        Addis Ababa, Ethiopia — Designing robust MERN architectures, Odoo ERP enterprise modules, and query-optimized schemas at Swenetix Tech PLC.
                      </p>
                    </div>
                    <div className="md:col-span-2 border-l border-[var(--color-border)]/45 pl-8 space-y-6 py-4">
                      <div className="space-y-1">
                        <span className="block text-[8px] font-mono tracking-widest text-[var(--color-muted-foreground)] uppercase">LOCAL ZONE</span>
                        <span className="block text-xs font-mono font-bold text-[var(--color-foreground)]">{localTime} EAT</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[8px] font-mono tracking-widest text-[var(--color-muted-foreground)] uppercase">CALENDAR</span>
                        <span className="block text-xs font-mono font-bold text-[var(--color-foreground)]">Ginbot 20, 2018 E.C.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[8px] font-mono tracking-widest text-[var(--color-muted-foreground)] uppercase">STATUS</span>
                        <span className="block text-xs font-mono font-bold text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-ping"></span>
                          DEPLOYMENT_READY
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'projects' && (
                  <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-between">
                    {/* Left arrow */}
                    <button 
                      onClick={prevCarousel} 
                      className="p-3 rounded-full hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors cursor-pointer hidden md:block"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    {/* Center project panel */}
                    {(() => {
                      const proj = projectsData[carouselIndex]
                      return (
                        <div className="flex-1 w-full space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-[var(--color-border)]/45 pb-4">
                              <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-primary)] uppercase">
                                EXHIBIT 02 / {String(carouselIndex + 1).padStart(2, '0')}
                              </span>
                              <span className="text-[9px] font-mono tracking-widest text-[var(--color-muted-foreground)] uppercase">
                                {proj.category}
                              </span>
                            </div>
                            
                            <h2 className="text-2xl font-bold font-display tracking-tight text-[var(--color-foreground)]">
                              {proj.title}
                            </h2>
                            
                            <p className="text-[11px] leading-relaxed text-[var(--color-muted-foreground)] font-light line-clamp-4">
                              {proj.description}
                            </p>
                          </div>
                          
                          <div className="space-y-4 pt-2">
                            {/* Tech Stack tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {proj.techUsed.map(t => (
                                <span key={t} className="text-[8px] font-mono px-2 py-0.5 rounded bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] border border-[var(--color-border)]/35">
                                  {t}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4 pt-2">
                              <button
                                onClick={() => navigate({ search: { project: proj.id } })}
                                className="px-6 py-2.5 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-[var(--color-foreground)]/10"
                              >
                                INSPECT CODEX ARTIFACT
                              </button>
                              
                              {proj.liveLink && (
                                <a
                                  href={proj.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] font-mono tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] uppercase flex items-center gap-1 transition-colors"
                                >
                                  LIVE PREVIEW <ArrowUpRight size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                    
                    {/* Right arrow */}
                    <button 
                      onClick={nextCarousel} 
                      className="p-3 rounded-full hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors cursor-pointer hidden md:block"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Mobile navigation row */}
                    <div className="flex md:hidden gap-6 mt-4 w-full justify-center">
                      <button onClick={prevCarousel} className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] border border-[var(--color-border)] text-xs font-mono">PREV</button>
                      <span className="text-xs font-mono text-[var(--color-muted-foreground)] self-center">{carouselIndex + 1} / {projectsData.length}</span>
                      <button onClick={nextCarousel} className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] border border-[var(--color-border)] text-xs font-mono">NEXT</button>
                    </div>
                  </div>
                )}

                {activeSection === 'skills' && (
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Left categories navigation */}
                    <div className="md:col-span-1 flex flex-col gap-2">
                      <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-primary)] uppercase block mb-3">03 / CAPABILITIES</span>
                      {techCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSkillsCategory(cat.id as any)}
                          className={`text-left px-4 py-3 border transition-all cursor-pointer font-mono uppercase text-[9px] tracking-widest ${
                            skillsCategory === cat.id
                              ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]'
                              : 'bg-transparent text-[var(--color-muted-foreground)] border-[var(--color-border)]/45 hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]'
                          }`}
                        >
                          {cat.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Right detailed list card */}
                    {(() => {
                      const activeCat = techCategories.find(c => c.id === skillsCategory) || techCategories[0]
                      return (
                        <div className="md:col-span-3 min-h-[260px] flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold font-display text-[var(--color-foreground)]">{activeCat.name}</h3>
                            <p className="text-[11px] leading-relaxed text-[var(--color-muted-foreground)] font-light">{activeCat.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            {activeCat.tech.map(t => (
                              <div key={t.name} className="space-y-1">
                                <span className="block text-[10px] font-bold text-[var(--color-foreground)] tracking-wide">{t.name}</span>
                                <span className="block text-[9px] font-mono text-[var(--color-muted-foreground)] leading-normal">{t.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}

                {activeSection === 'writing' && (
                  <div className="w-full space-y-6">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-primary)] uppercase block">04 / WRITTEN JOURNALS</span>
                    <div className="space-y-3">
                      {blogsData.map((blog, idx) => (
                        <a
                          key={blog.id}
                          href={blog.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-[var(--color-secondary)]/40 border border-[var(--color-border)]/45 hover:border-[var(--color-foreground)] rounded-xl transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                              <span className="text-[8px] font-mono text-[var(--color-muted-foreground)] uppercase tracking-widest">JOURNAL 04.{idx + 1}</span>
                              <h3 className="text-sm font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors font-display">
                                {blog.title}
                              </h3>
                              <p className="text-[10px] text-[var(--color-muted-foreground)] font-light line-clamp-1">{blog.description}</p>
                            </div>
                            <ArrowUpRight size={14} className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'contact' && (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-primary)] uppercase block">05 / DIALOGUE</span>
                      <h2 className="text-3xl font-bold font-display tracking-tight text-[var(--color-foreground)] leading-tight">
                        Let's co-create. Establish communication.
                      </h2>
                      <p className="text-[11px] leading-relaxed text-[var(--color-muted-foreground)] max-w-sm">
                        Reach out to initiate freelance collaborations, enterprise audits, or discuss modern frontend architectures.
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <a
                        href="mailto:yonatanafewerk@gmail.com"
                        className="flex items-center justify-between p-4 bg-[var(--color-secondary)]/40 border border-[var(--color-border)]/45 hover:border-[var(--color-primary)] rounded-xl transition-all font-mono text-[10px] tracking-wider text-[var(--color-foreground)] uppercase cursor-pointer"
                      >
                        <span>EMAIL // yonatanafewerk@gmail.com</span>
                        <ArrowUpRight size={12} />
                      </a>
                      <a
                        href="https://t.me/yonatanafewerk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[var(--color-secondary)]/40 border border-[var(--color-border)]/45 hover:border-[var(--color-primary)] rounded-xl transition-all font-mono text-[10px] tracking-wider text-[var(--color-foreground)] uppercase cursor-pointer"
                      >
                        <span>TELEGRAM // @yonatanafewerk</span>
                        <ArrowUpRight size={12} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/yonatan-afewerk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[var(--color-secondary)]/40 border border-[var(--color-border)]/45 hover:border-[var(--color-primary)] rounded-xl transition-all font-mono text-[10px] tracking-wider text-[var(--color-foreground)] uppercase cursor-pointer"
                      >
                        <span>LINKEDIN // connect</span>
                        <ArrowUpRight size={12} />
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[var(--color-secondary)]/40 border border-[var(--color-border)]/45 hover:border-[var(--color-primary)] rounded-xl transition-all font-mono text-[10px] tracking-wider text-[var(--color-foreground)] uppercase cursor-pointer font-bold animate-pulse"
                      >
                        <span>DOWNLOAD PORTFOLIO RESUME</span>
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Exhibition Dock (Navigation) */}
      <footer className="relative z-10 w-full border-t border-[var(--color-border)]/35 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[8px] font-mono tracking-widest text-[var(--color-muted-foreground)] uppercase">
          EXHIBITION SPACE // YONATAN AFEWERK PORTFOLIO
        </div>
        
        <nav className="flex items-center gap-6 md:gap-8 overflow-x-auto max-w-full pb-2 md:pb-0">
          {[
            { id: 'about', label: 'ABSTRACT', num: '01' },
            { id: 'projects', label: 'SELECTED WORKS', num: '02' },
            { id: 'skills', label: 'CAPABILITIES', num: '03' },
            { id: 'writing', label: 'LOGS', num: '04' },
            { id: 'contact', label: 'DIALOGUE', num: '05' },
          ].map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className="flex items-center gap-1.5 focus:outline-none cursor-pointer group py-1"
              >
                <span className={`text-[7px] font-mono tracking-widest transition-colors ${
                  isActive ? 'text-[var(--color-foreground)] font-bold' : 'text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]'
                }`}>
                  {link.num}
                </span>
                <span className={`text-[9px] font-mono tracking-[0.15em] transition-colors border-b py-0.5 ${
                  isActive
                    ? 'text-[var(--color-foreground)] border-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                }`}>
                  {link.label}
                </span>
              </button>
            )
          })}
        </nav>
      </footer>

      {/* Info-Dense Project Popup Modal */}
      <ProjectDetailsModal
        activeProject={activeProject as any}
        isMobile={false}
        activeProjectIndex={activeProjectIndex}
        totalProjectsCount={filteredProjects.length}
        onClose={() => navigate({ search: { project: undefined } })}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
      />
    </div>
  )
}


