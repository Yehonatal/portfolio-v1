import { Moon, Sun, Menu, X } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import AdRibbon from './AdRibbon'

const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  // Lock scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/') return 'Front Page'
    if (path.startsWith('/projects')) return 'The Archive'
    if (path.startsWith('/blogs')) return 'The Journal'
    return 'Digital Experiences'
  }

  return (
    <div className="bg-[var(--color-background)]">
      <AdRibbon />

      {/* Masthead */}
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-[var(--color-foreground)] relative">
        <button
          onClick={toggleTheme}
          className="absolute right-6 top-8 hidden sm:flex items-center gap-2 text-xs font-medium tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors uppercase cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>

        <Link to="/" className="inline-block group">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight uppercase text-[var(--color-foreground)]">
            Yonatan Afewerk
          </h1>
        </Link>
        <div className="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-serif italic text-[var(--color-muted-foreground)] tracking-wide">
          <span>Building Digital Experiences</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>Crafter of Code</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>Problem Solver</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-[var(--color-background)]/90 backdrop-blur-sm border-y border-[var(--color-border)]">
        {/* Desktop and Mobile Container */}
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center relative">
          
          {/* Desktop Links (Centered via justify-center above) */}
          <div className="hidden md:flex items-center justify-center gap-10 w-full">
            <Link
              to="/"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors [&.active]:text-[var(--color-foreground)]"
            >
              Front Page
            </Link>
            <Link
              to="/projects"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors [&.active]:text-[var(--color-foreground)]"
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors [&.active]:text-[var(--color-foreground)]"
            >
              Journal
            </Link>
          </div>

          {/* Desktop Github Link (Absolute right) */}
          <div className="hidden md:flex absolute right-6 items-center">
            <a
              href="https://github.com/Yehonatal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
            >
              Github
            </a>
          </div>

          {/* Mobile Header (Theme + Menu Toggle) */}
          <div className="flex md:hidden w-full items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs font-medium tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors uppercase cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Sun className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
            <span className="text-xs font-serif italic text-[var(--color-foreground)] font-bold uppercase tracking-widest">
              {getPageTitle()}
            </span>
            <button
              onClick={() => setIsOpen(true)}
              className="p-1 text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-colors border border-transparent hover:border-[var(--color-border)] cursor-pointer"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Screen-Filling Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-[var(--color-background)] flex flex-col md:hidden animate-in fade-in zoom-in-95 duration-300">
          
          {/* Overlay Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--color-border)]">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-foreground)]">
              Index
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)] transition-colors border border-[var(--color-foreground)] hover:border-[var(--color-border)] cursor-pointer"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Overlay Links */}
          <div className="flex-1 flex flex-col justify-center px-6">
            <div className="flex flex-col space-y-2 border-y border-[var(--color-border)] divide-y divide-[var(--color-border)]">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="py-8 text-2xl font-serif uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:pl-4 transition-all duration-300 [&.active]:text-[var(--color-foreground)] [&.active]:italic"
              >
                Front Page
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                className="py-8 text-2xl font-serif uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:pl-4 transition-all duration-300 [&.active]:text-[var(--color-foreground)] [&.active]:italic"
              >
                The Archive
              </Link>
              <Link
                to="/blogs"
                onClick={() => setIsOpen(false)}
                className="py-8 text-2xl font-serif uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:pl-4 transition-all duration-300 [&.active]:text-[var(--color-foreground)] [&.active]:italic"
              >
                Journal
              </Link>
            </div>

            <div className="mt-12 flex justify-between items-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
              <span>External</span>
              <a
                href="https://github.com/Yehonatal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-foreground)] hover:underline decoration-[var(--color-border)] underline-offset-4 transition-all"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
