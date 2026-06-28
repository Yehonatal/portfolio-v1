import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Github, Linkedin, Send, ArrowUpRight, ChevronDown, ChevronUp, 
  BookOpen, MessageSquare, X, ChevronLeft, ChevronRight, Globe, Cpu, 
  Calendar 
} from 'lucide-react'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import TechStack from '@/components/TechStack'
import Education from '@/components/Education'
import projectsData from '@/data/projects.json'
import blogsData from '@/data/blogs.json'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import MobileApp from '@/components/MobileApp'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'

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

function App() {
  const navigate = useNavigate({ from: '/' })
  const { project: projectQueryId } = Route.useSearch()
  
  const [selectedCategory, setSelectedCategory] = useState('Featured')
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Layout selection state
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab, setMobileTab] = useState<'home' | 'works' | 'skills' | 'writing' | 'contact'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [emailCopied, setEmailCopied] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const [activeDeckIndex, setActiveDeckIndex] = useState(0)

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

  // Render Desktop Layout (Default & SSR safe)
  return (
    <div className="selection:bg-[var(--color-foreground)] selection:text-[var(--color-background)] pb-12 md:pl-52 xl:pl-60">
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 max-w-4xl mx-auto px-6 border-b border-[var(--color-border)]">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                Selected Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--color-foreground)]">
                Featured Projects
              </h2>
            </div>
            <span className="text-xs font-medium text-[var(--color-muted-foreground)]">
              Showing {filteredProjects.length} work{filteredProjects.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setShowAllProjects(false)
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border-0 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                    : 'bg-[var(--color-secondary)]/80 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-secondary)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="flex flex-col"
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard 
                    project={project as any} 
                    onSelect={(id) => navigate({ search: { project: id } })}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 border border-dashed border-[var(--color-border)] rounded-xl text-[var(--color-muted-foreground)]">
              No projects found in this category.
            </div>
          )}

          {/* Show More / Show Less Collapsible Toggle */}
          {filteredProjects.length > DISPLAY_LIMIT && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground)] hover:bg-[var(--color-secondary)] transition-colors cursor-pointer"
              >
                {showAllProjects ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show All Projects ({filteredProjects.length}) <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <TechStack />

      {/* Writing Section */}
      <section id="writing" className="py-20 max-w-4xl mx-auto px-6 border-b border-[var(--color-border)]">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                Publications & Thoughts
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--color-foreground)]">
                Writing
              </h2>
            </div>
            <a 
              href="https://medium.com/@yonatanafewerk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] flex items-center gap-1 transition-colors"
            >
              Medium profile <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Blogs list */}
          <div className="flex flex-col">
            {blogsData.map((blog, index) => (
              <a
                key={index}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8 border-b border-[var(--color-border)]/15 hover:opacity-85 transition-opacity"
              >
                <div className="flex items-start gap-4 md:gap-8 flex-grow">
                  {/* Monospace Indicator */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-primary)] shrink-0 pt-1">
                    {String(index + 1).padStart(2, '0')} / Medium
                  </span>
                  
                  {/* Article Title & Description */}
                  <div className="space-y-1.5 max-w-2xl">
                    <h3 className="text-xl font-bold font-display tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs md:text-sm font-light text-[var(--color-muted-foreground)] leading-relaxed">
                      {blog.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors shrink-0 pt-2 md:pt-0 pl-14 md:pl-0">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Background / Contact Section */}
      <section id="contact" className="py-20 max-w-4xl mx-auto px-6">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)]/15 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                Connect
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--color-foreground)]">
                Background & Contact
              </h2>
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/50 px-3 py-1 rounded-full">
              Get in touch
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Direct Line / Contact Details (Left Column - Spans 3) */}
            <div className="md:col-span-3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black font-display tracking-tight text-[var(--color-foreground)] leading-none">
                  Let's build something great.
                </h3>
                <p className="text-sm md:text-base font-light leading-relaxed text-[var(--color-muted-foreground)] max-w-md">
                  I am currently open to part-time contracts, freelance collaborations, or interesting side projects. If you are looking for an elegant, performant developer to build clean digital products, let's talk.
                </p>
              </div>

              {/* Huge Email Contact Button */}
              <div className="space-y-1.5">
                <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Primary Mailbox
                </span>
                <a
                  href="mailto:yonatanafewerk@gmail.com"
                  className="block text-xl md:text-2xl font-black text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors break-all tracking-tight font-display"
                >
                  yonatanafewerk@gmail.com
                </a>
              </div>

              {/* Directories & Resume */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {[
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yonatan-afewerk/' },
                    { name: 'GitHub', url: 'https://github.com/Yehonatal' },
                    { name: 'Telegram', url: 'https://t.me/Jehonatal' },
                    { name: 'Medium', url: 'https://medium.com/@yonatanafewerk' },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-foreground)] transition-colors flex items-center gap-0.5"
                    >
                      {item.name} <ArrowUpRight size={11} />
                    </a>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Download Resume
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Academic & Background Info (Right Column - Spans 2) */}
            <div className="md:col-span-2 space-y-6">
              <Education />
            </div>
          </div>
        </div>
      </section>

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
