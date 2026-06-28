import { useEffect, useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { Sun, Moon, ArrowUpRight, Github, Mail, Linkedin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'writing', label: 'writing' },
  { id: 'contact', label: 'contact' },
]

const Navbar = () => {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('about')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Sync isMobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Sync theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Scroll spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll
  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    
    if (window.location.pathname !== '/') {
      router.navigate({ to: '/', hash: id })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      })
    }
  }

  if (isMobile) return null

  return (
    <>
      <header className="fixed left-8 xl:left-[calc(50vw-33rem)] top-24 z-50 w-44 hidden md:flex flex-col gap-10 bg-transparent border-none">
      {/* Branding */}
      <div className="space-y-1">
        <Link
          to="/"
          onClick={() => handleNavClick('about')}
          className="focus:outline-none cursor-pointer group block"
        >
          <span className="font-display font-black text-sm tracking-[0.08em] uppercase text-[var(--color-foreground)] block">
            yonatan.
          </span>
        </Link>
        <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-[var(--color-primary)]">
          Full Stack Engineer
        </span>
      </div>

      {/* Navigation Links - Vertical List */}
      <nav className="flex flex-col items-start gap-4">
        {navLinks.map((link, idx) => {
          const isActive = activeSection === link.id
          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="flex items-center gap-3 group focus:outline-none cursor-pointer py-1"
            >
              {/* Fine number index */}
              <span className={`text-[8px] font-mono tracking-widest transition-colors ${
                isActive ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-muted-foreground)]/50 group-hover:text-[var(--color-foreground)]'
              }`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? 'text-[var(--color-foreground)] border-b border-[var(--color-primary)]'
                  : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
              }`}>
                {link.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Theme Switcher & Status */}
      <div className="space-y-5 pt-5 border-t border-[var(--color-border)]/15">
        {/* Availability Status */}
        <div className="space-y-1">
          <span className="block text-[7px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Status
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-500">
              Open to work
            </span>
          </div>
        </div>

        {/* Minimalist Theme Switcher */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors focus:outline-none cursor-pointer flex items-center gap-2"
            aria-label="Toggle Theme"
          >
            <span className="flex items-center shrink-0">
              {theme === 'dark' ? <Sun size={12} strokeWidth={2} /> : <Moon size={12} strokeWidth={2} />}
            </span>
            <span className="text-[8px] font-mono font-bold uppercase tracking-wider leading-none select-none">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {!isMobile && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-100 bg-[var(--color-background)] flex flex-col justify-between p-8 pt-24 md:hidden"
            >
              {/* Subtle background tech grid layout overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

              {/* Menu Items with Staggered Entrance */}
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  }
                }}
                className="flex flex-col gap-6"
              >
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id
                  return (
                    <motion.div
                      key={link.id}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } }
                      }}
                      className="group"
                    >
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="flex items-baseline gap-4 focus:outline-none cursor-pointer text-left"
                      >
                        <span className="font-mono text-[10px] font-bold text-[var(--color-muted-foreground)] tracking-widest">
                          0{idx + 1}.
                        </span>
                        <span className={`font-display text-4xl font-extrabold uppercase tracking-tight relative transition-all duration-300 group-hover:pl-2 ${
                          isActive 
                            ? 'text-[var(--color-foreground)]' 
                            : 'text-[var(--color-muted-foreground)]/70 hover:text-[var(--color-foreground)]'
                        }`}>
                          {link.label}
                          {isActive && (
                            <span className="absolute left-0 bottom-1 w-full h-[3px] bg-[var(--color-primary)] -z-10 opacity-45" />
                          )}
                        </span>
                      </button>
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* Bottom Section - Social Links and Location/Status */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="border-t border-[var(--color-border)]/60 pt-8 flex flex-col gap-6"
              >
                {/* Location and Status Ticker */}
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    Availability
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      Open for select freelance projects
                    </span>
                  </div>
                </div>

                {/* Social Icons row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <a
                      href="https://github.com/yehonal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-[var(--color-border)]/60 hover:bg-[var(--color-secondary)] transition-colors text-[var(--color-foreground)]"
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/yonatan-afewerk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-[var(--color-border)]/60 hover:bg-[var(--color-secondary)] transition-colors text-[var(--color-foreground)]"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href="mailto:yonatan.afewerk.work@gmail.com"
                      className="p-2.5 rounded-full border border-[var(--color-border)]/60 hover:bg-[var(--color-secondary)] transition-colors text-[var(--color-foreground)]"
                      aria-label="Email"
                    >
                      <Mail size={14} />
                    </a>
                  </div>

                  <span className="text-[9px] font-mono text-[var(--color-muted-foreground)]">
                    © 2026 / ADDIS ABABA
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

export default Navbar
